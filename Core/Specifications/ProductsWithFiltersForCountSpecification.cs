using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams request)
         : base(q =>
            (string.IsNullOrEmpty(request.Search) || q.Name.ToLower().Contains(request.Search)) &&
            (!request.BrandId.HasValue || q.ProductBrandId == request.BrandId) &&
            (!request.TypeId.HasValue || q.ProductTypeId == request.TypeId))
        {
        }
    }
}