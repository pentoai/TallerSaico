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

    [HttpGet("search")]
    public IActionResult Search([FromQuery] string query)
    {
        try
        {
            var products = ProductRepository.Search(query);
            return Ok(products);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
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
}