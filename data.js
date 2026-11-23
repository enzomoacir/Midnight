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

  /* The two pieces shown first when the site opens */
  featured: [
    { file: "lanciano-1",   title: "Vibas vs Lanciano | Final Chapter" },
    { file: "event-dune-1", title: "Dune Bar | Reel" }
  ],

  miniMovie: {
    title: "Vibas Basket vs Uni Lanciano Game | Mini Movie",
    intro: "One game, told in three chapters. Watch it in order.",
    chapters: [
      { file: "lanciano-2", title: "Chapter 1" },
      { file: "lanciano-3", title: "Chapter 2" },
      { file: "lanciano-1", title: "Chapter 3" }
    ]
  },

  sports: [
    { file: "eybl-coach-perry", title: "Coach Perry | EYBL Interview" },
    { file: "eybl-cska",        title: "CSKA | EYBL" },
    { file: "eybl-kristof",     title: "Kristof | EYBL Player Feature" },
    { file: "eybl-rotate-zpa",  title: "Zaza Pachulia Academy Game Winner" },
    { file: "eybl-luka-laslo",  title: "Luca Laslo MZT Skopje" },
    { file: "eybl-4k-collab",   title: "USK Praha Shoot" },
    { file: "eybl-24-ukraina",  title: "Yehor Paliukh Avangard Kiev" },
    { file: "eybl-oca-lob",     title: "Lob | EYBL" }
  ],

  /* Extra lines under Sports (after the clips above). "instagram" = a reel/post link that plays inside the site. */
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
      photos: []
    },
    {
      title: "Swag Ibiza",
      videos: [ { file: "event-swag", title: "Swag Ibiza" } ],
      photos: []
    },
    {
      title: "Michael Jackson Show Ibiza",
      videos: [ { file: "event-mj-show", title: "Yordani Ogando | Michael Jackson Show Ibiza" } ],
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
