import sys,json
import requests
import urllib.request

def connect():
    try:
        urllib.request.urlopen('http://google.com') #Python 3.x
        return True
    except:
        return False

noNetwork = 0
res = ''
data = {}
cityNotFound = False

citydata = sys.stdin.readlines()
city = json.loads(citydata[0])
city = city[0]
city = city.capitalize()

url = 'http://api.openweathermap.org/data/2.5/weather?q={}&appid=YOUR_API_KEY&units=metric'.format(city)

if(connect()):
    res = requests.get(url)
    data = res.json()
    try:
        trytemp = data['main']['temp']
    except:
        cityNotFound = True
else:
    noNetwork = 1

if(cityNotFound == True):
    displayDat = {
        'City'       :'error'
    }
elif(noNetwork == 1):
    displayDat = {
        'City'       :'Request Error. Please Check Connection'
    }
else:
    temp = data['main']['temp']
    temp_min = data['main']['temp_min']
    temp_max = data['main']['temp_max']
    humidity = data['main']['humidity']
    wind_speed = data['wind']['speed']
    latitude = data['coord']['lat']
    longitude = data['coord']['lon']
    description = data['weather'][0]['description']
    icon = data['weather'][0]['icon']
    displayDat = {
        'City'       :city,
        'Temperature':temp,
        'TemperatureMin':temp_min,
        'TemperatureMax':temp_max,
        'Humidity'  :humidity,
        'WindSpeed' :wind_speed,
        'Latitude'   :latitude,
        'Longitude'  :longitude,
        'Description':description,
        'Icon': icon,
    }    

scriptOut = json.dumps(displayDat)

print(scriptOut)

sys.stdout.flush()