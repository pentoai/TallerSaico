using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

public class ProductsControllerTests: IDisposable
{
    public void Dispose()
    {
        // Clean up after each test if necessary
        ProductRepository.Reset();
    }

    [Fact]
    public void GetAll_ReturnsAllProducts()
    {
        // Arrange
        var controller = new ProductsController();

        // Act
        var result = controller.GetAll() as OkObjectResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<OkObjectResult>(result);
        var products = Assert.IsAssignableFrom<List<Product>>(result.Value);
        Assert.NotEmpty(products);
    }

    [Fact]
    public void GetById_ReturnsProduct_WhenProductExists()
    {
        // Arrange
        var controller = new ProductsController();
        var productId = 1;

        // Act
        var result = controller.GetById(productId) as OkObjectResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<OkObjectResult>(result);
        var product = Assert.IsType<Product>(result.Value);
        Assert.Equal(productId, product.Id);
    }

    [Fact]
    public void GetById_ReturnsNotFound_WhenProductDoesNotExist()
    {
        // Arrange
        var controller = new ProductsController();
        var productId = 999;

        // Act
        var result = controller.GetById(productId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public void Create_AddsProductAndReturnsCreatedResult()
    {
        // Arrange
        var controller = new ProductsController();
        var newProduct = new Product
        {
            Name = "Test Product",
            Description = "Test Description",
            Price = 100,
            Quantity = 10
        };

        // Act
        var result = controller.Create(newProduct) as CreatedAtActionResult;

        // Assert
        Assert.NotNull(result);
        Assert.IsType<CreatedAtActionResult>(result);
        var createdProduct = Assert.IsType<Product>(result.Value);
        Assert.Equal(newProduct.Name, createdProduct.Name);
    }

    [Fact]
    public void Update_UpdatesProductAndReturnsNoContent()
    {
        // Arrange
        var controller = new ProductsController();
        var updatedProduct = new Product
        {
            Name = "Updated Product",
            Description = "Updated Description",
            Price = 200,
            Quantity = 5
        };

        // Act
        var result = controller.Update(1, updatedProduct);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public void Delete_RemovesProductAndReturnsNoContent()
    {
        // Arrange
        var controller = new ProductsController();
        var productId = 1;

        // Act
        var result = controller.Delete(productId);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }
}