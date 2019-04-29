//Import
import {getMusicsFromDeezer} from "../utils/deezer-api";
import $ from "jquery";

//Class definition for page Search
export default class Search {

    constructor() {
        this.view = "search";
    }

    init() {
        $(function() {
            const $form = $("form");
            const $title = $form.find("#title");
            const $tri = $form.find("#tri");
            const $result = $("#resultSection");

            //Add music to the page
            function addMusic(music) {
                $result.html(`<img src="${music.album.cover_medium}">
                <h4>${music.title}</h4>
                <h5>${music.artist.name} / ${music.album.title}</h5>
                <audio controls src="${music.preview}">Your browser does not support the<code>audio</code> element.</audio>`)
            }

            $form.submit((e) => {
                //prevent submit of form
                e.preventDefault();

                const title = $title.val();
                const tri = $tri.val();

                //get all music base on data
                getMusicsFromDeezer(title, tri)
                    .then(musiques => {
                        if (musiques.data.length !== 0) {
                            addMusic(musiques.data[0]);
                        } else {
                            $result.html("Nous sommes désolé, nous n'obtenons pas de résultats pour cette recherche...");
                        }  
                    }).catch(error => {
                        $result.html(`Nous sommes désolé mais une erreur est parvenue, vous pouvez recharger la page et essayer de nouveau
                        Si le problème persiste rendez-vous sur <a href="https://github.com/jordan-boyer/deez-web">cette page</a> pour nous contactez`);
                    });
            });
            
        });
    }
};