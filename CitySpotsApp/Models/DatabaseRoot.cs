using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitySpotsApp.Models;

public class DatabaseRoot
{
    public List<Country> countries { get; set; } = new();
    public List<Category> categories { get; set; } = new();
    public List<Spot> spots { get; set; } = new();
}
