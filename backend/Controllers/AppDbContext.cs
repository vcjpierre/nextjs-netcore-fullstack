using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Controllers
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración del modelo
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Id)
                    .UseIdentityColumn()
                    .IsRequired();

                // Configuración de SKU con valor por defecto
                entity.Property(p => p.SKU)
                    .HasDefaultValueSql("CONCAT('SKU', LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0'))")
                    .IsRequired();

                // Configuración de campos requeridos usando Fluent API
                entity.Property(p => p.Name).IsRequired();
                entity.Property(p => p.Description).IsRequired();
                entity.Property(p => p.Price)
                    .IsRequired()
                    .HasColumnType("decimal(18,2)");

                // Configuración de propiedades calculadas
                entity.Property(p => p.ReorderStatus)
                    .HasComputedColumnSql(
                        sql: "CASE WHEN \"StockQuantity\" > 0 THEN 'Stock Adequate' ELSE 'Out of Stock' END",
                        stored: true
                    )
                    .IsRequired(false);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}