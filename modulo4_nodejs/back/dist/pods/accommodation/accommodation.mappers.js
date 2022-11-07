"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccommodationListFromModelToApi = exports.mapAccommodationFromModelToApi = exports.mapAccommodationFromApiToModel = void 0;

var _mongodb = require("mongodb");

const lastFiveReviews = reviews => {
  const sortedReviews = reviews.sort((a, b) => new Date(b.date.toString()).getTime() - new Date(a.date.toString()).getTime());
  return sortedReviews.slice(Math.max(sortedReviews.length - 5, 1));
};

const mapAccommodationFromModelToApi = accommodation => ({
  _id: accommodation._id,
  name: accommodation.name,
  description: accommodation.description,
  bedrooms: accommodation.bedrooms,
  bathrooms: Number(accommodation.bathrooms),
  beds: accommodation.beds,
  address: {
    country: accommodation.address.country,
    street: accommodation.address.street
  },
  image: accommodation.images.picture_url,
  reviews: lastFiveReviews(accommodation.reviews).map(review => {
    var _review$date, _review$date$$date;

    return {
      _id: review._id,
      date: (_review$date = review.date) === null || _review$date === void 0 ? void 0 : (_review$date$$date = _review$date.$date) === null || _review$date$$date === void 0 ? void 0 : _review$date$$date.$numberLong,
      reviewer_name: review.reviewer_name,
      comments: review.comments
    };
  })
});

exports.mapAccommodationFromModelToApi = mapAccommodationFromModelToApi;

const mapAccommodationFromApiToModel = review => ({
  _id: new _mongodb.ObjectId(review._id),
  date: {
    $date: {
      $numberLong: new Date()
    }
  },
  reviewer_name: review.reviewer_name,
  comments: review.comments,
  listing_id: '',
  reviewer_id: ''
});

exports.mapAccommodationFromApiToModel = mapAccommodationFromApiToModel;

const mapAccommodationListFromModelToApi = accommodationList => Array.isArray(accommodationList) ? accommodationList.map(mapAccommodationFromModelToApi) : [];

exports.mapAccommodationListFromModelToApi = mapAccommodationListFromModelToApi;