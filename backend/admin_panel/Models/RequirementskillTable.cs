using System;
using System.Collections.Generic;

namespace admin_panel.Models;

public partial class RequirementskillTable
{
    public int ReqskillId { get; set; }

    public int ReqId { get; set; }

    public int SkillId { get; set; }

    public virtual RequirementTable Req { get; set; } = null!;

    public virtual SkillTable Skill { get; set; } = null!;
}
