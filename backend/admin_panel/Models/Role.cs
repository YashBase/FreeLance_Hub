using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string Rname { get; set; } = null!;

    public virtual ICollection<UserTable> UserTables { get; set; } = new List<UserTable>();
}
