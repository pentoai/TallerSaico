"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit } from "lucide-react"
import DeleteProduct from "@/components/delete-product"
import { getProduct } from "@/lib/api"
import type { Product } from "@/lib/types"

export default function ProductDetailWrapper() {
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

  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="space-x-2">
          <Link href={`/products/${product.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <DeleteProduct id={product.id} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">ID: {product.id}</p>
              <p className="text-lg font-medium">Description</p>
              <p className="text-muted-foreground">{product.description || "No description provided"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Inventory Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quantity in Stock</p>
                <p className="text-2xl font-bold">{product.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
