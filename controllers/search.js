//Import
import {getMusicsFromDeezer} from "../utils/deezer-api";
import $ from "jquery";

import {musicTemplate, addFavoriteBtn} from "../utils/template";

//Class definition for page Search
export default class Search {

    constructor() {
        this.view = "search";
    }

    init() {
        $(function() {
            'use strict';
            const $form = $("form");
            const $title = $form.find("#title");
            const $tri = $form.find("#tri");
            const $result = $("#resultSection");

            $form.submit((e) => {
                //prevent submit of form
                e.preventDefault();

                let title = $title.val();
                let tri = $tri.val();

                //get all music base on data
                getMusicsFromDeezer(title, tri)
                    .then(musiques => {
                        if (musiques.data.length !== 0) {
                            $result.html("");
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
                                let musicHtml = musicTemplate(musicObj);
                                $result.append(musicHtml);
                                $('audio').last().after(addFavoriteBtn(musicObj));
                            }
                        } else {
                            $result.html("Nous sommes désolé, nous n'obtenons pas de résultats pour cette recherche...");
                        }  
                    }).catch(error => {
                        console.log(error);
                        $result.html(`Nous sommes désolé mais une erreur est parvenue, vous pouvez recharger la page et essayer de nouveau
                        Si le problème persiste rendez-vous sur <a href="https://github.com/jordan-boyer/deez-web">cette page</a> pour nous contactez`);
                    });
            });
            
        });
    }
};