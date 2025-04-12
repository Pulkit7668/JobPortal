import axios from "axios"
import toast from "react-hot-toast"
// var querystring = require("querystring")
import Cookies from "universal-cookie"

const cookies = new Cookies()
const token = cookies.get("token")
const header = { headers: { "Content-Type": "application/x-www-form-urlencoded", token: token } }

const BASE_URL = "https://api.techizons.in/api"

const post_data = async (url, data) => {
  try {
    const formData = new URLSearchParams()
    for (const key in data) {
      formData.append(key, data[key])
    }

    const response = await axios.post(BASE_URL + url, querystring.stringify(data), header)
    return response
  } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message)
  }
}

const get_api = async (url, customConfig = {}) => {
  try {
    const config = { ...{ headers: header }, ...customConfig }
    const response = await axios.get(BASE_URL + url, config)
    return response
  } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message)
    throw error // Re-throw the error so it can be caught by the caller
  }
}

const post_api = async (url, data, customConfig = {}) => {
  try {
    const config = { ...{ headers: header }, ...customConfig }
    const response = await axios.post(BASE_URL + url, data, config)
    return response
  } catch (error) {
    console.log("error", error)
    throw error // Re-throw the error so it can be caught by the caller
  }
}

const put_api = async (url, data, customConfig = {}) => {
  try {
    const config = { ...{ headers: header }, ...customConfig }
    const response = await axios.put(BASE_URL + url, data, config)
    return response
  } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message)
    throw error // Re-throw the error so it can be caught by the caller
  }
}

const delete_api = async (url, data) => {
  try {
    const response = await axios.delete(BASE_URL + url, { data, headers: header.headers })
    return response
  } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message)
  }
}

export { post_data, get_api, post_api, put_api, delete_api }