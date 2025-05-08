import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-medium mt-4 mb-6">Product Not Found</h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The product you are looking for doesn't exist or has been removed.
      </p>
      <Link href="/">
        <Button>Return to Products</Button>
      </Link>
    </div>
  )
}
