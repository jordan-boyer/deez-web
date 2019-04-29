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
    $self.on("click", e.id, onAddfavorite);
    $self.html(addText);
    removeFavorite(e.id);
}

//event handler for click on addFavoriteBtn
function onAddfavorite(e) {
    let $self = $(this);
    $self.off("click", onAddfavorite);
    $self.on("click", e.id, onRemovefavorite);
    $self.html(removeText);
    addFavorite(e.id);
}

//button for favorite
function addFavoriteBtn(id) {
    let btn = $('<button></button>');
    if (isFavorite(id)) {
        btn.html(removeText);
        btn.on("click", id, onRemovefavorite);
    } else {
        btn.html(addText);
        btn.on("click", id, onAddfavorite)
    }
    return btn;
}

//template for a music
export function musicTemplate(music) {
    return $(`<img src="${music.album_cover}">
    <h4>${music.title}</h4>
    <h5>${music.artist} / ${music.album}</h5>
    <audio controls src="${music.preview}">Your browser does not support the<code>audio</code> element.</audio>`).append(addFavoriteBtn(music.id));
}