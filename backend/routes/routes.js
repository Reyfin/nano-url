const router = require("express").Router();

const urlController = require('../controllers/url-controller');

// API Home Page Route: GET
router.get("/", urlController.getBasePage);

// Store New Short URL : POST
router.post("/short-url", urlController.postShortUrl);

// Access Shortened URL: GET
router.get("/:shortcode", urlController.loadShortUrl);

module.exports = router;
