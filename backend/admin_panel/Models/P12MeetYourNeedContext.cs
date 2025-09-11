using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace admin_panel.Models;

public partial class P12MeetYourNeedContext : DbContext
{
    public P12MeetYourNeedContext()
    {
    }

    public P12MeetYourNeedContext(DbContextOptions<P12MeetYourNeedContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ClientTable> ClientTables { get; set; }

    public virtual DbSet<PaymentTable> PaymentTables { get; set; }

    public virtual DbSet<ProposalsTable> ProposalsTables { get; set; }

    public virtual DbSet<RequirementTable> RequirementTables { get; set; }

    public virtual DbSet<RequirementskillTable> RequirementskillTables { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SkillTable> SkillTables { get; set; }

    public virtual DbSet<TaskTable> TaskTables { get; set; }

    public virtual DbSet<UserTable> UserTables { get; set; }

    public virtual DbSet<VendorTable> VendorTables { get; set; }

    public virtual DbSet<VendorfeedbackTable> VendorfeedbackTables { get; set; }

    public virtual DbSet<VendorskillsTable> VendorskillsTables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p12_meet_your_need", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.2-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<ClientTable>(entity =>
        {
            entity.HasKey(e => e.ClientId).HasName("PRIMARY");

            entity.ToTable("client_table");

            entity.Property(e => e.ClientId)
                .HasColumnType("int(11)")
                .HasColumnName("client_id");
            entity.Property(e => e.ProfileImg)
                .HasMaxLength(255)
                .HasColumnName("profile_img");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.ClientTables)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("client_table_ibfk_1");
        });

        modelBuilder.Entity<PaymentTable>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PRIMARY");

            entity.ToTable("payment_table");

