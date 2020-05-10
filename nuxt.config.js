export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      },
      {
        hid: "keywords",
        name: "keywords",
        content: 'valorant stats, valorant statistics, stats, statistics, valorant, Valorant, valorant match stats, valorant team stats, valorant matchmaking stats, valorant match track, valorant matchmaking track, tracking'
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyAV3L3f6Nnet6efC9eZNzp09NGKxWIQC5I",
          authDomain: "valorantstats-208ae.firebaseapp.com",
          databaseURL: "https://valorantstats-208ae.firebaseio.com",
          projectId: "valorantstats-208ae",
          storageBucket: "valorantstats-208ae.appspot.com",
          messagingSenderId: "711555753355",
          appId: "1:711555753355:web:390629477aae7386d5fb8e",
          measurementId: "G-19D519XN5L"
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedAction: "onAuthStateChanged"
            },
            ssr: true
          },
          firestore: true
        }
      }
    ],
    '@nuxtjs/sitemap'
  ],

  sitemap: {
    hostname: 'http://valorant.statspeek.com/',
    gzip: true
  },

  pwa: {
    workbox: {
      importScripts: ["/firebase-auth-sw.js"],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === "development"
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
  },
  /*
   ** Router config
   */
  router: {
    linkExactActiveClass: "is-active"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
