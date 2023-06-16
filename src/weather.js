const reqWeather = document.getElementById('reqWeather')

reqWeather.addEventListener("click", (event,arg)=>{
    let thisCity = document.getElementById("city").value;
    window.Bridge.sendCity(thisCity);    
});