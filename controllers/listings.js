const Listing = require("../models/listing.js");
const { cloudinary } = require("../cloudConfig.js");

// INDEX ROUTE WITH SEARCH & CATEGORY FILTER
module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let query = {};

    if (category) {
        query.category = category;
    }

    if (search && search.trim() !== "") {
        const searchRegex = new RegExp(search.trim(), "i");
        query.$or = [
            { title: searchRegex },
            { location: searchRegex },
            { country: searchRegex }
        ];
    }

    let allListings = await Listing.find(query);

    if (allListings.length === 0 && category) {
        req.flash("error", `No listings found under category: ${category}`);
        return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings, search, category });
};

// NEW FORM ROUTE
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW ROUTE
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// CREATE ROUTE
module.exports.createListing = async (req, res) => {
    let url = req.file ? req.file.path : "";
    let filename = req.file ? req.file.filename : "";
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
};

// EDIT FORM ROUTE (Missing tha, is wajah se "fn is not a function" aa raha tha)
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image ? listing.image.url : null;
    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_200");
    }
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE ROUTE
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    const updatedData = { ...req.body.listing };

    if (req.file) {
        if (listing?.image?.filename) {
            await cloudinary.uploader.destroy(listing.image.filename);
        }
        updatedData.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    } else if (!req.body.listing?.image?.url) {
        delete updatedData.image;
    }

    await Listing.findByIdAndUpdate(id, updatedData);
    req.flash("success", "Updated listing successfully!");
    
    // Direct home page par redirect karne ke liye:
    res.redirect("/listings");
};

// DELETE ROUTE
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};