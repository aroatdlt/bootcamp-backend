import { Router } from "express";
import { getAccommodationsListByCountry, getAccommodationById, insertReview } from "./mock-db";
import { accommodationRepository } from "dals";

export const accommodationsApi = Router();

accommodationsApi 
  .get("/", async (req, res, next) => { 
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const selectedCountry = req.query.country as string;
      let accommodationsListByCountry = await accommodationRepository.getAccommodationsListByCountry(selectedCountry);
   
      if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, accommodationsListByCountry.length);
        accommodationsListByCountry = accommodationsListByCountry.slice(startIndex, endIndex);
      }
      res.send(accommodationsListByCountry);
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res) => { //Alojamiento por casa
    const { id } = req.params;
    const accommodation = await getAccommodationById(id);
    res.send(accommodation);
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const review = req.body;
    await insertReview(id, review);
    res.sendStatus(204);
  });


  