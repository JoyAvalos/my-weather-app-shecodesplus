function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[today.getDay()]; //day of the week
  let time = today.getHours();
  let minutes = today.getMinutes();
  let month = months[today.getMonth()];
  let number = today.getDate(); //day number
  if (time < 10) {
    time = "0" + time;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let currentDate = `${day} ${month} ${number}, ${time}:${minutes}`;
  return currentDate;
}
function searchCity(city) {
  let apiKey = "9c292bb799d0e08eb6951e986e805425";
  let unit = "metric";
  let apiUrlmain = "https://api.openweathermap.org/data/2.5/weather?";
  // let currentCity = document.querySelector("#city-input");
  // let searchCity = currentCity.value;
  let apiUrl = `${apiUrlmain}q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
// Function used to show the data: temperature, city, weather details, humididy, wind
function showTemperature(response) {
  console.log(response);
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-details").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#city-humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#city-wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed * 3.6
  )}km/h`;
}
// Function used for Current button
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
// Function used for Current button
function retrievePosition(position) {
  //let latitude = position.coords.latitude;
  //let longitude = position.coords.longitude;
  let apiKey = "9c292bb799d0e08eb6951e986e805425";
  let unit = "metric";
  let apiUrlmain = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiUrlmain}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//Form search
let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);
//Day information
let today = new Date();
let weekDay = document.querySelector("#day-of-the-week");
weekDay.innerHTML = formatDate(today);
//Current button
let buttonCurrent = document.querySelector("#btn-current");
buttonCurrent.addEventListener("click", getPosition);
searchCity("Chicago");
