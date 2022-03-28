const API_KEY = "aab75fa92769795243baf3f1bd0a6174";
 
const fetchData = position =>  {
   const { latitude, longitude } = position.coords;
   fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${API_KEY}`)
       .then(response => response.json())
      .then(data => setWeatherData(data))
}
const setWeatherData = data => {
  console.log(data);
  const weatherData = {
      location: data.name,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      temperature: Math.round(data.main.temp) + " °C",
      date: getDate(),
  }
 
 
  Object.keys(weatherData).forEach( key => {
      document.getElementById(key).textContent = weatherData[key];
  });
 
  clenUp();
 
}
 
const clenUp = () => {
   let container = document.getElementById('container');
   let loader = document.getElementById('loader');
 
   loader.style.display = 'none';
   container.style.display = 'flex';
}
const getDate = () => {
   let date = new Date();
   return `${date.getDate()}-${ ( '0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
}
