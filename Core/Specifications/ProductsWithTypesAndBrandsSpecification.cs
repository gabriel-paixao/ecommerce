using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams request)
        : base(q =>
            (string.IsNullOrEmpty(request.Search) || q.Name.ToLower().Contains(request.Search)) &&
            (!request.BrandId.HasValue || q.ProductBrandId == request.BrandId) &&
            (!request.TypeId.HasValue || q.ProductTypeId == request.TypeId))
        {
            AddInclude(q => q.ProductBrand);
            AddInclude(q => q.ProductType);
            AddOrderBy(q => q.Name);
            ApplyPaging(request.PageSize * (request.PageIndex - 1), request.PageSize);

            if (!string.IsNullOrEmpty(request.Sort))
            {
                switch (request.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(q => q.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(q => q.Id == id)
        {
            AddInclude(q => q.ProductBrand);
            AddInclude(q => q.ProductType);
        }
    }
}