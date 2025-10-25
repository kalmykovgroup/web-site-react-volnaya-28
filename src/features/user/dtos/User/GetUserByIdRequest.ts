import type {UserLoadOptions} from "@/features/user/types/UserLoadOptions.ts";

export interface GetUserByIdRequest {
    loadOption: UserLoadOptions;
}