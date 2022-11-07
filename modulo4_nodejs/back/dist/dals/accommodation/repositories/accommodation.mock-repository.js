"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockRepository = void 0;

var _mockData = require("../../mock-data");

var _mongodb = require("mongodb");

const paginateAccommodationList = (accommodationList, page, pageSize) => {
  let paginatedAccommodationList = [...accommodationList];

  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedAccommodationList.length);
    paginatedAccommodationList = paginatedAccommodationList.slice(startIndex, endIndex);
  }

  return paginatedAccommodationList;
};

const mockRepository = {
  getAccommodationsListByCountry: async (country, page, pageSize) => {
    const dbFilteredAccommodations = _mockData.db.accommodations.filter(accommodation => {
      if (accommodation.address.country === country) {
        return accommodation;
      }
    });

    return dbFilteredAccommodations.length === 0 ? paginateAccommodationList(_mockData.db.accommodations, page, pageSize) : paginateAccommodationList(dbFilteredAccommodations, page, pageSize);
  },
  getAccommodationById: async id => {
    return _mockData.db.accommodations.find(accommodation => accommodation._id.toString() === id);
  },
  insertReview: async (id, review) => {
    const _id = new _mongodb.ObjectId(id);

    const reviewWithId = { ...review,
      _id
    };

    const insertReview = _mockData.db.accommodations.map(accommodation => {
      accommodation._id.toString() === id ? accommodation.reviews.push(reviewWithId) : accommodation;
      return accommodation;
    });

    return insertReview.find(accommodation => accommodation._id.toString() === id);
  }
};
exports.mockRepository = mockRepository;