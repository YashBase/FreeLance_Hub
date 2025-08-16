using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class PaymentTable
{
    public int PaymentId { get; set; }

    public int ClientId { get; set; }

    public int VendorId { get; set; }

    public int TaskId { get; set; }

    public DateOnly Date { get; set; }

    public decimal Amount { get; set; }

    public virtual ClientTable Client { get; set; } = null!;

    public virtual TaskTable Task { get; set; } = null!;

    public virtual VendorTable Vendor { get; set; } = null!;
}
