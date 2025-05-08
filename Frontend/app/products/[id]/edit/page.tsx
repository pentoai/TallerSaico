import { Suspense } from "react"
import EditProductWrapper from "@/components/edit-product-wrapper"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditProductPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <Suspense fallback={<div>Loading product...</div>}>
        <EditProductWrapper />
      </Suspense>
    </main>
  )
}
