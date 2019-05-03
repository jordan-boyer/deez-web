/* Import */
import $ from "jquery";

import {getFavorites} from "../utils/storage";
import {addMusicTemplateToPage} from "../utils/template"

/* Class definition for Favorites page */
export default class Favorites {

    constructor() {
        this.view = "favorites";
    }

    init() {
        $(() => {
            const $sectionFavorites = $("#favorites");

            let musics = getFavorites();
            if (musics.length > 0) {
                for (let music of musics) {
                    addMusicTemplateToPage($sectionFavorites, music);
                }
            } else {
                $sectionFavorites.html("Aucun favoris dans votre liste ...");
            }
        });
    }
};