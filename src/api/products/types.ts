import { IPagination } from "../types";

export interface IGetProductsParams extends IPagination {
  search?: string;
}


export interface IProducts {
  id: string;
  name: string;
  quantity: number;
  warningThreshold: number;
  createdAt: string;
  // Sotib olingan narx
  cost: number;
  // Sotuvda sotiladigan narxi
  price: number;
  // Foyda
  avarage_cost: number;
  lastSale: string;
}

export interface IAddEditProduct {
  id?: string;
  name: string;
  cost: number;
  price: number;
  quantity: number;
  warningThreshold: number;
}

export interface IProductTotalCalc {
  totalProductCount: number,
  totalProductCost: number,
  totalProductPrice: number,
}
