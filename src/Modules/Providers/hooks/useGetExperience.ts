import { useQuery } from "@tanstack/react-query";
import { getExperience } from "../../../Apis/modules/master/experience.api";

interface UseGetExperienceOptions {
    enabled?: boolean;
}

export function useGetExperience(options?: UseGetExperienceOptions) {
    const query = useQuery({
        queryKey: ["experience"],
        queryFn: async () => {
            const response = await getExperience();
            return response.data 
        },
        enabled: options?.enabled ?? true,
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        error: query.error,
    };
}
