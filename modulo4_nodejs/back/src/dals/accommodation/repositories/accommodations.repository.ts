import { Accommodation, Review } from "../accommodation.model";

export interface AccommodationRepository {
  getAccommodationsListByCountry: (country: string) => Promise<Accommodation[]>;
  getAccommodationById: (id: string) => Promise<Accommodation>;
  insertReview: (id: string, review: Review) => Promise<Accommodation[]>;
}


