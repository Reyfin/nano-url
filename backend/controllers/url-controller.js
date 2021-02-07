var urlExists = require("url-exists");

const urlModel = require("../models/url-model");
const id_to_base62 = require("../algorithm/conversionAlgo");
const nanourl = require("../config/default.json").Shortened_URI;

exports.getBasePage = (req, res, next) => {
  urlModel
    .find()
    .then((urls) => {
      res.status(200).json({
        urlList: urls,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.statusCode = 422;
      throw error;
    });
};

exports.postShortUrl = async (req, res, next) => {
  const { longUrl } = req.body;
  const shortCode = id_to_base62.id_to_base62(longUrl.length);

  const urlIsValid = await urlExists(longUrl, function (err, exists) {
    // console.log(exists); // true
    if (err) {
      return false;
    }
    return true;
  });
  // const urlExists = await urlExists(longUrl, (err) => {
  //   if (err) return false;
  //   return true;
  // });

  let URL = await urlModel.findOne({
    longUrl: { $regex: new RegExp("^" + longUrl + "$", "i") },
  });

  if (URL && urlIsValid) {
    return res.status(404).json({
      message: "URL Already Shortened",
    });
  }

  if (urlIsValid) {
    console.log(urlExists);
    urlModel
      .create({
        longUrl: longUrl,
        shortCode: shortCode,
        shortenedUrl: nanourl + shortCode,
      })
      .then(() => {
        res.status(201).json({
          message: "ShortURL Created and Stored.",
        });
      })
      .catch((err) => {
        const error = new Error("Error Creating Entry in DB: \n\n" + err);
        error.statusCode = 422;
        throw error;
      });
  } else {
    res.status(400).json({
      message: "Invalid URl",
    });
  }
};

exports.loadShortUrl = async (req, res, next) => {
  const shortCode = req.params.shortcode;
  const shortUrl = await urlModel.findOne({ shortCode: shortCode });

  if (shortUrl == null)
    res.status(404).json({
      message: "Error Fetching Record!",
    });
  shortUrl.clicks++;
  shortUrl.save();

  res.status(200).json({
    longUrl: shortUrl.longUrl,
  });
};
