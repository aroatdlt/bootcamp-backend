import { AccommodationRepository } from "./accommodations.repository";
import { Review } from "../accommodation.model";
import { getAccommodationContext } from '../accommodation.context';
import { ObjectId } from "mongodb"

export const dbRepository: AccommodationRepository = {
  getAccommodationsListByCountry: async (country: string, page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getAccommodationContext()
    .find({"address.country": country})
    .skip(skip)
    .limit(limit)
    .toArray();
  },
  getAccommodationById: async (id: string) => {
    const [result] = await getAccommodationContext()
    .find({ "_id" : id })
    .toArray();
    return result
  },
  insertReview: async (id: string, review: Review) => {
    await getAccommodationContext().findOneAndUpdate(
      { id: new ObjectId(id) },
      { $push: { "reviews": review }},
      { upsert: true, returnDocument: "after" }
    );
    return getAccommodationContext().find().toArray();
  },
};