namespace DreamSicle.Db.Seeding;

public static class UsCitySeed
{
  private static readonly IReadOnlyDictionary<string, string[]> CitiesByStateCode = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
  {
    ["AL"] = ["Birmingham", "Montgomery", "Mobile"],
    ["AK"] = ["Anchorage", "Fairbanks", "Juneau"],
    ["AZ"] = ["Phoenix", "Tucson", "Mesa"],
    ["AR"] = ["Little Rock", "Fayetteville", "Fort Smith"],
    ["CA"] = ["Los Angeles", "San Diego", "San Jose"],
    ["CO"] = ["Denver", "Colorado Springs", "Aurora"],
    ["CT"] = ["Bridgeport", "New Haven", "Hartford"],
    ["DE"] = ["Wilmington", "Dover", "Newark"],
    ["FL"] = ["Jacksonville", "Miami", "St. Augustine"],
    ["GA"] = ["Atlanta", "Savannah", "Augusta"],
    ["HI"] = ["Honolulu", "Hilo", "Kailua"],
    ["ID"] = ["Boise", "Meridian", "Nampa"],
    ["IL"] = ["Chicago", "Aurora", "Naperville"],
    ["IN"] = ["Indianapolis", "Fort Wayne", "Evansville"],
    ["IA"] = ["Des Moines", "Cedar Rapids", "Davenport"],
    ["KS"] = ["Wichita", "Overland Park", "Kansas City"],
    ["KY"] = ["Louisville", "Lexington", "Bowling Green"],
    ["LA"] = ["New Orleans", "Baton Rouge", "Shreveport"],
    ["ME"] = ["Portland", "Lewiston", "Bangor"],
    ["MD"] = ["Baltimore", "Frederick", "Rockville"],
    ["MA"] = ["Boston", "Worcester", "Springfield"],
    ["MI"] = ["Detroit", "Grand Rapids", "Warren"],
    ["MN"] = ["Minneapolis", "Saint Paul", "Rochester"],
    ["MS"] = ["Jackson", "Gulfport", "Southaven"],
    ["MO"] = ["Kansas City", "Saint Louis", "Springfield"],
    ["MT"] = ["Billings", "Missoula", "Great Falls"],
    ["NE"] = ["Omaha", "Lincoln", "Bellevue"],
    ["NV"] = ["Las Vegas", "Henderson", "Reno"],
    ["NH"] = ["Manchester", "Nashua", "Concord"],
    ["NJ"] = ["Newark", "Jersey City", "Paterson"],
    ["NM"] = ["Albuquerque", "Las Cruces", "Santa Fe"],
    ["NY"] = ["New York", "Buffalo", "Rochester"],
    ["NC"] = ["Charlotte", "Raleigh", "Greensboro"],
    ["ND"] = ["Fargo", "Bismarck", "Grand Forks"],
    ["OH"] = ["Columbus", "Cleveland", "Cincinnati"],
    ["OK"] = ["Oklahoma City", "Tulsa", "Norman"],
    ["OR"] = ["Portland", "Eugene", "Salem"],
    ["PA"] = ["Philadelphia", "Pittsburgh", "Allentown"],
    ["RI"] = ["Providence", "Warwick", "Cranston"],
    ["SC"] = ["Charleston", "Columbia", "North Charleston"],
    ["SD"] = ["Sioux Falls", "Rapid City", "Aberdeen"],
    ["TN"] = ["Nashville", "Memphis", "Knoxville"],
    ["TX"] = ["Houston", "Dallas", "Austin"],
    ["UT"] = ["Salt Lake City", "West Valley City", "Provo"],
    ["VT"] = ["Burlington", "South Burlington", "Rutland"],
    ["VA"] = ["Virginia Beach", "Norfolk", "Richmond"],
    ["WA"] = ["Seattle", "Spokane", "Tacoma"],
    ["WV"] = ["Charleston", "Huntington", "Morgantown"],
    ["WI"] = ["Milwaukee", "Madison", "Green Bay"],
    ["WY"] = ["Cheyenne", "Casper", "Laramie"]
  };

  public static string GetRandomCity(Faker faker, string stateCode)
  {
    if (CitiesByStateCode.TryGetValue(stateCode, out var cities) && cities.Length > 0)
    {
      return faker.PickRandom(cities);
    }

    return faker.Address.City();
  }
}
