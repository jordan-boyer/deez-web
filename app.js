import Router from "vanilla-router";

const router = new Router({
    mode: 'hash'
});

router.addUriListener();
router.check();