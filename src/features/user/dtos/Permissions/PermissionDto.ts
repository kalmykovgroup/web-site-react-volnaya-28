import type {Guid} from "@app/lib/types/Guid.ts";
import type {UserPermissionDto} from "@user/dtos/UserPermissions/UserPermissionDto.ts";
import type {RolePermissionDto} from "@user/dtos/RolePermissions/RolePermissionDto.ts";

export interface PermissionDto {
    id: Guid; // Guid
    name: string; // "ViewDevices", "RunScenarios"
    description: string | null;
    userPermissions: UserPermissionDto[];
    rolePermissions: RolePermissionDto[];
}