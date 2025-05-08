import { Suspense } from "react"
import ProductDetailWrapper from "@/components/product-detail-wrapper"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProductPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <Suspense fallback={<div>Loading product details...</div>}>
        <ProductDetailWrapper />
      </Suspense>
    </main>
  )
}
