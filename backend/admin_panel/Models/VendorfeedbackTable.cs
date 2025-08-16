using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class VendorfeedbackTable
{
    public int VenfeedId { get; set; }

    public int VendorId { get; set; }

    public int ClientId { get; set; }

    public decimal? Rating { get; set; }

    public virtual ClientTable Client { get; set; } = null!;

    public virtual VendorTable Vendor { get; set; } = null!;
}
