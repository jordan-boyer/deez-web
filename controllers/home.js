/* Import */
import $ from "jquery";

import {getRandomFavorite} from "../utils/storage";
import {addMusicTemplateToPage} from "../utils/template"

/* Class definition for Home page */
export default class Home {

    constructor() {
        this.view = "home";
    }

    init() {
        $(() => {
            const $sectionFavorite = $("#random-favorite");
            const $randomBtn = $('<button class="btn-random-song"><i class="icon fas fa-random"></i>Choisir une autre musique</button>');

            this.addRandomMusic({parent: $sectionFavorite, btn: $randomBtn});
        });
    }

    // add random music to the home page
    addRandomMusic(params) {
        params = params.data ? params.data: params;
        let music = getRandomFavorite()
        if (music) {
            let {parent, btn} = params;
            parent.html("");
            addMusicTemplateToPage(parent, music);
            parent.append(btn);
            btn.click(params, this.addRandomMusic.bind(this));
        }
    }
};