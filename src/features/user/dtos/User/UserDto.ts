 import type {Guid} from "@app/lib/types/Guid.ts";
 import type {PermissionDto} from "@/features/user/dtos/Permissions/PermissionDto.ts";
 import type {RoleDto} from "@/features/user/dtos/Roles/RoleDto.ts";

export interface UserDto {
    id: Guid; // Guid
    email: string;
    fullName: string;
    permissions: PermissionDto[];
    roles: RoleDto[];
}