/* IMPORT */
import $ from 'jquery';

import {isFavorite, removeFavorite, addFavorite} from "./storage";

/* CONST */

const removeText = '<i class="icon fas"></i>Retirer des favoris';
const addText = '<i class="icon fas"></i>Ajouter aux favoris';

/* Event handler for click on removeFavoriteBtn */
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

/* Event handler for click on addFavoriteBtn */
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

/* Add button for favorite */
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

/* add HTML template of music on page parent and add event listener for playing audio */
export function addMusicTemplateToPage(parent, music) {
    
    let musicHtml = musicTemplate(music);
    parent.append(musicHtml);

    let $audio = musicHtml.find("audio");
    $audio.on("play", function onplay(e) {
        
        let $this = $(this);
        let $clone = $this.parent().clone();
        let $fixed = $(".fixed");
        
        $this[0].pause();
        $this.off("play");
        $fixed.html("").append($clone);
        $clone.addClass("song-play");
        $clone.find(".song-favorite").remove();
        $clone.find(".song-cover").remove();
        $clone.children().addClass("span");
        $clone.find("audio")[0].play();
        $clone.append('<button class="btn-close"><i class="fas fa-times"></i></button>');
        $(".btn-close").click(() => {
            $this.on("play", onplay);
            $fixed.html("");
        });
    });
    $audio.after(addFavoriteBtn(music));
}

/* Create HTML template for a music */
function musicTemplate(music) {
    return $(`<div class="song">
    <img class="song-cover" src="${music.album_cover}">
    <h4 class="song-title">${music.title}</h4>
    <h5 class="song-artist-album">${music.artist} / ${music.album}</h5>
    <audio class="song-preview" controls preload="none"><source src="${music.preview}" type="audio/mpeg">Your browser does not support the<code>audio</code> element.</audio></div>`);
}