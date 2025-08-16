using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class UserTable
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public int RoleId { get; set; }

    public string Contact { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Status { get; set; }

    public virtual ICollection<ClientTable> ClientTables { get; set; } = new List<ClientTable>();

    public virtual Role Role { get; set; } = null!;

    public virtual ICollection<VendorTable> VendorTables { get; set; } = new List<VendorTable>();
}
