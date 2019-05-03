/* Import */ 
import fetchJsonp from "fetch-jsonp";

import {cache} from "./cache";

/* Const definition for API URL */
const apiBaseURL = "https://api.deezer.com/";
const searchOption = "search?q=";
const orderOption = "order=";
const output = "output=jsonp";


/* Get music from deezer API || return promise */
export function getMusicsFromDeezer(title, order) {

    // it mean that it's a new request and not a nextPageRequest
    if (order) {
        
        // encodeURIComponent against malicious data
        title = encodeURIComponent(title);
        order = encodeURIComponent(order);

        // Get data from cache if existing else get data from 
        // fetchJsonp because deezer API doesn't support fecth (origin not allow)
        return cache(`${apiBaseURL}${searchOption}${title}&${orderOption}${order}&${output}`, fetchJsonp, 2);
    } else {
        return cache(title, fetchJsonp, 5);
    }   
}

