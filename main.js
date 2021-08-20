// fetch with parameters
// http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={API key}

// http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=42d1cb60e4fb450df9dad52ce575c177




var apiKey = '42d1cb60e4fb450df9dad52ce575c177';
var cityName = $('#city')
var past = $('#past-list')

if(!localStorage.getItem('pastCity')) {

    localStorage.setItem('pastCity', JSON.stringify([]));
    console.log('This worked')
}


$('#find').on('click', function(event) {

    event.preventDefault()

var pastSearch = localStorage.getItem('pastCity');
var array = JSON.parse(pastSearch)
console.log(typeof array, cityName.val())
array.push(cityName.val());
localStorage.setItem('pastCity', JSON.stringify(array))
for(let i = 0; i < array.length; i++) {
    var listItem = document.createElement('li');
    listItem.setAttribute('class', 'list-group-item');
    listItem.textContent = array[i];
    past.prepend(listItem) 
    // listItem.prepend(past)

}


    // Clear previous values for new search
    $('#current-container').empty()
    $('#forecastCards').empty()

   fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName.val() + '&units=imperial' + '&appid=42d1cb60e4fb450df9dad52ce575c177')
   .then(data => data.json())
   .then(result => {


       
       var currentInfo = $('#current-container')
       var item = document.createElement('div')
       item.setAttribute('class', 'row')

       var city = document.createElement('div')
       city.setAttribute('id', 'city-name')
       city.setAttribute('class', 'col-12')
       var cityEl = result.name 
       city.textContent = `Current Weather for ${cityEl}`
        item.appendChild(city)

       
        
        // var curIconUrl = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
        // var curIcon = document.createElement('img')
        // curIcon.setAttribute('src', curIconUrl)
        // curIcon.setAttribute('class', 'col-1')
        // item.appendChild(curIcon)

        var curTemp = document.createElement('div')
        curTemp.setAttribute('id', 'current-items')
        curTemp.setAttribute('class', 'col-3')
        var curTempEl = result.main.temp
        curTemp.textContent = `${curTempEl}°F `
       
        item.appendChild(curTemp)

        var curWind = document.createElement('div')
        curWind.setAttribute('id', 'curret-items')
        curWind.setAttribute('class', 'col-3')
        var curWindEl = result.wind.speed
        curWind.textContent = `${curWindEl} mph`
        item.appendChild(curWind)

        var curHumid = document.createElement('div')
        curHumid.setAttribute('id', 'current-items')
        curHumid.setAttribute('class', 'col-3')
        var curHumidEl = result.main.humidity
        curHumid.textContent = `${curHumidEl}%`
        item.appendChild(curHumid)

        
        let lat =  result.coord.lat; 
        let lon = result.coord.lon;
        
        fetch('https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
        .then(data => data.json())
        .then(result => {

            var UV = document.createElement('div')
            UV.setAttribute('id', 'current-items')
            UV.setAttribute('class', 'col-3')
            var UVel = result.current.uvi
            UV.textContent = `${UVel} UV Index`
            item.appendChild(UV)

            currentInfo.append(item)
        })
    
   })
//    5 Day Forecast
// $('#forecast-container').empty()

 fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName.val() + '&units=imperial' + '&appid=' + apiKey)
 .then(data => data.json())
 .then(result =>  {
     console.log(result, result.list[0].weather[0].icon);
     
     for(i=0; i < 5; i++) {
         var card = $('#forecastCards')
         var col = document.createElement('div')
         col.setAttribute('class', 'col-2')

         // Date 
         var date = document.createElement('div')
         var dateEl = result.list[i].dt_txt
         var convertedDate = moment(dateEl, 'YYYY-MM-DD hh:mm:ss')
         var formatedDate = convertedDate.format('MMMM DD YYYY')
         date.textContent = `${formatedDate}`
         col.appendChild(date)
         
         //  Icon 
        var iconUrl = "http://openweathermap.org/img/w/" + result.list[i].weather[0].icon + ".png";
        var icon = document.createElement('img')
        icon.setAttribute('src', iconUrl)
        col.appendChild(icon);

        // Temperature
        var temperature = document.createElement('div')
        // temperature.setAttribute('id', 'temp')
        var tempEl = result.list[i].main.temp
        temperature.textContent = `${tempEl} °F`
        col.appendChild(temperature);

        // Wind Speed
        var wind = document.createElement('div')
        var windEl = result.list[i].wind.speed
        wind.textContent = `${windEl} mph`
        col.appendChild(wind);

        // Humidity 
        var humidity = document.createElement('div')
        var humidityEl = result.list[i].main.humidity
        humidity.textContent = `${humidityEl}%`
        col.appendChild(humidity)

        card.append(col);
       
    }
    
})



})