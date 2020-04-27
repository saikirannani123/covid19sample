import axios from 'axios';
import {BASE_URL} from 'api/Constants';
//axios.defaults.baseURL = 'http://18.237.203.69:9090/sunbox/';

function getAxiosInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    // auth: {
    //     username: 'sunbox',
    //     password: 'sunbox'
    // }
  });
  return instance;
}

export function post(url, params = {}, config = {}, data = {}) {
  var urlValue = `${BASE_URL}${url}`;

  return axios.post(urlValue, params, config);
}
export function get(url, config = {}, data = {}, params = {}) {
  console.log("URL ======", url)
  return getAxiosInstance().get(url, config, params);
}

export function del(url, config = {}, data = {}) {
  return getAxiosInstance().del(url, config);
}

export function postAxios(
  url,
  params = {},
  headers = {},
  initialCallback,
  onCompletionCallBack,
) {
  if (initialCallback) {
    initialCallback();
  }

  var urlValue = `${BASE_URL}${url}`;

  console.log("URL ======", urlValue)


  axios
    .post(urlValue, params, {headers: headers})
    .then(function(response) {
      console.log("RESPOMSE ======", response)
      onCompletionCallBack(response);
    })
    .catch(function(error) {
      console.log("error ======", error)
      onCompletionCallBack(error);
    });
}

// GET METHOD
export function getAxios(
  url,
  headers = {},
  initialCallback,
  onCompletionCallBack,
) {
  if (initialCallback) {
    initialCallback();
  }

  var urlValue = `${BASE_URL}${url}`;
  console.log("URL ======", urlValue)

  axios
    .get(urlValue)
    .then(function(response) {
      onCompletionCallBack(response);
    })
    .catch(function(error) {
      onCompletionCallBack(error);
    });
}

//PUT METHOD
export function putAxios(
  url,
  params = {},
  headers = {},
  initialCallback,
  onCompletionCallBack,
  onCompletionErrorCallBack,
) {
  if (initialCallback) {
    initialCallback();
  }

  var urlValue = `${BASE_URL}${url}`;
  console.log("URL ======", urlValue)

  axios
    .put(urlValue, params, { headers: headers })
    .then(function(response) {
      onCompletionCallBack(response);
    })
    .catch(function(error) {
      onCompletionErrorCallBack(error);
    });
}

//DELETE METHOD
export function deleteAxios(
  url,
  params = {},
  headersAuthorization = {},
  initialCallback,
  onCompletionCallBack,
  onCompletionErrorCallBack,
) {
  if (initialCallback) {
    initialCallback();
  }

  var urlValue = `${BASE_URL}${url}`;
  console.log("URL ======", urlValue)

  axios
    .delete(urlValue, { data: params, headers: headersAuthorization })
    .then(function(response) {
      onCompletionCallBack(response);
    })
    .catch(function(error) {
      onCompletionErrorCallBack(error);
    });
}

export function getJsonHeader(AccessToken) {
  var headers = {
    'Content-Type': 'application/json',
    Authorization: AccessToken,
  };
  return headers;
}

export function getAuthorizationHeader(AccessToken) {
  var headers = {
    Authorization: AccessToken,
  };
  return headers;
}

export function getFormDataHeader() {
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return headers;
}

export function getContentJsonHeader() {
  var headers = {
    'Content-Type': 'application/json',
  };
  return headers;
}


export function updateProfile(url, params, initialCallback, onCompletionCallBack){
  getAxios(url, params, {}, initialCallback, onCompletionCallBack)
}