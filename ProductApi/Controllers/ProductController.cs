using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(ProductRepository.GetAll());

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = ProductRepository.GetById(id);
        return product != null ? Ok(product) : NotFound();
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
        ProductRepository.Add(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Product product)
    {
        return ProductRepository.Update(id, product) ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return ProductRepository.Delete(id) ? NoContent() : NotFound();
    }

    [HttpPost("{id}/apply-discount")]
    public ActionResult<Product> ApplyDiscount(int id, [FromBody] DiscountRequest request)
    {
        var product = ProductRepository.GetById(id);
        if (product == null)
            return NotFound();

        decimal discount = 0;

        if (request.CustomerType?.ToLower() == "premium")
            discount += 0.10m;

        if (request.Season?.ToLower() == "summer")
            discount += 0.05m;

        var discountedProduct = new Product
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Quantity = product.Quantity,
            Price = product.Price * (1 - discount)
        };

        return Ok(discountedProduct);
    }
}