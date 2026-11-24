/*
  EDIT YOUR TITLES HERE
  ---------------------
  Change any "title" text between the quotes and save. That's it.
  "file" is the video name inside the media folder (don't change unless you swap a video).
*/

window.SITE = {
  instagram: [
    { handle: "mdnt.collective", url: "https://www.instagram.com/mdnt.collective/" },
    { handle: "enzo.blur",       url: "https://www.instagram.com/enzo.blur/" }
  ],
  phone: "+41 78 333 29 73",
  email: "",

  /* "Worked with" strip under the featured videos. Add, remove or reorder names here. */
  workedWith: [
    "Nassau Beach Ibiza", "Dune Bar", "Swag Ibiza", "Aya Nights", "GECE Budapest", "Double Shot",
    "EYBL", "USK Praha", "Avangard Kiev", "MZT Skopje",
    "Zaza Pachulia Academy", "Basket Lanciano", "B-Fit Calisthenics"
  ],

  /* The two pieces shown first when the site opens */
  featured: [
    { file: "lanciano-1",   title: "Vibas vs Lanciano | Final Chapter" },
    { file: "event-dune-1", title: "Dune Bar | Reel" }
  ],

  miniMovie: {
    title: "Vibas Basket vs Uni Lanciano Game | Mini Movie",
    intro: "One game, told in three chapters. Watch it in order.",
    chapters: [
      { file: "lanciano-2", title: "Chapter 1", sideways: true },
      { file: "lanciano-3", title: "Chapter 2", sideways: true },
      { file: "lanciano-1", title: "Chapter 3" }
    ]
  },

  /* Sports > Stories: story-driven pieces (shown after the mini movie) */
  sportsStories: [
    { file: "eybl-coach-perry", title: "Coach Perry | EYBL Interview" },
    { file: "eybl-cska",        title: "CSKA | EYBL" },
    { file: "eybl-kristof",     title: "Kristof | EYBL Player Feature" }
  ],

  /* Sports > Short Form: quick highlight clips */
  sportsShort: [
    { file: "eybl-rotate-zpa",  title: "Zaza Pachulia Academy Game Winner", sideways: true },
    { file: "eybl-luka-laslo",  title: "Luca Laslo MZT Skopje", sideways: true },
    { file: "eybl-4k-collab",   title: "USK Praha Shoot", sideways: true },
    { file: "eybl-24-ukraina",  title: "Yehor Paliukh Avangard Kiev", sideways: true },
    { file: "eybl-oca-lob",     title: "Oscar Mukendi Lob", sideways: true }
  ],

  /* Extra story lines under Sports > Stories. "instagram" = a reel/post link that plays inside the site. */
  sportsLines: [
    {
      title: "B-Fit Calisthenics Event",
      videos: [
        { instagram: "https://www.instagram.com/reel/DZZpWYIqW9c/", poster: "sport-bfit-vlog", title: "B-Fit Calisthenics Event | Full Vlog", tag: "Full vlog · 10 min" },
        { file: "sport-bfit-final", title: "B-Fit Calisthenics Event | Final Edit", wide: true },
        { file: "sport-bfit-2", title: "B-Fit Calisthenics Event | Teaser" }
      ],
      photos: []
    }
  ],

  /* Each event is its own line under Events. Add photos as "photos/name.jpg" in its photos list. */
  events: [
    {
      title: "Aya Nights",
      videos: [
        { file: "turkish-party",      title: "Aya Nights | Aftermovie" },
        { file: "event-aya-budapest", title: "Aya Night Budapest", wide: true }
      ],
      /* photos: first two are shown wide, the rest in a row underneath */
      photos: ["photos/aya-01.jpg", "photos/aya-02.jpg", "photos/aya-03.jpg", "photos/aya-04.jpg", "photos/aya-05.jpg"]
    },
    {
      title: "Swag Ibiza",
      videos: [ { file: "event-swag", title: "Swag Ibiza" } ],
      photos: []
    },
    {
      title: "Michael Jackson Show | Nassau Beach Ibiza",
      videos: [ { file: "event-mj-show", title: "Yordani Ogando | Michael Jackson Show at Nassau Beach Ibiza" } ],
      photos: []
    },
    {
      title: "Dune Bar",
      videos: [
        { file: "event-dune-1", title: "Dune Bar" },
        { file: "event-dune-2", title: "Dune Bar 2.0" },
        { file: "event-safi",   title: "Dune Bar | Safi" }
      ],
      photos: []
    },
    {
      title: "Double Shot",
      videos: [ { file: "event-double-shot", title: "Double Shot" } ],
      photos: []
    }
  ]
};
