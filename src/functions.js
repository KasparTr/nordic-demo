import axios from 'axios'
import dummyResponse from './assets/dummy-img-label-response.json'

let apiKey = 'ADAsd46fd23AngLKJH3Dsd3fs3' // remove BEFORE git push
let serverUri = 'http://0.0.0.0:8080/image'

export const labelImage = (imgUrl) => {
  var requestUrl = serverUri + '?imgUri=' + imgUrl + '&api=' + apiKey
  console.log('requesting data from:' + requestUrl)

  // TODO: Replace this dummy response with the following request call and test
  return dummyResponse;

  /*
  return axios.get(requestUrl)
    .then(resp => {
      return resp.data
    })
    .catch(err => {
      console.log('error requesting server', err.toString())
    })
    */
}
