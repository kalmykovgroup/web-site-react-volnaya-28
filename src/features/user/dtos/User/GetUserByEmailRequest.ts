import type {UserLoadOptions} from "@/features/user/types/UserLoadOptions.ts";

export interface GetUserByEmailRequest {
    loadOption: UserLoadOptions;
}