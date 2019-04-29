import Router from "vanilla-router";
import $ from "jquery";

import Home from "./controllers/home";
import Search from "./controllers/search";
import Favorites from "./controllers/favorites";

const router = new Router({
    mode: 'hash'
});

router.add('/', () => dispatchRoute(new Home()));
router.add('/search', () => dispatchRoute(new Search()));
router.add('/favorites', () => dispatchRoute(new Favorites()));

router.addUriListener();
router.check();

const $main = $('main');

function dispatchRoute(controller) {
    return fetch(`views/${controller.view}.html`).then(res => res.text()).then(htmlContent => {
        $main.html(htmlContent);
        controller.init();
    });
}