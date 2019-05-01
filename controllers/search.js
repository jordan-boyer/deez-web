//Import
import {getMusicsFromDeezer} from "../utils/deezer-api";
import $ from "jquery";

import {addMusicTemplateToPage} from "../utils/template";

//Class definition for page Search
export default class Search {

    constructor() {
        this.view = "search";
        this.parent = null;
        this.observer = new IntersectionObserver(this.observe.bind(this));
        this.nextPage = null;
    }

    observe(entries) {
        if (entries.length > 0 && entries[0].isIntersecting) {
            this.observer.unobserve(entries[0].target);
            this.requestMusic(this.nextPage);
        }
    }

    init() {
        $(() => {
            'use strict';
            const $form = $("form");
            const $title = $form.find("#title");
            const $tri = $form.find("#tri");
            this.parent = $("#resultSection");

            $form.submit((e) => {
                //prevent submit of form
                e.preventDefault();

                let title = $title.val();
                let tri = $tri.val();

                //get all music base on data
                this.requestMusic(title, tri, true);
            });
        });
    }

    requestMusic(title, tri, newRequest = false) {
        getMusicsFromDeezer(title, tri)
        .then(musiques => {
            this.processMusics(musiques, newRequest);
        }).catch(error => {
            console.log(error);
            this.parent.html(`<span class="span">Nous sommes désolé mais une erreur est parvenue, vous pouvez recharger la page et essayer de nouveau</span>
            <span class="span">Si le problème persiste rendez-vous sur <a href="https://github.com/jordan-boyer/deez-web">cette page</a> pour nous contactez</span>`);
        });
    }

    processMusics(musiques, newRequest = false) {
        if (musiques.data.length !== 0) {
            if (newRequest) 
                this.parent.html("");
            for (let musique of musiques.data) {
                //define obj for template
                let musicObj = {
                    id: musique.id,
                    title: musique.title,
                    artist: musique.artist.name,
                    album: musique.album.title,
                    album_cover: musique.album.cover_medium,
                    preview: musique.preview
                }
                //add template for each item
                
                addMusicTemplateToPage(this.parent, musicObj);
                
            }
            if (musiques.next) {
                this.nextPage = musiques.next;
                this.observer.observe($(".song").last()[0]);
            } 
        } else {
            this.parent.html("Nous sommes désolé, nous n'obtenons pas de résultats pour cette recherche...");
        }
    }
};