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
    public class CustomersController : ControllerBase
    {
        private readonly onboardingtaskContext _context;

        public CustomersController(onboardingtaskContext context)
        {
            _context = context;
        }

        // GET: api/Customers/GetCustomer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customer.ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomerJustData()
        {
            var result = await _context.Customer.Select(s => new CustomerDTO
            {
                CustomerId = s.Id,
                CustomerName = s.Name
            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomerSortedUp()
        {
            var result = await _context.Customer.OrderBy(s => s.Name).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomerSortedDown()
        {
            var result = await _context.Customer.OrderByDescending(s => s.Name).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAddressSortedAsc()
        {
            var result = await _context.Customer.OrderByDescending(s => s.Address).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAddressSortedDes()
        {
            var result = await _context.Customer.OrderByDescending(s => s.Address).ToListAsync();

            return Ok(result);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/PutCustomer/1
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            //customer.Id = id;

            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else {            
                _context.Customer.Add(customer);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer); 
            }

        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
