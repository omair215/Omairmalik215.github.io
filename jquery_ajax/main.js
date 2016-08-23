/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data .
  for Washington DC (hint: http://api.openweathermap.org/data/2.5/weather?q=...).
- Print the temperature in console.
- Bonus 1: add a form prompting user for the city and state.
- Bonus 2: convert answer from kelvin to fahrenheit.

*/



  var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/city?";
  var location = "id=5549222";
  var APPID = "&APPID=c577c6a4cef81183b24528a3d63c3672"


function	getWeather(location){
		var	URL	=	weatherUrl+location+APPID;
  //http://api.openweathermap.org/data/2.5/weather?q=London&APPID+c577c6a4cef81183b24528a3d63c3672
		console.log(URL);
		$.ajax({
				url:URL,
				type:"GET",
				success:function(response){		//success	response	handling
						console.log(response);
				}
		});
}
$('#submit').click (function() {
  $('p').append("  "+ response.city.name + " " + response.list[0].main);
});


;

