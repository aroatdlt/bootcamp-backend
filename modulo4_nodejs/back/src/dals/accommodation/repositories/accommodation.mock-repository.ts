import { AccommodationRepository } from "./accommodations.repository";
import { Accommodation, Review } from "../accommodation.model";
import { db } from "../../mock-data";

const paginateAccommodationList = (
  accommodationList: Accommodation[],
  page: number,
  pageSize: number
): Accommodation[] => {
  let paginatedAccommodationList = [...accommodationList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, paginatedAccommodationList.length);
  paginatedAccommodationList = paginatedAccommodationList.slice(startIndex, endIndex);
}
  
  return paginatedAccommodationList;
};

export const mockRepository: AccommodationRepository = {
  getAccommodationsListByCountry: async (country, page?: number, pageSize?: number) => {
   const dbFilteredAccommodations = db.accommodations.filter(accommodation => {
      if(accommodation.address.country === country){
        return accommodation
      }
    })
    return dbFilteredAccommodations.length === 0 ? paginateAccommodationList(db.accommodations, page, pageSize) : paginateAccommodationList(dbFilteredAccommodations, page, pageSize)
  },
  getAccommodationById: async (id: string) => db.accommodations.find((accommodation) => accommodation._id === id),
  insertReview: async (id: string, review: Review) => {
    return db.accommodations.map((accommodation) => {
      Boolean(accommodation._id) ? accommodation.reviews.push(review) : accommodation
      return accommodation
    })
  },
};