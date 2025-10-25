import type {UserDto} from "@user/dtos/User/UserDto.ts";
import type {ErrorFieldDto} from "@user/dtos/User/ErrorFieldDto.ts";

export interface LoginResponse {
    user: UserDto | null;
    success: boolean;
    errors: ErrorFieldDto[];
}