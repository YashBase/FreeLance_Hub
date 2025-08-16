using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class SkillTable
{
    public int SkillId { get; set; }

    public string SkillName { get; set; } = null!;

    public string? SkillDescription { get; set; }

    public virtual ICollection<RequirementskillTable> RequirementskillTables { get; set; } = new List<RequirementskillTable>();

    public virtual ICollection<VendorskillsTable> VendorskillsTables { get; set; } = new List<VendorskillsTable>();
}
