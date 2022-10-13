import * as model from "dals";
import * as apiModel from "./accommodation.api-model";

export const mapAccommodationFromModelToApi = (accommodation: model.Accommodation): apiModel.Accommodation => ({
  _id: accommodation._id,
  name: accommodation.name,
  description: accommodation.description,
  bedrooms: accommodation.bedrooms,
  bathrooms: Number(accommodation.bathrooms.$numberDecimal),
  beds: accommodation.beds,
  address: {
    country: accommodation.address.country,
    street: accommodation.address.street
  },
  image: accommodation.images.picture_url,
  reviews: accommodation.reviews.map((review: model.Review): apiModel.Review => {
    return {
      _id: review._id, 
      date: new Date(Number(review.date.$date.$numberLong)).toUTCString(),
      reviewer_name: review.reviewer_name,
      comments: review.comments
    }
  })
});

export const mapAccommodationFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: review._id, 
  date: {
    $date: {
      $numberLong: Date.now().toString()
    }
  },
  reviewer_name: review.reviewer_name,
  comments: review.comments,
  listing_id: '',
  reviewer_id: ''
});

export const mapAccommodationListFromModelToApi = (
  accommodationList: model.Accommodation[]
): apiModel.Accommodation[] => accommodationList.map(mapAccommodationFromModelToApi);