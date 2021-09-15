async function getFiveDayForecast(city, country, state = '') {
// state set to null by default.
  const forecastURI = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  const forecastResponse = await fetch(forecastURI);
  const forecast = await forecastResponse.json();

  // extract relevant data from json response and map on an array for future manipulation
  // 273 subtracted from all temparature values to get celsius
  // precipitation probability multiplied by 100 to get percentage
  // date-time returned as 1 string by api so split up for convenience
  const filtered = forecast.list.map((data) => ({
    temparature: data.main.temp.toFixed(0) - 273,
    feelsLike: data.main.feels_like.toFixed(0) - 273,
    humidity: data.main.humidity,
    precipitation: data.pop * 100,
    conditions: data.weather[0].description,
    date: data.dt_txt.split(' ')[0],
    time: data.dt_txt.split(' ')[1],
  }));

  console.log(filtered);
  return filtered;
}

async function getCurrentWeather(city, country, state = '') {
  // state set to null by default.
  const forecastURI = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  const weatherResponse = await fetch(forecastURI);
  const weather = await weatherResponse.json();

  // 273 subtracted from all temparature values to get celsius
  // wind * 3.6 to convert from m/s to km/h
  const filtered = {
    current: weather.main.temp.toFixed(0) - 273,
    feelsLike: weather.main.feels_like.toFixed(0) - 273,
    dailyMin: weather.main.temp_min.toFixed(0) - 273,
    dailyMax: weather.main.temp_max.toFixed(0) - 273,
    humidity: weather.main.humidity,
    wind: Number((weather.wind.gust * 3.6).toFixed(1)),
    pressure: weather.main.pressure,
    cloudCover: weather.clouds.all,
  };

  console.log(filtered);
  return filtered;
}

export default getFiveDayForecast;