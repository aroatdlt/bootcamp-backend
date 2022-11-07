"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accommodationsApi = void 0;

var _express = require("express");

var _dals = require("../../dals");

var _accommodation = require("./accommodation.mappers");

const accommodationsApi = (0, _express.Router)();
exports.accommodationsApi = accommodationsApi;
accommodationsApi.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const selectedCountry = req.query.country;
    let accommodationsListByCountry = await _dals.accommodationRepository.getAccommodationsListByCountry(selectedCountry, page, pageSize);
    res.send((0, _accommodation.mapAccommodationListFromModelToApi)(accommodationsListByCountry));
  } catch (error) {
    next(error);
  }
}).get("/:id", async (req, res, next) => {
  //Alojamiento por casa
  try {
    const {
      id
    } = req.params;
    const accommodation = await _dals.accommodationRepository.getAccommodationById(id);
    res.send((0, _accommodation.mapAccommodationFromModelToApi)(accommodation));
  } catch (error) {
    next(error);
  }
}).put("/:id", async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    if (await _dals.accommodationRepository.getAccommodationById(id)) {
      const review = (0, _accommodation.mapAccommodationFromApiToModel)(req.body);
      const newReview = await _dals.accommodationRepository.insertReview(id, review);
      res.status(201).send((0, _accommodation.mapAccommodationFromModelToApi)(newReview));
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});