// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export enum UserLoadOptions {
    None = 0,

    /** Загрузить роли пользователя */
    IncludeRoles = 1 << 0, // 1

    /** Загрузить разрешения пользователя */
    IncludePermissions = 1 << 1, // 2

    Full = UserLoadOptions.IncludeRoles | UserLoadOptions.IncludePermissions,
}
