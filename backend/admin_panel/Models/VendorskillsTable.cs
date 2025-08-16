using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class VendorskillsTable
{
    public int VenskillId { get; set; }

    public int VendorId { get; set; }

    public int SkillId { get; set; }

    public virtual SkillTable Skill { get; set; } = null!;

    public virtual VendorTable Vendor { get; set; } = null!;
}
