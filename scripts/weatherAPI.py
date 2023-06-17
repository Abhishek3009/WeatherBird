import sys,json
import requests

citydata = sys.stdin.readlines()
city = json.loads(citydata[0])
city = city[0]

url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=YOUR_API_KEY&units=metric'.format(city)
res = requests.get(url)

data = res.json()

cityNotFound = False

try:
    trytemp = data['main']['temp']
except:
    cityNotFound = True

if(cityNotFound == False):
    temp = data['main']['temp']
    wind_speed = data['wind']['speed']
    latitude = data['coord']['lat']
    longitude = data['coord']['lon']
    description = data['weather'][0]['description']
    displayDat = {
        'City'       :city,
        'Temperature':temp,
        'WindSpeed' :wind_speed,
        'Latitude'   :latitude,
        'Longitude'  :longitude,
        'Description':description,
}
else:
    displayDat = {
        'City'       :'error'
    }

scriptOut = json.dumps(displayDat)

print(scriptOut)

sys.stdout.flush()