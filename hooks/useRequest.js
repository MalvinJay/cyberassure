import useSWR from 'swr';
import api from "../services/config";

// Use axios instance as fetcher

export const useRequest = (key, url, params, config={}) => {
  const fetcher = (url) => {
    return new Promise((resolve, reject) => {
      return api.get(url, params)
      .then((res) => {
        console.log(key, ':', res.data.message)
        resolve(res.data.message)
      }, (err) => reject(err))
      .catch((error) => reject(error))
    })
  };
  
  const { isLoading, data, error, mutate } = useSWR(
    key,
    fetcher(url),
    {...config}
  );

  return { isLoading, data, error, mutate };
};
