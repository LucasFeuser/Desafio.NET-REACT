using AutoMapper;
using PraticaNetCore.ViewModel;
using System.Collections.Generic;
using System.Linq;

namespace PraticaNetCore.Mappers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Models.LogsLogin, LogsLoginDTO>();
        }  
    }
}
