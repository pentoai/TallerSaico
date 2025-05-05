using Xunit;

public class ProductRepositoryTests: IDisposable
{
    public void Dispose()
    {
        // Clean up after each test if necessary
        ProductRepository.Reset();
    }


    [Fact]
    public void GetAll_ReturnsAllProducts()
    {
        // Act
        var products = ProductRepository.GetAll();

        // Assert
        Assert.NotNull(products);
        Assert.NotEmpty(products);
    }

    [Fact]
    public void GetById_ReturnsProduct_WhenProductExists()
    {
        // Arrange
        var productId = 1;

        // Act
        var product = ProductRepository.GetById(productId);

        // Assert
        Assert.NotNull(product);
        Assert.Equal(productId, product.Id);
    }

    [Fact]
    public void GetById_ReturnsNull_WhenProductDoesNotExist()
    {
        // Arrange
        var productId = 999;

        // Act
        var product = ProductRepository.GetById(productId);

        // Assert
        Assert.Null(product);
    }

    [Fact]
    public void Add_AddsProductToRepository()
    {
        // Arrange
        var newProduct = new Product
        {
            Name = "New Product",
            Description = "New Description",
            Price = 50,
            Quantity = 20
        };

        // Act
        ProductRepository.Add(newProduct);
        var addedProduct = ProductRepository.GetById(newProduct.Id);

        // Assert
        Assert.NotNull(addedProduct);
        Assert.Equal(newProduct.Name, addedProduct.Name);
    }

    [Fact]
    public void Update_UpdatesExistingProduct()
    {
        // Arrange
        var updatedProduct = new Product
        {
            Name = "Updated Product",
            Description = "Updated Description",
            Price = 150,
            Quantity = 10
        };

        // Act
        var result = ProductRepository.Update(1, updatedProduct);
        var product = ProductRepository.GetById(1);

        // Assert
        Assert.True(result);
        Assert.NotNull(product);
        Assert.Equal(updatedProduct.Name, product!.Name);
    }

    [Fact]
    public void Delete_RemovesProductFromRepository()
    {
        // Arrange
        var productId = 1;

        // Act
        var result = ProductRepository.Delete(productId);
        var product = ProductRepository.GetById(productId);

        // Assert
        Assert.True(result);
        Assert.Null(product);
    }
}