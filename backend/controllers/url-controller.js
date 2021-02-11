const util = require('util');
const urlExists = util.promisify(require('url-exists'));
const MEMC_USERNAME = require("../config/default.json").MEMC_USERNAME;
const MEMC_PASSWORD = require("../config/default.json").MEMC_PASSWORD;
const MEMC_SERVER = require("../config/default.json").MEMC_SERVER;


const urlModel = require("../models/url-model");
const id_to_base62 = require("../algorithm/conversionAlgo");
const nanourl = require("../config/default.json").Shortened_URI;

const memjs  = require('memjs');
const mc = new memjs.Client.create(MEMC_SERVER, {
  username: MEMC_USERNAME,
  password: MEMC_PASSWORD
});

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
  const index = await mc.get('index');
    
  
  const new_index = JSON.parse( await index.value) + 1;
  
  const shortCode = id_to_base62.id_to_base62(new_index);

  let urlIsValid = await urlExists(longUrl);
  
  let URL = await urlModel.findOne({
    longUrl: { $regex: new RegExp("^" + longUrl + "$", "i") },
  });

  if (URL && urlIsValid) {
    return res.status(404).json({
      message: "URL Already Shortened",
    });
  }

  if (urlIsValid) {
    await mc.set('index', `${new_index}`);
    console.log(new_index);
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
