import { useSearchParams } from 'react-router-dom';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Wrapper to get a parameter with an optional default value
  const getParam = (key: string, defaultValue: string | null = null) => {
    return searchParams.get(key) ?? defaultValue;
  };

  // Wrapper to set multiple parameters
  const updateParams = (newParams: Record<string, string>, options?: { replace?: boolean }) => {
    const updatedParams = new URLSearchParams(searchParams);

    // Update or add new params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key); // Remove param if value is null/undefined
      }
    });

    setSearchParams(updatedParams, options);
  };

  return { getParam, updateParams };
};

export default useQueryParams;
