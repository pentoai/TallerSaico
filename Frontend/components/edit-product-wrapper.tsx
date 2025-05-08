"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProductForm from "./product-form"
import { getProduct } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function EditProductWrapper() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true)
        const id =
          typeof params.id === "string"
            ? Number.parseInt(params.id, 10)
            : Array.isArray(params.id)
              ? Number.parseInt(params.id[0], 10)
              : 0

        if (isNaN(id) || id <= 0) {
          throw new Error("Invalid product ID")
        }

        const productData = await getProduct(id)
        setProduct(productData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product")
        console.error("Error loading product:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  if (isLoading) {
    return <div>Loading product details...</div>
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
        >
          Return to Products
        </button>
      </div>
    )
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return <ProductForm product={product} />
}
