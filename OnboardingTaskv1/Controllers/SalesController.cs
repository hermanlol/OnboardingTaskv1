using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnboardingTaskv1.Models;
using OnboardingTaskv1.Models.DTO;

namespace OnboardingTaskv1.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly onboardingtaskContext _context;

        public SalesController(onboardingtaskContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        [HttpGet]
        //Eager loading
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesIncludeC()
        {

            //Wrong
            //var result = await _context.Sales.Include(s => new Sales { Customer = s.Customer , Product = s.Product, Store = s.Store}).ToListAsync();

            var result = await _context.Sales.Include(s => s.Customer).Include(s => s.Product).Include(s => s.Store).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        //DTO loading
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesAllData()
        {

            //Wrong
            //var result = await _context.Sales.Include(s => new Sales { Customer = s.Customer , Product = s.Product, Store = s.Store}).ToListAsync();


            var result = await _context.Sales.Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesCustomerSortedAsc()
        {
            var result = await _context.Sales.OrderBy(s => s.Customer.Name).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesCustomerSortedDes()
        {
            var result = await _context.Sales.OrderByDescending(s => s.Customer.Name).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesProductSortedAsc()
        {
            var result = await _context.Sales.OrderBy(s => s.Product.Name).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesProductSortedDes()
        {
            var result = await _context.Sales.OrderByDescending(s => s.Product.Name).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesStoreSortedAsc()
        {
            var result = await _context.Sales.OrderBy(s => s.Store.Name).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesStoreSortedDes()
        {
            var result = await _context.Sales.OrderByDescending(s => s.Store.Name).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesDateSortedAsc()
        {
            var result = await _context.Sales.OrderBy(s => s.DateSold).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesDateSortedDes()
        {
            var result = await _context.Sales.OrderByDescending(s => s.DateSold).Select(s => new SalesDTO
            {
                Id = s.Id,
                ProductId = s.Product.Id,
                ProductName = s.Product.Name,
                CustomerId = s.Customer.Id,
                CustomerName = s.Customer.Name,
                StoreId = s.Store.Id,
                StoreName = s.Store.Name,
                DateSold = s.DateSold

            }).ToListAsync();

            return Ok(result);
        }





        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {

            sales.Id = id;

            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
