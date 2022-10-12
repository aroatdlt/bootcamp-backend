import { AccommodationRepository } from "./accommodations.repository";
import { Accommodation, Review } from "../accommodation.model";
import { db } from "../../mock-data";

export const mockRepository: AccommodationRepository = {
  getAccommodationsListByCountry: async (country) => {
   const dbFilteredAccommodations = db.accommodations.filter(accommodation => {
      if(accommodation.address.country === country){
        return accommodation
      }
    })
    return dbFilteredAccommodations.length === 0 ? db.accommodations : dbFilteredAccommodations
  },
  getAccommodationById: async (id: string) => db.accommodations.find((accommodation) => accommodation.id === id),
  insertReview: async (id: string, review: Review) => db.accommodations.map((accommodation) => {
    Boolean(accommodation.id) ? accommodation.reviews.push(review) : accommodation
    return accommodation
  })
};