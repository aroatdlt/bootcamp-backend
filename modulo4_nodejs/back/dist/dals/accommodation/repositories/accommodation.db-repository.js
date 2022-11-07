"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbRepository = void 0;

var _accommodation = require("../accommodation.context");

const dbRepository = {
  getAccommodationsListByCountry: async (country, page, pageSize) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await (0, _accommodation.getAccommodationContext)().find({
      "address.country": country
    }).skip(skip).limit(limit).toArray();
  },
  getAccommodationById: async id => {
    const [result] = await (0, _accommodation.getAccommodationContext)().find({
      "_id": id
    }).toArray();
    return result;
  },
  insertReview: async (id, review) => {
    await (0, _accommodation.getAccommodationContext)().findOneAndUpdate({
      "_id": id
    }, {
      $push: {
        "reviews": review
      }
    }, {
      upsert: true,
      returnDocument: "after"
    });
    const [result] = await (0, _accommodation.getAccommodationContext)().find({
      "_id": id
    }).toArray();
    return result;
  }
};
exports.dbRepository = dbRepository;