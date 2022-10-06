import { Router } from "express";
import { getAccommodationsListByCountry, getAccommodationsList, getAccommodationById, insertReview } from "./mock-db";

export const accommodationsApi = Router();


// TODO: añadir el endpoint de introducir un nuevo comentario
accommodationsApi //Para todos los alojamientos
  .get("/", async (req, res, next) => {
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      let accommodationsList = await getAccommodationsList();
   
      if (page && pageSize) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, accommodationsList.length);
        accommodationsList = accommodationsList.slice(startIndex, endIndex);
      }
      res.send(accommodationsList);
    } catch (error) {
      next(error);
    }
  })
  .get("/:country", async (req, res, next) => { //Lista de casas por país
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const selectedCountry = (req.query.country);
      let accommodationsListByCountry = await getAccommodationsListByCountry(selectedCountry);
   
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
    const accommodationId = Number(id);
    const accommodation = await getAccommodationById(accommodationId);
    res.send(accommodation);
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const accommodationId = Number(id);
    const review = req.body;
    const accommodationUpdatedReview = await insertReview(id, review);
  });


  