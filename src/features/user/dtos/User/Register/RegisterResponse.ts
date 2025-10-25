import type {ErrorFieldDto} from "../ErrorFieldDto.ts";

export interface RegisterResponse {
    success: boolean;
    errors: ErrorFieldDto[];
}