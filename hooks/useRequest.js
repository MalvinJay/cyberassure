import useSWR from 'swr';
import api from "../services/config";

const fetcher = (url, payload = null, params) => {
  const requestParams = { 
    method: params?.method || 'GET'
  }
  if (requestParams.method !== 'GET' && payload) requestParams.body = JSON.stringify(payload) 

  api[params.method?.toLowerCase() || 'get'](url, requestParams).then((res) => { res.data });
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
