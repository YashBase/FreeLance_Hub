using admin_panel.Dto;
using admin_panel.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace admin_panel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly P12MeetYourNeedContext _context;
        public AdminController(P12MeetYourNeedContext context)
        {
            _context = context;
        }

        // GET: api/Admin/counts
        [HttpGet("counts")]
        public async Task<IActionResult> GetDashboardCounts()
        {
            try
            {
                var adminRoleId = await _context.Roles
                    .Where(r => !string.IsNullOrEmpty(r.Rname) && r.Rname.ToLower() == "admin")
                    .Select(r => r.RoleId)
                    .FirstOrDefaultAsync();

                var totalUsers = await _context.UserTables
                    .Where(u => u.RoleId != adminRoleId)
                    .CountAsync();

                var clients = await _context.ClientTables.CountAsync();
                var vendors = await _context.VendorTables.CountAsync();

                var activeUsers = await _context.UserTables
                    .Where(u => u.RoleId != adminRoleId && !string.IsNullOrEmpty(u.Status) && u.Status.ToLower() == "active")
                    .CountAsync();

                var inactiveUsers = await _context.UserTables
                    .Where(u => u.RoleId != adminRoleId && !string.IsNullOrEmpty(u.Status) && u.Status.ToLower() == "inactive")
                    .CountAsync();

                return Ok(new
                {
                    totalUsers,
                    clients,
                    vendors,
                    activeUsers,
                    inactiveUsers
                });
            }
            catch (Exception ex)
            {
                // Log error and return safe response
                Console.WriteLine("Error in GetDashboardCounts: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }

        // GET: api/Admin/non-admin
        [HttpGet("non-admin")]
        public async Task<IActionResult> GetNonAdminUsers()
        {
            try
            {
                var adminRoleId = await _context.Roles
                    .Where(r => !string.IsNullOrEmpty(r.Rname) && r.Rname.ToLower() == "admin")
                    .Select(r => r.RoleId)
                    .FirstOrDefaultAsync();

                var users = await _context.UserTables
                    .Where(u => u.RoleId != adminRoleId)
                    .Select(u => new
                    {
                        userId = u.UserId,
                        userName = u.UserName ?? "",
                        email = u.Email ?? "",
                        status = u.Status ?? "inactive"
                    })
                    .ToListAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GetNonAdminUsers: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }

        // GET: api/Admin/filter
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredUsers([FromQuery] string role = "All", [FromQuery] string search = "")
        {
            try
            {
                var adminRoleId = await _context.Roles
                    .Where(r => !string.IsNullOrEmpty(r.Rname) && r.Rname.ToLower() == "admin")
                    .Select(r => r.RoleId)
                    .FirstOrDefaultAsync();

                var query = _context.UserTables
                    .Where(u => u.RoleId != adminRoleId)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(role))
                {
                    if (role.ToLower() == "client")
                    {
                        var clientIds = await _context.ClientTables.Select(c => c.UserId).ToListAsync();
                        query = query.Where(u => clientIds.Contains(u.UserId));
                    }
                    else if (role.ToLower() == "vendor")
                    {
                        var vendorIds = await _context.VendorTables.Select(v => v.UserId).ToListAsync();
                        query = query.Where(u => vendorIds.Contains(u.UserId));
                    }
                }

                if (!string.IsNullOrEmpty(search))
                {
                    string lowerSearch = search.ToLower();
                    query = query.Where(u =>
                        (!string.IsNullOrEmpty(u.UserName) && u.UserName.ToLower().Contains(lowerSearch)) ||
                        (!string.IsNullOrEmpty(u.Email) && u.Email.ToLower().Contains(lowerSearch))
                    );
                }

                var users = await query
                    .Select(u => new
                    {
                        userId = u.UserId,
                        userName = u.UserName ?? "",
                        email = u.Email ?? "",
                        status = u.Status ?? "inactive"
                    })
                    .ToListAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GetFilteredUsers: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }

        // PUT: api/Admin/status/{userId}
        [HttpPut("status/{userId}")]
        public async Task<IActionResult> UpdateUserStatus(int userId, [FromBody] StatusDto dto)
        {
            try
            {
                var user = await _context.UserTables.FindAsync(userId);
                if (user == null)
                    return NotFound(new { error = "User not found" });

                user.Status = dto?.Status ?? "inactive";
                await _context.SaveChangesAsync();

                return Ok(new { message = "Status updated", status = user.Status });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in UpdateUserStatus: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }
    }
}
