// Public review information is only added after the salon listing is verified.
export type SalonReview = {
  author: string;
  rating: number;
  text: string;
  sourceUrl: string;
};

export const SALON_REVIEWS: {
  rating: number | null;
  count: number | null;
  listingUrl: string | null;
  writeReviewUrl: string | null;
  reviews: SalonReview[];
} = {
  rating: null,
  count: null,
  listingUrl: null,
  writeReviewUrl: null,
  reviews: [],
};