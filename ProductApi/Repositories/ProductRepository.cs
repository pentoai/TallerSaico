public static class ProductRepository
{
    private static List<Product> Products = new List<Product>
    {
        new Product { Id = 1, Name = "Laptop", Description = "Gaming Laptop", Price = 1200, Quantity = 5 },
        new Product { Id = 2, Name = "Mouse", Description = "Wireless Mouse", Price = 25, Quantity = 50 },
        new Product { Id = 3, Name = "Keyboard", Description = "Mechanical Keyboard", Price = 75, Quantity = 20 }
    };

    public static void Reset()
    {
        Products = new List<Product>
        {
            new Product { Id = 1, Name = "Laptop", Description = "Gaming Laptop", Price = 1200, Quantity = 5 },
            new Product { Id = 2, Name = "Phone", Description = "Smartphone", Price = 800, Quantity = 10 },
            new Product { Id = 3, Name = "Tablet", Description = "Android Tablet", Price = 400, Quantity = 7 }
        };
    }

    public static List<Product> GetAll() => Products;

    public static Product? GetById(int id) => Products.FirstOrDefault(p => p.Id == id);

    public static void Add(Product product)
    {
        product.Id = Products.Max(p => p.Id) + 1;
        Products.Add(product);
    }

    public static bool Update(int id, Product updated)
    {
        var product = GetById(id);
        if (product == null) return false;
        product.Name = updated.Name;
        product.Description = updated.Description;
        product.Price = updated.Price;
        product.Quantity = updated.Quantity;
        return true;
    }

    public static bool Delete(int id)
    {
        var product = GetById(id);
        return product != null && Products.Remove(product);
    }
}