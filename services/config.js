import axios from "axios";
import router from 'next/router';
import Cookies from "js-cookie";

// For setting baseUrls and other global configs
const token = Cookies.get("token");

export const urls = {
  production: `https://api.dev.orgposture.com/`,
  development: `https://api.dev.orgposture.com/`,
};

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    "Content-Type": "application/json",
  },
});

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    if (
      !config.headers.Authorization ||
      config.headers.Authorization.includes("undefined")
    ) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log("response:", response);
    // Handle refresh token here..
    return response;
  },
  function (error) {
    // Do something with response error
    console.log("response error:", error);
    const originalConfig = error.config;

    if (!originalConfig.url.includes("/login") && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          // const params = {
          // 	id: user?.id,
          // 	refresh_token: user?.refresh_token
          // }

          // api.post('/auth/refresh-token', params)
          // .then((response) => {
          // 	// Set updated user details
          // 	store.dispatch(setUser(response.data.data))
          // 	.then((res) => {
          // 		// Proceed to retry request again!
          //     console.log('originalConfig:', originalConfig)
          // 	}, (error) => {
          //     console.error('Error refreshing token:', error)
          //   })
          // 	.catch((err) => {
          // 		console.error('Error:', err)
          // 	})
          // })
          // .catch(async (error) => {
          // 	console.log('Refresh error:', error)
          // })

          // Logout here...
          // store.dispatch(logout()).then(() => {});
          localStorage.clear();
          router.push("/login");

          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
