/* always open on the two featured videos */
function toTop() { window.scrollTo(0, 0); }
toTop();
window.addEventListener("load", toTop);
window.addEventListener("pageshow", toTop);

(function () {
  /* intro: once per visit, tap/click/key to skip */
  var intro = document.querySelector(".intro");
  if (!intro) return;
  if (getComputedStyle(intro).display === "none") { intro.remove(); return; }
  document.body.style.overflow = "hidden";
  var ended = false, timers = [];
  var tc = intro.querySelector(".intro-tc"), t0 = performance.now(), raf;
  (function tick() {
    var ms = performance.now() - t0, f = Math.floor(ms / 1000 * 24);
    var pad = function (n) { return String(n).padStart(2, "0"); };
    tc.textContent = "00:00:" + pad(Math.floor(f / 24)) + ":" + pad(f % 24);
    raf = requestAnimationFrame(tick);
  })();
  function reveal() {
    toTop();
    intro.classList.add("reveal");
    document.body.classList.add("settle");
    document.body.style.overflow = "";
  }
  function finish() {
    if (ended) return; ended = true;
    timers.forEach(clearTimeout);
    cancelAnimationFrame(raf);
    if (!intro.classList.contains("reveal")) reveal();
    intro.classList.add("done");
    toTop();
    setTimeout(function () { intro.remove(); document.body.classList.remove("settle"); }, 1100);
  }
  try { sessionStorage.setItem("mc-intro", "1"); } catch (e) {}
  intro.addEventListener("click", finish);
  document.addEventListener("keydown", finish, { once: true });
  timers.push(setTimeout(reveal, 3180));
  timers.push(setTimeout(finish, 4000));
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
    el.className = "card " + (extraClass || "") + (item.wide ? " wide" : "");
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Play " + item.title);
    if (item.instagram) {
      el.className += " embed-card";
      el.innerHTML =
        '<div class="thumb">' + (item.poster ? '<img loading="lazy" alt="" src="media/' + item.poster + '.jpg">' : '<span class="embed-bg"></span>') +
        '<span class="embed-info"><span class="eyebrow">' + (item.tag || "Watch") + '</span>' +
        '<span class="embed-title"></span><span class="embed-src">Plays from Instagram</span></span>' +
        '<span class="play"></span></div>';
      $(".embed-title", el).textContent = item.title;
    } else {
      el.innerHTML =
        '<div class="thumb"><img loading="lazy" alt="" src="media/' + item.file + (item.sideways ? '-cover' : '') + '.jpg">' +
        (item.sideways ? '<span class="turn">&#8635; Turn your phone</span>' : '') +
        '<span class="play"></span></div>';
    }
    var cap = document.createElement("span");
    cap.className = "cap";
    cap.textContent = item.title;
    el.appendChild(cap);
    el.addEventListener("click", function () { openPlayer(list, idx); });
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPlayer(list, idx); } });
    if (canHover && item.file && !item.sideways) addPreview(el, item);
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
  function renderLines(box, list) {
    (list || []).forEach(function (ev) {
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
        var items = ev.photos.map(function (src, i) {
          return { image: src, title: ev.title + " | Photo " + (i + 1) + " of " + ev.photos.length };
        });
        var gal = document.createElement("div");
        gal.className = "gallery";
        ev.photos.forEach(function (src, i) {
          var b = document.createElement("button");
          b.className = "shot" + (i < 2 ? " big" : "");
          b.setAttribute("aria-label", "View photo " + (i + 1));
          var im = document.createElement("img");
          im.loading = "lazy"; im.alt = ev.title + " photo " + (i + 1);
          im.src = src.replace(/\.jpg$/, "-sm.jpg");
          b.appendChild(im);
          b.addEventListener("click", function () { openPlayer(items, i); });
          gal.appendChild(b);
        });
        wrap.insertBefore(gal, g);
      }
      box.appendChild(wrap);
    });
  }
  renderLines($(".event-lines"), S.events);
  renderLines($(".sport-lines"), S.sportsLines);

  /* ---------- player ---------- */
  var player = $(".player"), pv = $("video", player), ptitle = $(".player-title");
  var prevB = $(".player-prev"), nextB = $(".player-next");
  var cur = null, pos = 0, auto = false, lastFocus = null;

  var stage = $(".player-stage"), frame = null;
  function clearFrame() { if (frame) { frame.remove(); frame = null; } stage.classList.remove("is-embed"); }
  function load() {
    var it = cur[pos];
    clearFrame();
    if (it.image) {
      pv.pause(); pv.removeAttribute("src"); pv.removeAttribute("poster"); pv.load();
      frame = document.createElement("img");
      frame.src = it.image; frame.alt = it.title; frame.className = "player-photo";
      stage.classList.add("is-embed");
      stage.appendChild(frame);
      ptitle.textContent = it.title;
      prevB.disabled = pos === 0;
      nextB.disabled = pos === cur.length - 1;
      return;
    }
    if (it.instagram) {
      pv.pause(); pv.removeAttribute("src"); pv.removeAttribute("poster"); pv.load();
      frame = document.createElement("iframe");
      frame.src = it.instagram.replace(/\?.*$/, "").replace(/\/?$/, "/") + "embed/";
      frame.setAttribute("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture");
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute("scrolling", "no");
      frame.title = it.title;
      stage.classList.add("is-embed");
      stage.appendChild(frame);
      ptitle.textContent = it.title;
      var ext = document.createElement("a");
      ext.href = it.instagram; ext.target = "_blank"; ext.rel = "noopener";
      ext.className = "player-ext"; ext.textContent = "Open on Instagram \u2197";
      ptitle.appendChild(ext);
      prevB.disabled = pos === 0;
      nextB.disabled = pos === cur.length - 1;
      return;
    }
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
    clearFrame();
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
