import { apiRequest } from "../../client/ApiAgents";
import type { ExperienceResponse } from "./experience.types";

export function getExperience() {
    return apiRequest<ExperienceResponse>({
        url: "doctor/master/experience",
        method: "get",
    });
}
