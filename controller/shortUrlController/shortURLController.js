const ShortURLGetController = async (req, res, next) => {
    try {
        return res.status(200).render("pages/shortURL/shortURL");
    } catch (error) {
        next(error);
    }
};

module.exports = { ShortURLGetController };
