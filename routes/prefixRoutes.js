const router = require("express").Router();

router.use(require("./homeRoute/homeRoute.js"));
router.use(require("./shortURLRoute/shortURLRoute.js"));

module.exports = router;
