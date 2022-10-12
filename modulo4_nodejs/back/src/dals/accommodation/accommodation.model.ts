export interface Accommodation {
  id: string;
  name: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  address: Address;
  image: string;
  reviews: Reviews;
}

interface Reviews extends Array<Review>{}

export interface Review {
  date: Date;
  reviewer_name: string,
  comments: string,
}

interface Address {
  country: string
  street: string
}