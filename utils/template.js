//Import
import $ from 'jquery';

import {isFavorite, removeFavorite, addFavorite} from "./storage";

//Constante

const removeText = '<i class="icon fas"></i>Retirer des favoris';
const addText = '<i class="icon fas"></i>Ajouter aux favoris';

//event handler for click on removeFavoriteBtn
function onRemovefavorite(e) {
    let $self = $(this);

    $self.addClass("isNotFavorite");
    $self.removeClass("isFavorite");
    $self.off("click", onRemovefavorite);
    $self.on("click", e.data, onAddfavorite);
    $self.html(addText);

    let $icon = $self.find("i");

    $icon.addClass("fa-heart");
    $icon.removeClass("fa-heart-broken");

    let $parent = $self.parents("#favorites");
    if ($parent.length > 0) {
        $self.parent(".song").remove();
    }
    removeFavorite(e.data.id);
}

//event handler for click on addFavoriteBtn
function onAddfavorite(e) {
    let $self = $(this);

    $self.removeClass("isNotFavorite");
    $self.addClass("isFavorite");
    $self.off("click", onAddfavorite);
    $self.on("click", e.data, onRemovefavorite);
    $self.html(removeText);

    let $icon = $self.find("i");
    $icon.addClass("fa-heart-broken");
    $icon.removeClass("fa-heart");
    addFavorite(e.data);
}

//button for favorite
function addFavoriteBtn(music) {
    let btn = $('<button class="song-favorite"></button>');
    if (isFavorite(music.id)) {
        btn.addClass("isFavorite");
        btn.html(removeText);
        btn.find("i").addClass("fa-heart-broken");
        btn.on("click", music, onRemovefavorite);
    } else {
        btn.addClass("isNotFavorite");
        btn.html(addText);
        btn.find("i").addClass("fa-heart");
        btn.on("click", music, onAddfavorite)
    }
    return btn;
}

export function addMusicTemplateToPage(parent, music) {
    let musicHtml = musicTemplate(music);
    parent.append(musicHtml);
    let $audio = musicHtml.find("audio");
    $audio.on("play", function (e) {
        parent = $(this).parent();
        let $fixed = $(".fixed");
        $fixed.html("");
        parent.appendTo($fixed);
        $(this).off("play");
        parent.append('<button class="btn-close"><i class="fas fa-times"></i></button>');
        $(".btn-close").click(() => {
            $audio[0].pause();
            console.log($audio);
            parent.prependTo($(".section"));
        });
    });
    $audio.after(addFavoriteBtn(music));
}

//template for a music
function musicTemplate(music) {
    return $(`<div class="song">
    <img class="song-cover" src="${music.album_cover}">
    <h4 class="song-title">${music.title}</h4>
    <h5 class="song-artist-album">${music.artist} / ${music.album}</h5>
    <audio class="song-preview" controls preload="none"><source src="${music.preview}" type="audio/mpeg">Your browser does not support the<code>audio</code> element.</audio></div>`);
}