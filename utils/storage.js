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

function getFavorites() {
    return JSON.parse(localStorage.getItem(storageName)) || [];
}

export function getRandomFavorite() {

}

