//Import
import $ from 'jquery';

import {isFavorite, removeFavorite, addFavorite} from "./storage";

//Constante

const removeText = "Retirer des favoris";
const addText = "Ajouter aux favoris"

//event handler for click on removeFavoriteBtn
function onRemovefavorite(e) {
    let $self = $(this);
    $self.off("click", onRemovefavorite);
    $self.on("click", e.data, onAddfavorite);
    $self.html(addText);
    let $parent = $self.parents("#favorites");
    if ($parent.length > 0) {
        $self.parent(".song").remove();
    }
    removeFavorite(e.data.id);
}

//event handler for click on addFavoriteBtn
function onAddfavorite(e) {
    let $self = $(this);
    $self.off("click", onAddfavorite);
    $self.on("click", e.data, onRemovefavorite);
    $self.html(removeText);
    addFavorite(e.data);
}

//button for favorite
export function addFavoriteBtn(music) {
    let btn = $('<button></button>');
    if (isFavorite(music.id)) {
        btn.html(removeText);
        btn.on("click", music, onRemovefavorite);
    } else {
        btn.html(addText);
        btn.on("click", music, onAddfavorite)
    }
    return btn;
}

//template for a music
export function musicTemplate(music) {
    return $(`<div class="song"><img src="${music.album_cover}">
    <h4>${music.title}</h4>
    <h5>${music.artist} / ${music.album}</h5>
    <audio controls src="${music.preview}">Your browser does not support the<code>audio</code> element.</audio></div>`);
}