import useSWR from 'swr';

const fetcher = ({ url, payload, params}) => fetch(url, { 
  method: params?.method || 'GET', 
  body: JSON.stringify(payload) 
})
.then((res) => res.json());

export const useRequest = ({ url }) => {
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};