            entity.Property(e => e.PaymentId)
                .HasColumnType("int(11)")
                .HasColumnName("payment_id");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.ClientId)
                .HasColumnType("int(11)")
                .HasColumnName("client_id");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.TaskId)
                .HasColumnType("int(11)")
                .HasColumnName("task_id");
            entity.Property(e => e.VendorId)
                .HasColumnType("int(11)")
                .HasColumnName("vendor_id");

            entity.HasOne(d => d.Client).WithMany(p => p.PaymentTables)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("payment_table_ibfk_1");

            entity.HasOne(d => d.Task).WithMany(p => p.PaymentTables)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("payment_table_ibfk_3");

            entity.HasOne(d => d.Vendor).WithMany(p => p.PaymentTables)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("payment_table_ibfk_2");
        });

        modelBuilder.Entity<ProposalsTable>(entity =>
        {
            entity.HasKey(e => e.ProposalId).HasName("PRIMARY");

            entity.ToTable("proposals_table");

            entity.Property(e => e.ProposalId)
                .HasColumnType("int(11)")
                .HasColumnName("proposal_id");
            entity.Property(e => e.ReqId)
                .HasColumnType("int(11)")
                .HasColumnName("req_id");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasColumnName("status");
            entity.Property(e => e.Summary)
                .HasColumnType("text")
                .HasColumnName("summary");
            entity.Property(e => e.VendorId)
                .HasColumnType("int(11)")
                .HasColumnName("vendor_id");

            entity.HasOne(d => d.Req).WithMany(p => p.ProposalsTables)
                .HasForeignKey(d => d.ReqId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("proposals_table_ibfk_1");

            entity.HasOne(d => d.Vendor).WithMany(p => p.ProposalsTables)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("proposals_table_ibfk_2");
        });

        modelBuilder.Entity<RequirementTable>(entity =>
        {
            entity.HasKey(e => e.ReqId).HasName("PRIMARY");

            entity.ToTable("requirement_table");

            entity.Property(e => e.ReqId)
                .HasColumnType("int(11)")
                .HasColumnName("req_id");
            entity.Property(e => e.Budget)
                .HasPrecision(10, 2)
                .HasColumnName("budget");
            entity.Property(e => e.ClientId)
                .HasColumnType("int(11)")
                .HasColumnName("client_id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");

            entity.HasOne(d => d.Client).WithMany(p => p.RequirementTables)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("requirement_table_ibfk_1");
        });

        modelBuilder.Entity<RequirementskillTable>(entity =>
        {
            entity.HasKey(e => e.ReqskillId).HasName("PRIMARY");

            entity.ToTable("requirementskill_table");

            entity.Property(e => e.ReqskillId)
                .HasColumnType("int(11)")
                .HasColumnName("reqskill_id");
            entity.Property(e => e.ReqId)
                .HasColumnType("int(11)")
                .HasColumnName("req_id");
            entity.Property(e => e.SkillId)
                .HasColumnType("int(11)")
                .HasColumnName("skill_id");

            entity.HasOne(d => d.Req).WithMany(p => p.RequirementskillTables)
                .HasForeignKey(d => d.ReqId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("requirementskill_table_ibfk_1");

            entity.HasOne(d => d.Skill).WithMany(p => p.RequirementskillTables)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("requirementskill_table_ibfk_2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.RoleId)
                .HasColumnType("int(11)")
                .HasColumnName("role_id");
            entity.Property(e => e.Rname)
                .HasMaxLength(100)
                .HasColumnName("rname");
        });

        modelBuilder.Entity<SkillTable>(entity =>
        {
            entity.HasKey(e => e.SkillId).HasName("PRIMARY");

            entity.ToTable("skill_table");

            entity.Property(e => e.SkillId)
                .HasColumnType("int(11)")
                .HasColumnName("skill_id");
            entity.Property(e => e.SkillDescription)
                .HasColumnType("text")
                .HasColumnName("skill_description");
            entity.Property(e => e.SkillName)
                .HasMaxLength(100)
                .HasColumnName("skill_name");
        });

        modelBuilder.Entity<TaskTable>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PRIMARY");

            entity.ToTable("task_table");

            entity.Property(e => e.TaskId)
                .HasColumnType("int(11)")
                .HasColumnName("task_id");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.ProposalId)
                .HasColumnType("int(11)")
                .HasColumnName("proposal_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.TaskDescription)
                .HasColumnType("text")
                .HasColumnName("task_description");
            entity.Property(e => e.TaskName)
                .HasMaxLength(100)
                .HasColumnName("task_name");

            entity.HasOne(d => d.Proposal).WithMany(p => p.TaskTables)
                .HasForeignKey(d => d.ProposalId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("task_table_ibfk_1");
        });

        modelBuilder.Entity<UserTable>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("user_table");

            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");
            entity.Property(e => e.Contact)
                .HasMaxLength(15)
                .HasColumnName("contact");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.RoleId)
                .HasColumnType("int(11)")
                .HasColumnName("role_id");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'active'")
                .HasColumnType("enum('active','inactive')")
                .HasColumnName("status");
            entity.Property(e => e.UserName)
                .HasMaxLength(100)
                .HasColumnName("user_name");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(255)
                .HasColumnName("user_password");

            entity.HasOne(d => d.Role).WithMany(p => p.UserTables)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("user_table_ibfk_1");
        });

        modelBuilder.Entity<VendorTable>(entity =>
        {
            entity.HasKey(e => e.VendorId).HasName("PRIMARY");

            entity.ToTable("vendor_table");

            entity.Property(e => e.VendorId)
                .HasColumnType("int(11)")
                .HasColumnName("vendor_id");
            entity.Property(e => e.Experience)
                .HasDefaultValueSql("'0'")
                .HasColumnType("int(11)")
                .HasColumnName("experience");
            entity.Property(e => e.Rating)
                .HasPrecision(2, 1)
                .HasColumnName("rating");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.VendorTables)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vendor_table_ibfk_1");
        });

        modelBuilder.Entity<VendorfeedbackTable>(entity =>
        {
            entity.HasKey(e => e.VenfeedId).HasName("PRIMARY");

            entity.ToTable("vendorfeedback_table");

            entity.Property(e => e.VenfeedId)
                .HasColumnType("int(11)")
                .HasColumnName("venfeed_id");
            entity.Property(e => e.ClientId)
                .HasColumnType("int(11)")
                .HasColumnName("client_id");
            entity.Property(e => e.Rating)
                .HasPrecision(2, 1)
                .HasColumnName("rating");
            entity.Property(e => e.VendorId)
                .HasColumnType("int(11)")
                .HasColumnName("vendor_id");

            entity.HasOne(d => d.Client).WithMany(p => p.VendorfeedbackTables)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vendorfeedback_table_ibfk_2");

            entity.HasOne(d => d.Vendor).WithMany(p => p.VendorfeedbackTables)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vendorfeedback_table_ibfk_1");
        });

        modelBuilder.Entity<VendorskillsTable>(entity =>
        {
            entity.HasKey(e => e.VenskillId).HasName("PRIMARY");

            entity.ToTable("vendorskills_table");

            entity.Property(e => e.VenskillId)
                .HasColumnType("int(11)")
                .HasColumnName("venskill_id");
            entity.Property(e => e.SkillId)
                .HasColumnType("int(11)")
                .HasColumnName("skill_id");
            entity.Property(e => e.VendorId)
                .HasColumnType("int(11)")
                .HasColumnName("vendor_id");

            entity.HasOne(d => d.Skill).WithMany(p => p.VendorskillsTables)
                .HasForeignKey(d => d.SkillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vendorskills_table_ibfk_2");

            entity.HasOne(d => d.Vendor).WithMany(p => p.VendorskillsTables)
                .HasForeignKey(d => d.VendorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("vendorskills_table_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
