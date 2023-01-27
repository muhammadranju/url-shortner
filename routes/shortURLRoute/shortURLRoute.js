const router = require("express").Router();

const urlControl = require("../../controller/shortUrlController/shortURLController.js");

router.get("/short-url", urlControl.ShortURLGetController);

module.exports = router;
