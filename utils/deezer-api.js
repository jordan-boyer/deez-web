//Import 
import fetchJsonp from "fetch-jsonp";

//Const definition for API URL
const apiBaseURL = "https://api.deezer.com/";
const searchOption = "search?q=";
const orderOption = "order=";
const output = "output=jsonp";


//Get music from deezer API || return promise
export function getMusicsFromDeezer(title, order) {

    // encodeURIComponent against malicious data
    title = encodeURIComponent(title);
    order = encodeURIComponent(order);

    // fetchJsonp because deezer API doesn't support fecth (origin not allow)
    return fetchJsonp(`${apiBaseURL}${searchOption}${title}&${orderOption}${order}&${output}&limit=10`)
    .then(response => response.json());
}

