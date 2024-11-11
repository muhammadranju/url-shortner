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
  const URL_REGEX =
    /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:[0-9]{1,5})?(\/[^\s]*)?$/;
  const MAX_LINKS = 10;
  try {
    const { longURL } = req.body;

    if (!longURL) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter a URL",
      });
    }
    const allLinks = await Link.find().sort({ _id: -1 }).limit(MAX_LINKS);
    if (!URL_REGEX.test(longURL.trim())) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter a valid URL",
      });
    }

    const existingLink = await Link.findOne({ longURL: longURL });

    if (existingLink) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You can't shorten the same URL twice",
      });
    }
    const shortLink = shortid.generate().toLowerCase();
    const newLongURL = `https://${req.hostname}/${shortLink}`;

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
  const MAX_HITS = 100; // Define max hits threshold as a constant
  try {
    const { links } = req.params;

    // Atomically find and increment totalHits if link exists
    const link = await Link.findOneAndUpdate(
      { shotLink: links },
      { $inc: { totalHits: 1 } },
      { new: true } // Return the updated document
    );

    // Handle cases where link is not found
    if (!link) {
      return res.status(404).render("pages/404.ejs");
    }

    // Check if the link has exceeded maximum allowed hits
    if (link.totalHits > MAX_HITS) {
      return res.status(403).render("pages/maximumHits.ejs");
    }

    // Redirect to the original URL if all conditions are met
    return res.status(302).redirect(link.longURL);
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
