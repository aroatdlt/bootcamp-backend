import { AccommodationRepository } from "./accommodations.repository";
import { Review } from "../accommodation.model";

export const dbRepository: AccommodationRepository = {
  getAccommodationsListByCountry: async (country: string, page?: number, pageSize?: number) => {
    throw new Error("Not implemented");
  },
  getAccommodationById: async (id: string) => {
    throw new Error("Not implemented");
  },
  insertReview: async (id: string, review: Review) => {
    throw new Error("Not implemented");
  },
};