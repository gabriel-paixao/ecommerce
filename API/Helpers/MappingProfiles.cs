using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductResponseDto>()
                .ForMember(dto => dto.ProductBrand, p => p.MapFrom(m => m.ProductBrand.Name))
                .ForMember(dto => dto.ProductType, p => p.MapFrom(m => m.ProductType.Name))
                .ForMember(dto => dto.PictureUrl, p => p.MapFrom<ProductUrlResolver>());
        }
    }
}