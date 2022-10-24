// All the resources of APIs
const geoURL = "http://api.geonames.org/searchJSON?q=";
const GEO_API_KEY = "jairajpuri";
let weatherbitURL = " http://api.weatherbit.io/v2.0/forecast/daily?";
const WEATHERBIT_API_KEY = "4ae7bed22a074c1b86986cee2484d2bc";

const pixa_URL = "https://pixabay.com/api/?key=";
const PIXA_API_KEY = "29924781-a1dda297e68a17dd8e7fbf1d3";

//Event Listener to trigger handleSubmit on Click//
if (typeof document !== "undefined") {
  document.getElementById('submit').addEventListener('click', handleSubmit);;
}
//document.getElementById('submit').addEventListener('click', handleSubmit);
// Function trigger by event listener //

// Reference: udacity project 4 news nlp//
async function handleSubmit(e) {
  e.preventDefault();
  const destination = document.getElementById("city").value;
  const startDate = document.getElementById("startDate").valueAsDate;
  const endDate = document.getElementById("endDate").valueAsDate;
  const timeLeft = calcTimeLeft(startDate);
  const tripLength = calcTripLength(startDate, endDate);

  const geoUrlData = await getGeonamesUrl(geoURL, GEO_API_KEY, destination);
  const weatherUrlData = await getWeatherUrl(
    weatherbitURL,
    WEATHERBIT_API_KEY,
    geoUrlData.geonames[0].lat,
    geoUrlData.geonames[0].lng
  );
  const pixaUrlData = await getPixaUrl(pixa_URL, PIXA_API_KEY, destination);

  
  await postData('http://localhost:8081/postData', {
    cityRes: destination,
    startDate: startDate,
    endDate: endDate,
    weatherData: weatherUrlData,
    time: timeLeft,
    tripLength: tripLength,
    image: pixaUrlData,
  })
    updateUI(pixaUrlData.hits[0].webformatURL);
 
   
};

/* Function to GET Geonames API data*/
const getGeonamesUrl = async (geoURL, GEO_API_KEY, destination) => {
  
  const res = await fetch(
    `${geoURL}${destination}&maxRows=1&username=${GEO_API_KEY}`
  );

  try {
    const data = await res.json();
    console.log(data);
    return data;
  
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Weatherbit API data*/
const getWeatherUrl = async (weatherbitURL, WEATHERBIT_API_KEY, lat, lng) => {
  
  const res = await fetch(
    weatherbitURL + "lat=" + lat + "&lon=" + lng + "&key=" + WEATHERBIT_API_KEY
  );
  
  try {
    const data = await res.json();
    console.log(data);
    return data;
    //  error handling
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Pixabay API data*/
const getPixaUrl = async (pixa_URL, PIXA_API_KEY, destination) => {
  const res = await fetch(
    pixa_URL + PIXA_API_KEY + "&q=" + destination + " city&image_type=photo"
  );

  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
//reference https://stackoverflow.com/questions
/*Function to add a countdown to trip start*/
function calcTimeLeft(startDate) {
  var deadline = new Date(startDate).getTime();
  var now = new Date().getTime();
  var diff = deadline - now;
  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  let time = ` ${days} days-${hours}hrs-${minutes}minutes`;

  return time;
}
//reference https://stackoverflow.com/questions/15493521/how-do-i-calculate-a-duration-time
/*Function to determine length of trip*/
function calcTripLength(startDate, endDate) {
  const tripLength = startDate.getTime() - endDate.getTime();
  const tripLengthDays = tripLength / (1000 * 3600 * 24);
  return tripLengthDays;
}

/* Function to POST data */
const postData = async (url='' , data={}) => {
  console.log( data);
  const res = await fetch (url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      //Body data type must match Content-Type
      body: JSON.stringify(data),
  });
  try {
      const newData = await res.json();
      console.log(newData);
      return newData;
  }catch (error) {
      console.log('error', error);
  }
};



/* Function to update UI */
const updateUI = async (webformatURL) => {
  const req = await fetch("http://localhost:8081/getData");
  try {
    const allData = await req.json();
    const result = document.querySelector(".result");
    result.innerHTML = `
            <div class="info">
            <h2 class="place">City:<span class="bold">${allData.cityRes}</span></h2>
            <img src="https://www.weatherbit.io/static/img/icons/${allData.weatherData.data[0].weather.icon}.png " >
            <h5 class="time-left"> Your Trip Start in <span class="bold"> ${allData.time}</span>. </h5>
            <p class="trip">Your Trip length is <span class="bold"> ${allData.tripLength}</span> days</p>
            <h6> Temprature of ${allData.cityRes} is: <span class="bold">${allData.weatherData.data[0].temp}</span>&#176;</h6>
            </div>
            <div class="pic"><img src =${webformatURL} alt= ${allData.cityRes}></div> `;

    //refrenece youtube Channel 'codewithHarry'//
    for(let i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(allData.weatherData.data[i].low_temp).toFixed(1)+ "°";
     
      
  }
  
  for(let i = 0; i<5; i++){
     document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(allData.weatherData.data[i].high_temp).toFixed(2) + "°";
  }
  
  //Getting Weather Icons
   for(let i = 0; i<5; i++){
      document.getElementById("img" + (i+1)).src =  'https://www.weatherbit.io/static/img/icons/' +
      allData.weatherData.data[0].weather.icon +
      '.png';
    
  }
  
  //Getting and displaying the text for the upcoming  days of //
  
      for(let i = 0; i<5; i++){
          document.getElementById("day" + (i+1)).innerHTML =allData.weatherData.data[i].datetime ;
  
      }
      }catch (error) {
          console.log('error', error);
      }
     
  };
  
export{
  handleSubmit
}