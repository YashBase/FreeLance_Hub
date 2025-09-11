using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class RequirementTable
{
    public int ReqId { get; set; }

    public int ClientId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Budget { get; set; }

    public virtual ClientTable Client { get; set; } = null!;

    public virtual ICollection<ProposalsTable> ProposalsTables { get; set; } = new List<ProposalsTable>();

    public virtual ICollection<RequirementskillTable> RequirementskillTables { get; set; } = new List<RequirementskillTable>();
}
