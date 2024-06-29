// pages/api/search/get-address/[lat].ts
import { NextApiRequest, NextApiResponse } from 'next';

type City = string;
type Street = string;

interface IGetAddressResponse {
  address: [City, Street];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<IGetAddressResponse>) {
  const { lat, lng } = req.query;

  // Mock data
  const mockAddress: IGetAddressResponse = {
    address: ["Mock City", "Mock Street"],
  };

  res.status(200).json(mockAddress);
}