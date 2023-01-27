const shortid = require("shortid");
const Link = require("../../models/shortURLModel.js");

const homeGetController = async (req, res, next) => {
    try {
        const disnone = "disnone";
        const allLinks = await Link.find({}).sort({ _id: -1 }).limit(10);
        const newLongURL = {};
        // return res.status(200).redirect("/short-link");
        return res
            .status(200)
            .render("index", { allLinks, newLongURL, disnone });
    } catch (error) {
        next(error);
    }
};
const shortLinkGetController = async (req, res, next) => {
    try {
        const allLinks = await Link.find();
        return res.status(200).render("index", { allLinks });
    } catch (error) {
        next(error);
    }
};

const shortLinkPostController = async (req, res, next) => {
    try {
        const allLinks = await Link.find().sort({ _id: -1 }).limit(10);
        const { longURL } = req.body;
        const shortLink = shortid.generate().toLowerCase();

        const newLongURL = `https://${req.hostname}/${shortLink}`;
        const disnone = {};
        const links = new Link({
            longURL,
            shotLink: shortLink,
            shortURL: newLongURL,
        });
        await links.save();

        return res
            .status(201)
            .render("index", { allLinks, newLongURL, disnone, links });
    } catch (error) {
        next(error);
    }
};
const shortLinkParamsController = async (req, res, next) => {
    try {
        const { links } = req.params;
        const link = await Link.findOne({ shotLink: links });
        // console.log(link);

        return res.status(202).redirect(link.longURL);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    homeGetController,
    shortLinkGetController,
    shortLinkPostController,
    shortLinkParamsController,
};
