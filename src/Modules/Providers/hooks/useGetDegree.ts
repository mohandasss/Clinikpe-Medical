import { useQuery } from "@tanstack/react-query";
import { getDegree } from "../../../Apis/modules/master/degree.api";
import type { DegreeItem } from "../../../Apis/modules/master/degree.types";

interface UseGetDegreeOptions {
    enabled?: boolean;
}

export function useGetDegree(options?: UseGetDegreeOptions) {
    const query = useQuery({
        queryKey: ["degree"],
        queryFn: async () => {
            const response = await getDegree();
            return response.data.data;
        },
        enabled: options?.enabled ?? true,
    });
    return {
        data: query.data as DegreeItem[] | undefined,
        isLoading: query.isLoading,
        error: query.error,
    };
}
