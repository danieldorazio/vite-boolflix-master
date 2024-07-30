<script>
import Header from "./components/Header.vue";
import FilmContainer from "./components/FilmContainer.vue";
import TVSeries from "./components/TVSeries.vue";
import PopularMovies from "./components/PopularMovies.vue";
import TopRatedMovies from "./components/TopRatedMovies.vue";
import InfoCard from "./components/partials/InfoCard.vue";
import Jumbotron from "./components/Jumbotron.vue";
import { store } from "./data/store";
import axios from "axios";


export default {
  name: "App",
  data() {
    return {
      // IL FILE STORE CONTIENE TUTTE LE APIURL E TUTTI GLI ARRAY PER LE RISPOSTE
      store
    }
  },
  components: {
    Header,
    FilmContainer,
    TVSeries,
    PopularMovies,
    TopRatedMovies,
    Jumbotron,
    InfoCard
  },

  // SEZIONE METHODS Permette di definire funzioni che puoi richiamare dal template
  methods: {
    // CHIAMATA PER I PROSSIMI FILM 
    getApiUpcomingMovies() {
      axios.get(store.apiUrlUpcomingMovies, {
        params: {
          language: "it",
          page: 1
        }
      })
        .then(result => {
          store.resultArrayUpcomingMovies = result.data.results;
          console.log(store.resultArrayUpcomingMovies);
        })
    },

    // CHIAMATA PER I FILM CON LA VOTAZIONE PIù ALTA
    getApiTopRatedMovies() {
      store.resultArrayFilm = [];
      store.resultArrayTVSeries = [];
      axios.get(store.apiUrlTopRatedMovies, {
        params: {
          language: "it",
          page: store.pagesTopRatedMovies
        }
      })
        .then(result => {
          store.resultArrayTopRatedMovies = result.data.results;
          console.log(store.resultArrayTopRatedMovies);
        })
    },

    nextPageCallTopMovies() {
      store.pagesTopRatedMovies++
      this.getApiTopRatedMovies()
    },

    prevPageCallTopMovies() {

      if (store.pagesTopRatedMovies == 0) {
        store.pagesTopRatedMovies == 1
      } else {
        store.pagesTopRatedMovies--
      }

      this.getApiTopRatedMovies()
    },

    // CHIAMATA PER I FILM PIù VISTI
    getApiPopularMovies() {
      store.resultArrayFilm = [];
      store.resultArrayTVSeries = [];
      axios.get(store.apiUrlPopularMovies, {
        params: {
          language: "it",
          page: store.pagesPopularMovies
        }
      })
        .then(result => {
          store.resultArrayPopularMovies = result.data.results;
          console.log(store.resultArrayPopularMovies);
        })
    },

    nextPageCall() {
      store.pagesPopularMovies++
      this.getApiPopularMovies()
    },

    prevPageCall() {

      if (store.pagesPopularMovies == 0) {
        store.pagesPopularMovies == 1
      } else {
        store.pagesPopularMovies--
      }

      this.getApiPopularMovies()
    },

    // CHIAMATA PER CERCARE UN TITOLO IN PARTICOLARE
    getApiFilm() {
      axios.get(store.apiUrlMovies, {
        params: {
          query: store.SearchTitle,
          language: "it",
        }
      })
        .then(result => {
          store.resultArrayFilm = result.data.results;
          console.log(store.resultArrayFilm, store.SearchTitle);
        })
    },


    // CHIAMATA PER CERCARE UNA SERIE TV IN PARTICOLARE
    getApiTVSeries() {
      axios.get(store.apiUrlTVSeries, {
        params: {
          query: store.SearchTitle,
          language: "it",
        }
      })
        .then(result => {
          store.resultArrayTVSeries = result.data.results;
          console.log(store.resultArrayTVSeries, store.SearchTitle);
        })
    }
  },


  // Il metodo `mounted` viene eseguito dopo che il componente è stato montato sul DOM.
  // Utilizzalo per eseguire codice che richiede l'accesso al DOM, come inizializzare plugin,
  // fare chiamate API, o manipolare elementi DOM direttamente.
  mounted() {
    this.getApiPopularMovies();
    this.getApiTopRatedMovies();
    this.getApiUpcomingMovies();
  }
}
</script>

<template>
<!-- Quando il componente Header emette l'evento, il metodo dichiarato del componente genitore viene eseguito. -->
  <Header @startResearchMovie="getApiFilm" @startResearchTVSeries="getApiTVSeries"
    @researchHome="getApiPopularMovies" />

  <!-- verifica se è stato cercato un film o una serie in particolare e se esiste il risultato > 0 mi nasconde i dati cercati alla creazione della pagina (film con voto più alto e più visti) e mi mostra i dati della ricerca   -->
  <div class="homeDiv" v-if="store.resultArrayTVSeries.length == 0 & store.resultArrayFilm.length == 0">
    <Jumbotron />
    <PopularMovies @nextPage="nextPageCall" @prevPage="prevPageCall" />
    <TopRatedMovies @nextPage="nextPageCallTopMovies" @prevPage="prevPageCallTopMovies" />
  </div>

  <!-- se il risultato della ricerca specifica ha avuto successo mostra i 2 componenti   -->
  <div class="researhDiv" v-else>
    <FilmContainer />
    <TVSeries />
  </div>

</template>

<style lang="scss">
@use "./scss/main.scss";

.homeDiv,
.researhDiv {
  background-color: #111;
  color: white;
}

.researhDiv {
  padding-top: 90px;
}
</style>