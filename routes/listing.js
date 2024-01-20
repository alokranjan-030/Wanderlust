const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// Index route
router.get("/", wrapAsync(index));

// NewForm Route
router.get("/new", isLoggedIn, renderNewForm);

// Show route
router.get("/:id", wrapAsync(showListing));

// Create Route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(createListing)
);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(updateListing)
);

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
