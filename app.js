/* IMPORTS */
import Router from "vanilla-router";
import $ from "jquery";

import Home from "./controllers/home";
import Search from "./controllers/search";
import Favorites from "./controllers/favorites";

/* New router with hash mode (url/#/search or url/#/) */
const router = new Router({
    mode: 'hash'
});

/* Add 3 route on router (/, /search and /favorites) */
router.add('/', () => dispatchRoute(new Home()));
router.add('/search', () => dispatchRoute(new Search()));
router.add('/favorites', () => dispatchRoute(new Favorites()));

/* Add listener and check for change on route */
router.addUriListener();
router.check();

/* Add display on the main depending on the route */
const $main = $('main');
function dispatchRoute(controller) {
    return fetch(`views/${controller.view}.html`).then(res => res.text()).then(htmlContent => {
        $main.html(htmlContent);
        controller.init();
    });
}