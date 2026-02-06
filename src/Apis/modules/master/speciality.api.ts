import { apiRequest } from "../../client/ApiAgents";
import type { SpecialityResponse } from "./speciality.types";

export async function getSpecialities(): Promise<SpecialityResponse["data"]> {
    const response = await apiRequest<SpecialityResponse>({
        url: "doctor/master/speciality",
        method: "get",
    });
    return response.data.data;
}
