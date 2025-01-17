const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, wrapAsync(listingController.create));

// NEW ROUTE
router.get("/new", isLoggedIn, listingController.new);

router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.update)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroy))
  .get(wrapAsync(listingController.show));

// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;
