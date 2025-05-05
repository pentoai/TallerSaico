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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        ProductRepository.Add(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Product product)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return ProductRepository.Update(id, product) ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return ProductRepository.Delete(id) ? NoContent() : NotFound();
    }
}