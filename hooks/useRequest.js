import useSWR from 'swr';
import api from "../services/config";

// Use axios instance as fetcher

export const useRequest = (url, params, config={}) => {
  const fetcher = async (url, params) => api.get(url, params).then(res => res.data);
  
  const { isLoading, data, error, mutate } = useSWR(
    api.getUri() + url, 
    fetcher(api.getUri() + url, params),
    config
  );

  return { isLoading, data, error, mutate };
};
