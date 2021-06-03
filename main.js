// fetch with parameters
// http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}&appid={API key}

// http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=42d1cb60e4fb450df9dad52ce575c177


var apiKey = '42d1cb60e4fb450df9dad52ce575c177';
var cityName = $('#city')

$('#find').on('click', function(event) {
    event.preventDefault()
   fetch('http://api.openweathermap.org/data/2.5/weather?q=' + cityName.val() + '&appid=42d1cb60e4fb450df9dad52ce575c177')
   .then(data => data.json())
   .then(result => {

       let lat =  result.coord.lat; 
       let lon = result.coord.lon;
    fetch('https://api.openweathermap.org/data/2.5/onecall?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey)
    .then(data => data.json())
    .then(result => {
        $('#uvIndex').text(result.current.uvi)
        console.log(result);
    })
    
       $('#temp').text(result.main.temp) 
       $('#wind').text(result.wind.speed)
       $('#humidity').text(result.main.humidity)
   })
 fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName.val() + '&appid=' + apiKey)
 .then(data => data.json())
 .then(result => {
     console.log(result)
 })
})
