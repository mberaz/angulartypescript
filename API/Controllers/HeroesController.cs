using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class HeroesController : ApiController
    {
        List<Hero> list = new List<Hero>
        {
            new Hero{ id= 11, name= "Mr. Nice" },
            new Hero{ id= 12, name= "Narco" },
            new Hero{ id= 13, name= "Bombasto" },
            new Hero{ id= 14, name= "Celeritas" },
            new Hero{ id= 15, name= "Magneta" },
            new Hero{ id= 16, name= "RubberMan" },
            new Hero{ id= 17, name= "Dynama" },
            new Hero{ id= 18, name= "Dr IQ" },
            new Hero{ id= 19, name= "Magma" },
            new Hero{ id= 20, name= "Tornado" }
        };

        [HttpGet]
        public IEnumerable<Hero> Get ()
        {
            return list;
        }

        // GET api/values/5
        [HttpGet]
        public Hero Get ( int id )
        {
            return list.FirstOrDefault(l => l.id == id);
        }
    }
}
