import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    // console.log("request 2", config);
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for API calls

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      error["response"] = {
        data: {
          errors: [
            {
              message:
                "Проверьте подключение к Интернету или Сервер не отвечает",
            },
          ],
        },
      };
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);
export { api };
