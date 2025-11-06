export interface Experience {
  experienceName: string;
  location: string;
  imageUrl: string;
  details: string;
  about: string;
  price: number;
}

export interface Slots {
  date: Date;
  time: string;
  available: boolean;
  capacity: number;
  booked: number;
}

export type FinalExperience = Experience & Slots[] & { id: string };
