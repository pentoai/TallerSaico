import type { Product } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

// Get a single product by ID
export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Error fetching product: ${response.status}`)
  }

  return response.json()
}

// Create a new product
export async function createProduct(product: Product): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error(`Error creating product: ${response.status}`)
  }

  return response.json()
}

// Update an existing product
export async function updateProduct(id: number, product: Product): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error(`Error updating product: ${response.status}`)
  }

  return response.json()
}

// Delete a product
export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Error deleting product: ${response.status}`)
  }
}
