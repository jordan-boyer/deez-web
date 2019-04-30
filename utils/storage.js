//Constante
const storageName = "FavoritesSong";


export function isFavorite(id) {
    let favorites = getFavorites();
    if (favorites.length > 0 && favorites.find((favorite) => favorite.id === id)) {
        return true;
    }
    return false;
}

export function addFavorite(music) {
    let favorites = getFavorites();

    favorites.push(music);
    localStorage.setItem(storageName, JSON.stringify(favorites));
}

export function removeFavorite(id) {
    let favorites = getFavorites();

    favorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem(storageName, JSON.stringify(favorites));
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem(storageName)) || [];
}

// return integers between 0 included and max excluded
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

export function getRandomFavorite() {
    let favorites = getFavorites();
    if (favorites.length > 0) {
        return favorites[getRandomInt(favorites.length)];
    }
    return false;
}

