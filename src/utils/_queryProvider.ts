import { useQuery } from '@tanstack/react-query';

const useGetQuizDataQuery = (endpoint: string) => {
  return useQuery({
    queryKey: ['quiz-data', endpoint],
    queryFn: async () => {
      const response = await fetch(`https://opentdb.com/api.php?${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      return response.json();
    },
    enabled: Boolean(endpoint),
  });
};

const queryFunctions = {
  useGetQuizDataQuery,
};

export default queryFunctions;
