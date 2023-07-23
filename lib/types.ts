export type Log = {
  _id: string;
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
