//var API_BASE = 'http://localhost:3000/'
var API_BASE = 'http://ec2-18-156-198-242.eu-central-1.compute.amazonaws.com/api/'

export async function fetchApi(url, params){
    var resp = await fetch(API_BASE + url, params)
    if(resp.status != 200){
      throw new Error(resp.statusText)
    }
    return await resp.json()
}
