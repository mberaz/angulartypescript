using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class TodoController : ApiController
    {
        List<ListItem> list = new List<ListItem>
        {
            new ListItem{ Id= 1, Name= "Buy milk", IsDone=false },
            new ListItem{ Id= 2, Name= "Buy shoes", IsDone=true  },
            new ListItem{ Id= 3, Name= "Throw away trash" , IsDone=false },
            new ListItem{ Id= 4, Name= "Play fallout 4", IsDone=false  },
            new ListItem{ Id= 5, Name= "play fm" , IsDone=true },
            new ListItem{ Id= 6, Name= "chill", IsDone=false  },

        };

        [HttpGet]
        public IEnumerable<ListItem> Get ()
        {
            return list;
        }

        // GET api/values/5
        [HttpGet]
        public ListItem Get ( int id )
        {
            return list.FirstOrDefault(l => l.Id == id);
        }

        [HttpPost]
        public ReturnModel Post ( ListItem item )
        {
            return new ReturnModel { Status = true, Id = list.Count };
        }

        [HttpPut]
        public ReturnModel Put ( ListItem item )
        {
            var listItem = list.FirstOrDefault(l => l.Id == item.Id);
            return new ReturnModel { Status = true, Id = list.Count };
        }

    }
}
