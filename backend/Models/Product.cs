using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    [Table("Products")]
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        // Inventory
        public string SKU { get; set; } = string.Empty;
        public int StockQuantity { get; set; }
        public int ReorderPoint { get; set; }
        public string? ReorderStatus { get; set; }

        // Details
        public string Brand { get; set; }
        public string Manufacturer { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public string Origin { get; set; }
        public string Tags { get; set; }

        // Specifications
        public decimal WeightInKg { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public string Materials { get; set; }
        public string TechnicalSpecs { get; set; }

        public void UpdateStockStatus()
        {
            ReorderStatus = StockQuantity > 0 ? "Stock Adequate" : "Out of Stock";
        }
    }
}
