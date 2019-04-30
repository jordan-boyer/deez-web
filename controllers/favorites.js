// Import 
import $ from "jquery";

import {getFavorites} from "../utils/storage";
import {musicTemplate, addFavoriteBtn} from "../utils/template"

// Class definition for Favorites page
export default class Favorites {

    constructor() {
        this.view = "favorites";
    }

    init() {
        $(function () {
            "use strict"
            const $sectionFavorites = $("#favorites");

            let musics = getFavorites();
            if (musics) {
                for (let music of musics) {
                    let musicHtml = musicTemplate(music);
                    $sectionFavorites.append(musicHtml);
                    $('audio').last().after(addFavoriteBtn(music));
                }
            }
        });
    }
};