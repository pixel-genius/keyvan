// API utility for product-related requests
// Base URL for the backend API
export const BASE_URL = 'http://185.204.169.5:8000';

// Endpoint for fetching products
const PRODUCTS_ENDPOINT = '/shop/products/';

// TODO: Define a proper Product type based on backend response
export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  created_at: string;
  is_active: boolean;
  latest_price: number;
}

// Fetch products from the API
export async function fetchProductsFromApi(): Promise<ApiProduct[]> {
  try {
    const response = await fetch(BASE_URL + PRODUCTS_ENDPOINT, {
      // Add headers or credentials if needed
    });
    if (!response.ok) {
      // TODO: Add better error handling/logging
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    // TODO: Validate/transform data if necessary
    return data;
  } catch (error) {
    // TODO: Handle error (e.g., show notification, fallback, etc.)
    throw error;
  }
}

// Fetch a single product by ID from the API
export async function fetchProductById(id: string): Promise<ApiProduct | null> {
  try {
    const response = await fetch(BASE_URL + PRODUCTS_ENDPOINT + id + '/', {
      // Add headers or credentials if needed
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Product not found
      }
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // TODO: Handle error (e.g., show notification, fallback, etc.)
    throw error;
  }
} 