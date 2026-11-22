(function () {
  /* intro: once per visit, tap/click/key to skip */
  var intro = document.querySelector(".intro");
  if (intro && getComputedStyle(intro).display !== "none") {
    document.body.style.overflow = "hidden";
    var ended = false;
    var finish = function () {
      if (ended) return; ended = true;
      intro.classList.add("done");
      document.body.style.overflow = "";
      setTimeout(function () { intro.remove(); }, 400);
    };
    try { sessionStorage.setItem("mc-intro", "1"); } catch (e) {}
    intro.addEventListener("click", finish);
    document.addEventListener("keydown", finish, { once: true });
    setTimeout(function () { intro.classList.add("reveal"); }, 2250);
    setTimeout(finish, 2950);
  } else if (intro) { intro.remove(); }
})();

(function () {
  var S = window.SITE;
  var $ = function (q, el) { return (el || document).querySelector(q); };
  var $$ = function (q, el) { return Array.prototype.slice.call((el || document).querySelectorAll(q)); };
  var canHover = window.matchMedia("(hover: hover)").matches;

  /* ---------- links ---------- */
  var igs = S.instagram || [];
  $$(".ig-link").forEach(function (a) { if (igs[0]) a.href = igs[0].url; });
  var cl = $(".contact-links");
  function addBtn(href, text, ghost, ext) {
    var a = document.createElement("a");
    a.className = "btn" + (ghost ? " ghost" : "");
    a.href = href; a.textContent = text;
    if (ext) { a.target = "_blank"; a.rel = "noopener"; }
    cl.appendChild(a);
  }
  if (S.phone) {
    var digits = S.phone.replace(/[^0-9]/g, "");
    addBtn("https://wa.me/" + digits, "WhatsApp " + S.phone, false, true);
    addBtn("tel:+" + digits, "Call", true);
  }
  if (S.email) addBtn("mailto:" + S.email, "Email", true);
  igs.forEach(function (ig) { addBtn(ig.url, "@" + ig.handle, true, true); });
  $(".year").textContent = new Date().getFullYear();

  /* ---------- cards ---------- */
  function card(item, list, idx, extraClass) {
    var el = document.createElement("div");
    el.className = "card " + (extraClass || "");
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Play " + item.title);
    el.innerHTML =
      '<div class="thumb"><img loading="lazy" alt="" src="media/' + item.file + '.jpg">' +
      '<span class="play"></span></div>';
    var cap = document.createElement("span");
    cap.className = "cap";
    cap.textContent = item.title;
    el.appendChild(cap);
    el.addEventListener("click", function () { openPlayer(list, idx); });
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlayer(list, idx); } });
    if (canHover) addPreview(el, item);
    return el;
  }

  function addPreview(el, item) {
    var v, t;
    el.addEventListener("mouseenter", function () {
      t = setTimeout(function () {
        if (!v) {
          v = document.createElement("video");
          v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
          v.src = "media/" + item.file + ".mp4";
          $(".thumb", el).insertBefore(v, $(".play", el));
        }
        var p = v.play(); if (p && p.catch) p.catch(function () {});
        el.classList.add("previewing");
      }, 250);
    });
    el.addEventListener("mouseleave", function () {
      clearTimeout(t);
      el.classList.remove("previewing");
      if (v) v.pause();
    });
  }

  function fill(sel, list) {
    var box = $(sel);
    list.forEach(function (it, i) { box.appendChild(card(it, list, i)); });
  }

  /* featured: best two pieces, first thing on the page */
  var sc = $(".showcase");
  (S.featured || []).forEach(function (it, i) {
    var el = document.createElement("div");
    el.className = "show";
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.innerHTML = '<video muted loop playsinline autoplay preload="metadata" poster="media/' + it.file + '.jpg" src="media/' + it.file + '.mp4"></video>' +
      '<span class="show-text"><span class="eyebrow">Featured</span><span class="show-title"></span><span class="show-cta">&#9654;&nbsp; Watch with sound</span></span>';
    $(".show-title", el).textContent = it.title;
    el.addEventListener("click", function () { openPlayer(S.featured, i); });
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlayer(S.featured, i); } });
    sc.appendChild(el);
  });

  /* mini movie */
  var mm = S.miniMovie;
  $(".mm-title").textContent = mm.title;
  $(".mm-intro").textContent = mm.intro;
  var ch = $(".chapters");
  mm.chapters.forEach(function (it, i) {
    var c = card(it, mm.chapters, i, "chapter");
    var num = document.createElement("span");
    num.className = "num";
    num.textContent = "Chapter " + String(i + 1).padStart(2, "0");
    c.insertBefore(num, $(".cap", c));
    if (/^chapter \d+$/i.test(it.title)) $(".cap", c).textContent = "";
    ch.appendChild(c);
  });
  $(".play-all").addEventListener("click", function () { openPlayer(mm.chapters, 0, true); });

  fill('[data-list="sports"]', S.sports);
  var lines = $(".event-lines");
  S.events.forEach(function (ev) {
    var wrap = document.createElement("div");
    wrap.className = "event-line";
    var h = document.createElement("h3");
    h.textContent = ev.title;
    wrap.appendChild(h);
    var g = document.createElement("div");
    g.className = "grid";
    ev.videos.forEach(function (it, i) { g.appendChild(card(it, ev.videos, i)); });
    wrap.appendChild(g);
    if (ev.photos && ev.photos.length) {
      var ph = document.createElement("div");
      ph.className = "photos";
      ev.photos.forEach(function (src) {
        var im = document.createElement("img");
        im.loading = "lazy"; im.src = src; im.alt = ev.title;
        im.addEventListener("click", function () { window.open(src, "_blank"); });
        ph.appendChild(im);
      });
      wrap.appendChild(ph);
    }
    lines.appendChild(wrap);
  });

  /* ---------- player ---------- */
  var player = $(".player"), pv = $("video", player), ptitle = $(".player-title");
  var prevB = $(".player-prev"), nextB = $(".player-next");
  var cur = null, pos = 0, auto = false, lastFocus = null;

  function load() {
    var it = cur[pos];
    pv.poster = "media/" + it.file + ".jpg";
    pv.src = "media/" + it.file + ".mp4";
    var label = it.title;
    if (cur === mm.chapters) label = mm.title + " | Chapter " + (pos + 1) + " of " + cur.length;
    ptitle.textContent = label;
    prevB.disabled = pos === 0;
    nextB.disabled = pos === cur.length - 1;
    var p = pv.play(); if (p && p.catch) p.catch(function () {});
  }
  function openPlayer(list, i, autoAdvance) {
    lastFocus = document.activeElement;
    cur = list; pos = i;
    auto = !!autoAdvance || list === mm.chapters;
    player.hidden = false;
    document.body.style.overflow = "hidden";
    $(".player-nav").style.visibility = list.length > 1 ? "visible" : "hidden";
    load();
    $(".player-close").focus();
  }
  function closePlayer() {
    pv.pause(); pv.removeAttribute("src"); pv.load();
    player.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  pv.addEventListener("ended", function () {
    if (auto && pos < cur.length - 1) { pos++; load(); }
  });
  prevB.addEventListener("click", function () { if (pos > 0) { pos--; load(); } });
  nextB.addEventListener("click", function () { if (pos < cur.length - 1) { pos++; load(); } });
  $(".player-close").addEventListener("click", closePlayer);
  player.addEventListener("click", function (e) { if (e.target === player || e.target.classList.contains("player-stage")) closePlayer(); });
  document.addEventListener("keydown", function (e) {
    if (player.hidden) return;
    if (e.key === "Escape") closePlayer();
    if (e.key === "ArrowRight") nextB.click();
    if (e.key === "ArrowLeft") prevB.click();
  });

  /* ---------- mobile menu ---------- */
  var mb = $(".menu-btn"), menu = $(".mobile-menu");
  mb.addEventListener("click", function () {
    var open = menu.hidden;
    menu.hidden = !open;
    mb.setAttribute("aria-expanded", String(open));
  });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { menu.hidden = true; mb.setAttribute("aria-expanded", "false"); }); });

  /* ---------- active nav ---------- */
  if ("IntersectionObserver" in window) {
    var links = $$(".nav a[href^='#']");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
