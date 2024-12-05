let search = document.querySelector("#search");
// let rowData = document.querySelector("#row-data");


search.addEventListener("input", async () => {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9f31fc214cc744d397d15545240312&q=${search.value}&days=3`
  );
  let data = await res.json();
  // console.log(data);
  // console.log(data.forecast.forecastday[0].day.maxtemp_c);
  display(search.value, data.forecast.forecastday);
});

window.addEventListener("load", async () => {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9f31fc214cc744d397d15545240312&q=Cairo&days=3`
  );
  let data = await res.json();

  // Display the data
  display("Cairo", data.forecast.forecastday);
});

function display(city = "cairo", array = []) {
  let date = new Date(array[0].date);

  let weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  let day = date.getDate();
  let month = date.toLocaleDateString("en-US", { month: "long" });
  let year = date.getFullYear();
  console.log(date);

  let cart = `
    <div class="col-md-4">
        <div class="card text-white">
          <div class="card-header">
            <div class="d-flex justify-content-between">
              <p>${weekday}</p>
              <p>${day} ${month} ${year}</p>
            </div>
          </div>
          <div class="card-body px-5">
            <p class="fs-2">${city}</p>
            <p id="temp" class="temp fw-bolder ">${array[0].day.maxtemp_c}<sup>o</sup>C</p>
            <span><img src="https:${array[0].day.condition.icon}" alt=""></span>
            <p class="text-info">${array[0].day.condition.text}</p>
            <div class="d-flex justify-content-between">
              <p><i class="fa-solid fa-umbrella"></i> 20% </p>
              <p><i class="fa-solid fa-wind"></i> 20km/h</p>
              <p><i class="fa-solid fa-droplet"></i> 20%</p>
            </div>
          </div>
        </div>
      </div>
   `;

  for (let i = 1; i < 3; i++) {
    let date = new Date(array[i].date);
    let weekday2 = date.toLocaleDateString("en-US", { weekday: "long" });
    if (i == 1) {
      cart += `
        <div class="col-md-4 ">
           <div class="card text-white">
             <div class="card-header center-header d-flex justify-content-center">
               
                 <p>${weekday2}</p>
               
             </div>
             <div class="card-body center-body px-5 d-flex flex-column align-items-center justify-content-center">
               <span><img src="https:${array[i].day.condition.icon}" alt=""></span>
               <p id="temp" class=" fs-1 fw-bolder ">${array[i].day.maxtemp_c}<sup>o</sup>C</p>
               <p id="temp" class=" fs-4  ">${array[i].day.mintemp_c}<sup>o</sup></p>
               <p class="text-info">${array[i].day.condition.text}</p>
             </div>
           </div>
         </div>
        `;
    } else {
      cart += `
        <div class="col-md-4 ">
        <div class="card text-white">
          <div class="card-header d-flex justify-content-center">
            
              <p>${weekday2}</p>
            
          </div>
          <div class="card-body px-5 d-flex flex-column align-items-center justify-content-center">
            <span><img src="https:${array[i].day.condition.icon}" alt=""></span>
            <p id="temp" class=" fs-1 fw-bolder ">${array[i].day.maxtemp_c}<sup>o</sup>C</p>
            <p id="temp" class=" fs-4  ">${array[i].day.mintemp_c}<sup>o</sup></p>
            <p class="text-info">${array[i].day.condition.text}</p>
          </div>
        </div>
      </div>
        `;
    }
  }

  document.getElementById("row-data").innerHTML = cart;
}
