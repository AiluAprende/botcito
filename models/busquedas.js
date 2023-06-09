const axios = require('axios');

class Busquedas {
   historial = ['Buenos Aires', 'Madrid']

   constructor() {
      //TODO: leer DB si existe
   }

   getParams() {
      return {
         'access_token': process.env.MAP_TOKEN,
         'limit': 5,
         'language': 'es'
      }
   }

   async lugar(lugar) {

      try {
         const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.getParams()
         })
         const resp = await instance.get()

         return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lat: lugar.geometry.coordinates[0],
            lon: lugar.geometry.coordinates[1],
         }))

      } catch (error) {
         console.log(error);
         return []
      }

   }


   async climaLugar(lat, lon) {
      try {
         const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_TOKEN}`,
         })
         const resp = await instance.get()
         console.log(resp.data);
         return (resp.data)

      } catch (error) {
         console.log(error)
      }
   }
}

module.exports = Busquedas