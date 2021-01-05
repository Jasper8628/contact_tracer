import axios from "axios";
const urlStr = 'http://localhost:5001/contact-tracer-29f4f/australia-southeast1/server';
const urlLive = 'https://australia-southeast1-contact-tracer-29f4f.cloudfunctions.net/server/api'
const url = '/api';
let config = {
  headers: {
    header1: 'Access-Control-Allow-Origin',
  }
}
const API = {
  init: function () {
    return axios.get(urlLive, config)
  },
  tag: function (data) {
    return axios.post(urlLive, data, config)

  },
  search: function (data) {
    console.log(data)
    return axios.post(`${urlLive}/info`, data, config)

  },
  reset: function () {
    return axios.get(`${urlLive}/reset`, config)

  }
}
export default API