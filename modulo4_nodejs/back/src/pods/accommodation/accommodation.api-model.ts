import { ObjectId } from "mongodb";

export interface Accommodation {
  _id: ObjectId;
  name: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  address: Address;
  image: string;
  reviews: Reviews;
}

export interface Reviews extends Array<Review>{}

export interface Review {
  _id: ObjectId,
  date: string;
  reviewer_name: string,
  comments: string,
}

interface Address {
  country: string
  street: string
}

