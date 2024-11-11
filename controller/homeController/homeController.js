const shortid = require("shortid");
const Link = require("../../models/shortURLModel.js");

const homeGetController = async (req, res, next) => {
  try {
    // Get `page` and `limit` from query parameters or set default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the paginated data and get the total count
    const allLinks = await Link.find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalLinks = await Link.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalLinks / limit);

    // Pass pagination data to the template
    return res.status(200).render("index", {
      allLinks,
      newLongURL: {},
      currentPage: page,
      totalPages,
      limit,
      totalLinks,
    });
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
    console.log(longURL);
    const newLongURL = `https://${req.hostname}/${shortLink}`;
    const urlRegex =
      /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:[0-9]{1,5})?(\/[^\s]*)?$/;

    if (!urlRegex.test(longURL.trim())) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter a valid URL",
      });
    }

    const findOne = await Link.findOne({ longURL: longURL });

    if (findOne) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You can't shorten the same URL twice",
      });
    }

    const links = new Link({
      longURL,
      shotLink: shortLink,
      shortURL: newLongURL,
    });
    await links.save();

    return res.status(201).json({
      status: 201,
      success: true,
      allLinks,
      newLongURL,
      links,
      message: "Successfully created",
    });
    // return res.status(201).render("index", { allLinks, newLongURL, links });
  } catch (error) {
    next(error);
  }
};

const shortLinkParamsController = async (req, res, next) => {
  try {
    const { links } = req.params;
    const link = await Link.findOne({ shotLink: links });
    link?.totalHits + 1;

    if (link?.totalHits > 100) {
      return res.status(404).render("pages/maximumHits.ejs");
    }

    if (!link) {
      return res.status(404).render("pages/404.ejs");
    }
    await link.save();
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
