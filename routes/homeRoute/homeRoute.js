const router = require("express").Router();

const homeControl = require("../../controller/homeController/homeController.js");

router.get("/:links", homeControl.shortLinkParamsController);

router.get("/", homeControl.homeGetController);

router.post("/", homeControl.shortLinkPostController);

// router.get("/short-link", homeControl.shortLinkGetController);

module.exports = router;
