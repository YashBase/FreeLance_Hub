using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class TaskTable
{
    public int TaskId { get; set; }

    public int ProposalId { get; set; }

    public string TaskName { get; set; } = null!;

    public string? TaskDescription { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public virtual ICollection<PaymentTable> PaymentTables { get; set; } = new List<PaymentTable>();

    public virtual ProposalsTable Proposal { get; set; } = null!;
}
