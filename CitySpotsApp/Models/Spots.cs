using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CitySpotsApp.Models;

public class Spot
{
    public string? id { get; set; }
    public string? name { get; set; }
    public int categoryId { get; set; }
    public int countryId { get; set; }
    public string? city { get; set; }
    public double rating { get; set; }
    public double lat { get; set; }
    public double lng { get; set; }
}
