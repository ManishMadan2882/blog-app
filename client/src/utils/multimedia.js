import axios from 'axios';
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
const uploadMultimedia = (url, method, body) => {
  // initializing the axios instance with custom configs
  const Token = getCookie('session');
  const api = axios.create({
    baseURL: '/',
    headers: {
      Authorization: `bearer ${Token}`,
    },
  });

  return new Promise((resolve, reject) => {
    api
      .request({ method: method, url: url, data: body, })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export default uploadMultimedia;