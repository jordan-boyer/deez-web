/* Import */
import {getMusicsFromDeezer} from "../utils/deezer-api";
import $ from "jquery";

import {addMusicTemplateToPage} from "../utils/template";

/* Class definition for page Search */
export default class Search {

    constructor() {
        this.view = "search";
        this.parent = null;

        // New observer interface for checking is elements intersect beetween each other
        this.observer = new IntersectionObserver(this.observe.bind(this));
        this.nextPage = null;
    }

    // Check if entries is intersecting wiht last music to request next page
    observe(entries) {
        if (entries.length > 0 && entries[0].isIntersecting) {
            this.observer.unobserve(entries[0].target);
            this.requestMusic(this.nextPage);
        }
    }

    init() {
        $(() => {
            const $form = $("form");
            const $title = $form.find("#title");
            const $sorting = $form.find("#sorting");
            this.parent = $("#resultSection");

            $form.submit((e) => {
                //prevent submit of form
                e.preventDefault();

                let title = $title.val();
                let sorting = $sorting.val();

                this.requestMusic(title, sorting, true);
            });
        });
    }

    //get all music base on data or url(title) if newRequest = false
    requestMusic(title, sorting, newRequest = false) {
        getMusicsFromDeezer(title, sorting)
        .then(musics => {
            this.processMusics(musics, newRequest);
        }).catch(error => {
            console.log(error);
            this.parent.html(`<span class="span">Nous sommes désolé mais une erreur est parvenue, vous pouvez recharger la page et essayer de nouveau</span>
            <span class="span">Si le problème persiste rendez-vous sur <a href="https://github.com/jordan-boyer/deez-web">cette page</a> pour nous contactez</span>`);
        });
    }

    // Go throught all data music and add them to the page
    processMusics(musics, newRequest = false) {
        if (musics.data.length > 0) {
            if (newRequest) 
                this.parent.html("");
            for (let music of musics.data) {
                //define obj for template
                let musicObj = {
                    id: music.id,
                    title: music.title,
                    artist: music.artist.name,
                    album: music.album.title,
                    album_cover: music.album.cover_medium,
                    preview: music.preview
                }
                //add template for each item
                addMusicTemplateToPage(this.parent, musicObj);          
            }
            if (musics.next) {
                this.nextPage = musics.next;
                this.observer.observe($(".song").last()[0]);
            } 
        } else {
            this.parent.html("Nous sommes désolé, nous n'obtenons pas de résultats pour cette recherche...");
        }
    }
};