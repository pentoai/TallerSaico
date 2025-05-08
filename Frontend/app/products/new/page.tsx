import ProductForm from "@/components/product-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewProductPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>

      <ProductForm />
    </main>
  )
}
