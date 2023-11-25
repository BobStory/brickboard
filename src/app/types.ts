import { DefaultUser, User } from "next-auth"

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
export type status_code =
    'OK 200' |
    'CREATED 201' |
    'ACCEPTED 202' |
    'BAD_REQUEST 400' |
    'UNAUTHORIZED 401' |
    'FORBIDDEN 403' |
    'NOT_FOUND 404' |
    'METHOD_NOT_ALLOWED 405' |
    'REQUEST_TIMEOUT 408' |
    'TOO_MANY_REQUESTS 429' |
    'INTERNAL_SERVER_ERROR 500' |
    'NOT_IMPLEMENTED 501'

export interface moderation_case {
    'case_id': bigint,
    'case_type': number | null,  //1 = Content moderation block; 2 = Message delete; 3 = Warn; 4 = Timeout; 5 = Kick; 6 = Ban
    'user_id': bigint | null,
    'moderator_id_open': bigint | null,
    'reason_open': string | null,
    'proof'?: string | null,  //Only by type 1 & 2
    'timestamp_open': number | null,
    'duration': number | null, //Timestamp(null if ban, content moderation block, message delete, warn)
    'channel_id'?: bigint | null,  //Only at type 1 & 2
    'moderator_id_close'?: bigint | null,  //Only at type 3 - 6
    'reason_close'?: string | null,  //Only at type 3 - 6
    'timestamp_close'?: number | null,  //Only at type 3 - 6
    'dm_message_url'?: string | null,  //null if dms closed / bot is blocked
    'log_message_url_open': string | null,
    'log_message_url_close'?: string | null,  //Only at type 3, 4, 5 & 6
}

export type SidemapProps = {
    render: {
        jump_back: boolean
    },
    highlight_module: string | undefined
}

export type ModuleSectionProps = {
    highlight_module: string | undefined
}

export interface UserDisplyOptions {
    size: 'small' | 'medium' | 'large'
    user: number[] | bigint[] | any
}

export type NavigationProps = {
    render: {
        locationHint: boolean,
        locationHintContent: Array<string>
    }
}

export type DiscordUserObject = {
    id: string | number,
    username: string,
    global_name?: string,
    avatar: string
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    banner?: string
    accent_color?: number
    locale: string
    verified?: boolean
    email?: string
    flags?: number
    premium_type?: number
    public_flags?: number
    avatar_decoration?: string
}

export type AuthDataObject = {
    token_type: string
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
}

export type DashboardUserRole = "ROLE_USER" | "ROLE_STAFF" | "ROLE_ADMIN"

type UserId = string

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId,
            role: DashboardUserRole
        }
    }
}