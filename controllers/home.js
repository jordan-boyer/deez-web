// Import 
import $ from "jquery";

import {getRandomFavorite} from "../utils/storage";
import {addMusicTemplateToPage} from "../utils/template"

// Class definition for Home page
export default class Home {

    constructor() {
        this.view = "home";
    }

    init() {
        $(function () {
            "use strict"
            const $sectionFavorite = $("#random-favorite");

            let music = getRandomFavorite()
            if (music) {
                addMusicTemplateToPage($sectionFavorite, music);
            }
        });
    }
};