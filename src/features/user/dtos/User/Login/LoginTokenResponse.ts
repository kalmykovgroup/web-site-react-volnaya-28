import type {LoginResponse} from "./LoginResponse.ts";

export interface LoginTokenResponse extends LoginResponse {
    token: string | null;
}