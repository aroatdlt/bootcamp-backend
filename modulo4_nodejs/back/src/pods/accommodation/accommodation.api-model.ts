export interface Accommodation {
  _id: string;
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
  _id: string,
  date: string;
  reviewer_name: string,
  comments: string,
}

interface Address {
  country: string
  street: string
}

