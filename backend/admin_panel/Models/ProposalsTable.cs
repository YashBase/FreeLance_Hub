using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class ProposalsTable
{
    public int ProposalId { get; set; }

    public int ReqId { get; set; }

    public int VendorId { get; set; }

    public string? Summary { get; set; }

    public string Status { get; set; } = null!;

    public virtual RequirementTable Req { get; set; } = null!;

    public virtual ICollection<TaskTable> TaskTables { get; set; } = new List<TaskTable>();

    public virtual VendorTable Vendor { get; set; } = null!;
}
