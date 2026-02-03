import { useQuery } from "@tanstack/react-query";
import { getSpecialities } from "../../../Apis/modules/master/speciality.api";
import type { SpecialityResponse } from "../../../Apis/modules/master/speciality.types";

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
        data: data?.data ? (data.data as SpecialityResponse[]) : [],
        isLoading,
        error: error?.message || null,
        refetch,
    };
}
