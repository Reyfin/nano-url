const urlModel = require("../models/url-model");

exports.getBasePage = (req, res, next) => {
  res.status(200).json({
    message: "Welcome to NanoURL API",
  });
};

exports.postShortUrl = (req, res, next) => {
  const { longUrl, shortCode } = req.body;

  urlModel
    .create({
      longUrl: longUrl,
      shortCode: shortCode,
    })
    .then(() => {
      res.status(200).json({
        message: "ShortURL Created and Stored.",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error Creating Entry in DB: " + err,
      });
    });
};

exports.loadShortUrl = (req, res, next) => {

}