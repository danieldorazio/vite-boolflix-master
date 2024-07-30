<script>
import SearchPart from "./partials/SearchPart.vue"
import NavBar from "./partials/NavBar.vue";

export default {
    name: "Header",
    components: {
        SearchPart,
        NavBar
    },
    data() {
        return {
            view: {
                topOfPage: true
            }
        }
    },

    // Il metodo `beforeMount` viene eseguito prima che il componente venga montato sul DOM.
    // Utilizzalo per eseguire codice che deve essere eseguito prima che il rendering del componente sia completato,
    // ma dopo che il componente è stato creato e le sue proprietà sono state inizializzate.
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)
    },

    // SEZIONE METHODS Permette di definire funzioni che puoi richiamare dal template
    methods: {
        researchMovie() {
            this.$emit('startResearchMovie');
        },
        researchTVSeries() {
            this.$emit('startResearchTVSeries');
        },
        researchHome() {
            this.$emit('researchHome')
        },
        handleScroll() {
            if (window.pageYOffset > 0) {
                if (this.view.topOfPage) this.view.topOfPage = false
            } else {
                if (!this.view.topOfPage) this.view.topOfPage = true
            }
        }
    }
}
</script>

<template>

    <div class="ct-container d-flex align-items-center justify-content-between px-5"
        :class="{ 'onScroll': !view.topOfPage }">

        <div class="image-div">
            <img src="../../public/logo-boolflix_720.png" alt="logo">
        </div>

        <NavBar @startResearchHome="researchHome" />
        
        <!-- Quando il componente SearchPart emette l'evento, il metodo dichiarato del componente genitore viene eseguito. -->
        <SearchPart @startResearchFilm="researchMovie" @startResearchTVSeries="researchTVSeries" />


    </div>

</template>

<style lang="scss" scoped>
.ct-container {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    transition: all .2s ease-in-out;
    background: linear-gradient(180deg, rgba(3, 3, 3, 0.8), rgba(3, 3, 3, 0.5), rgba(3, 3, 3, 0.01));

    &.onScroll {
        box-shadow: 0 0 10px #000000;
        background-color: #0B0B0B;
    }

    .image-div {
        height: 100%;
        width: auto;

        img {
            height: 100%;
            width: 50%;
            object-fit: contain;
        }
    }

}
</style>