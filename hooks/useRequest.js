import useSWR from 'swr';
import api from "../services/config";

const fetcher = (url, payload, params) => {
  const requestParams = { 
    method: params?.method || 'GET'
  }
  if (requestParams.method !== 'GET' && payload) requestParams.body = JSON.stringify(payload) 
  
  fetch(url, requestParams)
  .then((res) => res.json());
}

export const useRequest = (url, payload, params) => {
  const address = api.getUri() + url;
  console.log('url:', url);

  const { data, error } = useSWR(
    address, 
    fetcher(address, payload, params),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false
    }
  );
  return { data, error };
};
