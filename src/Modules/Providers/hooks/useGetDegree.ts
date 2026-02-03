import { useQuery } from "@tanstack/react-query";
import { getDegree } from "../../../Apis/modules/master/degree.api";


interface UseGetDegreeOptions {
    enabled?: boolean;
}

export function useGetDegree(options?: UseGetDegreeOptions) {
    const query = useQuery({
        queryKey: ["degree"],
        queryFn: getDegree,
        enabled: options?.enabled ?? true,
    });
    console.log("Degree Query Data:", query.data);
    return {
        data: query.data ,
        isLoading: query.isLoading,
        error: query.error,
    };
}
