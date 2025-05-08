import { getProducts } from "@/lib/api"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Edit } from "lucide-react"
import DeleteProduct from "./delete-product"

export default async function ProductList() {
  const products = await getProducts()

  if (!products.length) {
    return (
      <div className="text-center p-10 border rounded-lg">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Get started by creating a new product.</p>
        <Link href="/products/new" className="mt-4 inline-block">
          <Button>Add your first product</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-muted-foreground line-clamp-2">{product.description}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-lg">${product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Stock: {product.quantity}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/products/${product.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <div className="space-x-2">
              <Link href={`/products/${product.id}/edit`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <DeleteProduct id={product.id} />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
