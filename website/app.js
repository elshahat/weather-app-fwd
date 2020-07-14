// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const apiKey = '&appid=3d01e76b335a8f75fd18a0ee7dd1b25d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', submitData);

/* Function called by event listener */
function submitData(e) {
   e.preventDefault();

   document.getElementById('data-box').classList.add('d-none');

   // Get user input values
   const newZip = document.getElementById('zip').value;
   const content = document.getElementById('feelings').value;

   getWeather(baseURL, newZip, apiKey)
       .then(data => {
          // Add returned data to a new POST request
          postData('/add', { date: newDate, temp: data.main.temp, content })
       }).then(data => {
      // Update the browser content with the returned data
      updateUI();
   });
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
   const res = await fetch(baseURL + newZip + apiKey);

   try {
      return await res.json();
   } catch (error) {
      console.log("error", error);
   }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
   const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   })

   try {
      return await req.json();
   } catch (error) {
      console.log("Error", error);
   }
};

/* Function to GET Project Data */
const updateUI = async () => {
   const request = await fetch('/all');

   try {
      const allData = await request.json();

      // Update the UI with the new entry values
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;

      document.getElementById('data-box').classList.remove('d-none');
   } catch (error) {
      console.log("Error:", error);
   }
};
