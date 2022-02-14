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
    public class StoresController : ControllerBase
    {
        private readonly onboardingtaskContext _context;

        public StoresController(onboardingtaskContext context)
        {
            _context = context;
        }

        // GET: api/Stores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStore()
        {
            return await _context.Store.ToListAsync();
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStoreJust()
        {
            var result = await _context.Store.Select(s => new StoreDTO
            {
                StoreId = s.Id,
                StoreName = s.Name
            }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStoreNameSortedAsc()
        {
            var result = await _context.Store.OrderBy(s => s.Name).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStoreNameSortedDes()
        {
            var result = await _context.Store.OrderByDescending(s => s.Name).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStoreAddressSortedAsc()
        {
            var result = await _context.Store.OrderBy(s => s.Address).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Store>>> GetStoreAddressSortedDes()
        {
            var result = await _context.Store.OrderByDescending(s => s.Address).ToListAsync();

            return Ok(result);
        }


        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Store>> GetStore(int id)
        {
            var store = await _context.Store.FindAsync(id);

            if (store == null)
            {
                return NotFound();
            }

            return store;
        }

        // PUT: api/Stores/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStore(int id, Store store)
        {
            store.Id = id;
//waiting to fix
            if (id != store.Id)
            {
                return BadRequest();
            }

            _context.Entry(store).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoreExists(id))
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

        // POST: api/Stores
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Store>> PostStore(Store store)
        {
            _context.Store.Add(store);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStore", new { id = store.Id }, store);
        }

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Store>> DeleteStore(int id)
        {
            var store = await _context.Store.FindAsync(id);
            if (store == null)
            {
                return NotFound();
            }

            _context.Store.Remove(store);
            await _context.SaveChangesAsync();

            return store;
        }

        private bool StoreExists(int id)
        {
            return _context.Store.Any(e => e.Id == id);
        }
    }
}
