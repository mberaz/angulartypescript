using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using vNextApi.Models;
using Microsoft.AspNet.Cors.Core;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace vNextApi.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Hero> Get ()
        {
            var list = new List<Hero>
            {
                 new Hero  { id= 11, name= "Mr. Nice" },
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
            return list;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
