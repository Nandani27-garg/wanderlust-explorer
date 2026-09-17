const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }

    const ownerId = listing.owner && listing.owner._id ? listing.owner._id : listing.owner;
    if (!ownerId || String(ownerId) !== String(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      req.flash("error", "Review you requested for does not exist!");
      return res.redirect("/listings");
    }

    const reviewAuthorId = review.author;
    if (!reviewAuthorId || String(reviewAuthorId) !== String(req.user._id)) {
      req.flash("error", "You do not have permission to do that!");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};