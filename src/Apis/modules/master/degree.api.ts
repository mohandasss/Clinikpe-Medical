import { apiRequest } from "../../client/ApiAgents";
import type { DegreeResponse } from "./degree.types";

export function getDegree() {
    return apiRequest<DegreeResponse>({
        url: "doctor/master/qualification",
        method: "get",
    });
}
