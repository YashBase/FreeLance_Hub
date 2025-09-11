using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class ClientTable
{
    public int ClientId { get; set; }

    public int UserId { get; set; }

    public string? ProfileImg { get; set; }

    public virtual ICollection<PaymentTable> PaymentTables { get; set; } = new List<PaymentTable>();

    public virtual ICollection<RequirementTable> RequirementTables { get; set; } = new List<RequirementTable>();

    public virtual UserTable User { get; set; } = null!;

    public virtual ICollection<VendorfeedbackTable> VendorfeedbackTables { get; set; } = new List<VendorfeedbackTable>();
}
