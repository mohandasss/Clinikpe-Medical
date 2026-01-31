import { useQuery } from "@tanstack/react-query";
import { getSpecialities } from "../../../Apis/modules/master/speciality.api";

interface UseSpecialitiesOptions {
    enabled?: boolean;
}

export function useSpecialities(options?: UseSpecialitiesOptions) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["specialities"],
        queryFn: getSpecialities,
        enabled: options?.enabled !== false,
    });
    return {
        data: data || [],
        isLoading,
        error: error?.message || null,
        refetch,
    };
}
