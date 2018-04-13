import axios from 'axios'
import dummyResponse from './assets/dummy-img-label-response.json'

let apiKey = 'ASsdtD34sd23daWedas84f3aHe'
let serverRemote = 'http://54.158.57.162/nordic/image'
let serverLocal = 'http://0.0.0.0:8090/image'

export const labelImage = (imgUrl) => {
  var requestUrl = serverRemote + '?imgUri=' + imgUrl + '&key=' + apiKey
  console.log('requesting data from:' + requestUrl)

  return axios.get(requestUrl)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      console.log('error requesting server', err.toString())
    })
}
