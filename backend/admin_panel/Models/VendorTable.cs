using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class VendorTable
{
    public int VendorId { get; set; }

    public int UserId { get; set; }

    public int? Experience { get; set; }

    public decimal? Rating { get; set; }

    public virtual ICollection<PaymentTable> PaymentTables { get; set; } = new List<PaymentTable>();

    public virtual ICollection<ProposalsTable> ProposalsTables { get; set; } = new List<ProposalsTable>();

    public virtual UserTable User { get; set; } = null!;

    public virtual ICollection<VendorfeedbackTable> VendorfeedbackTables { get; set; } = new List<VendorfeedbackTable>();

    public virtual ICollection<VendorskillsTable> VendorskillsTables { get; set; } = new List<VendorskillsTable>();
}
