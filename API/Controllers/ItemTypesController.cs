
using API.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace API.Controllers
{
    public class ItemTypesController : ApiController
    {
        List<ItemType> list = new List<ItemType>
        {
            new ItemType{ Id= 1, Name= "Buy"  },
            new ItemType{ Id= 2, Name= "Games"   },
            new ItemType{ Id= 3, Name= "Actions"  },
            new ItemType{ Id= 4, Name= "Misc"  },

        };

        [HttpGet]
        public IEnumerable<ItemType> Get ()
        {
            return list;
        }
    }
}
