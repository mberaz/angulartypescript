using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class NoteController :ApiController
    {
        List<NoteModel> list = new List<NoteModel>
        {
            new NoteModel{ Id= 1, Text= "never buy Tnova milk", Color="green" },
            new NoteModel{ Id= 2, Text= "strawberries", Color="red" },
            new NoteModel{ Id= 3, Text= "deadpool is awsome", Color="blue" },
            new NoteModel{ Id= 4, Text= "alwways bet on balck", Color="blue" },

        };

        [HttpGet]
        public IEnumerable<NoteModel> Get ()
        {
            return list;
        }

        [HttpGet]
        public NoteModel Get (int id)
        {
            return list.FirstOrDefault(n => n.Id == id);
        }
    }

}
