import { reactive } from "vue";

export const store = reactive({
    // CHIAMATA PER CERCARE UN TITOLO IN PARTICOLARE
    apiUrlMovies: "https://api.themoviedb.org/3/search/movie?api_key=ece65189423782ce0c47b4299a0d8a0b",
    resultArrayFilm: [],

    // CHIAMATA PER CERCARE UNA SERIE TV IN PARTICOLARE
    apiUrlTVSeries: "https://api.themoviedb.org/3/search/tv?api_key=ece65189423782ce0c47b4299a0d8a0b",
    resultArrayTVSeries: [],

    // CHIAMATA PER I FILM PIù VISTI
    apiUrlPopularMovies: "https://api.themoviedb.org/3/movie/popular?api_key=ece65189423782ce0c47b4299a0d8a0b",
    resultArrayPopularMovies: [],
    pagesPopularMovies: 1,

    // CHIAMATA PER I FILM CON LA VOTAZIONE PIù ALTA
    apiUrlTopRatedMovies: "https://api.themoviedb.org/3/movie/top_rated?api_key=ece65189423782ce0c47b4299a0d8a0b",
    resultArrayTopRatedMovies: [],
    pagesTopRatedMovies: 1,
    // CHIAMATA PER I PROSSIMI FILM 
    apiUrlUpcomingMovies: "https://api.themoviedb.org/3/movie/upcoming?api_key=ece65189423782ce0c47b4299a0d8a0b",
    resultArrayUpcomingMovies: [],

    SearchTitle: "",
})
