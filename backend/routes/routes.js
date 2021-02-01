const router = require("express").Router();

const urlController = require('../controllers/url-controller');

// API Home Page Route
router.get("/", urlController.getBasePage);

// Store New Short URL : POST
router.post("/short-url", urlController.postShortUrl);

module.exports = router;
