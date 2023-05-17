import { useEffect, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";

interface UseDataApiResult<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

function useDataApi<T>(
  initialUrl: string,
  initialData: T
): [UseDataApiResult<T>, Dispatch<SetStateAction<string>>] {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        console.log(result.data);
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchData();
    setUrl("");
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}

export default useDataApi;
