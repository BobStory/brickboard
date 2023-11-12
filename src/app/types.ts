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

export interface database_table {
    table_name: string,
    table_column: {
        column_name: string,
        column_datatype: string
    }[]
}

export type database_create = {
    requested_name: string,
    status: status_code
}

export type database_setup = {
    requested_name: string,
    requested_table: database_table[] | undefined,
    status: status_code
}

export interface internal_case {
    uuid: `${string}-${string}-${string}-${string}-${string}`,
    case_id: number,
    type: 'KICK' | 'BAN' | 'MUTE' | 'WARN' | 'DELETE' | 'BLOCK',
    user_id: number,
    reason: string,
    duration?: 'PERMANENT',
    author_id: number,
    log_link: `https://discord.com/channels/${number}/${number}/${number}` | `https://canary.discord.com/channels/${number}/${number}/${number}`,
    user_notifed: boolean
}

export interface database_case {
    case_id: BigInt,
    type: number | null,
    user_id: BigInt | null,
    author_id: BigInt | null,
    reason: string | null,
    proof: string | null,
    channel_id: BigInt | null,
    timestamp_now: number | null,
    timestamp_end: number | null,
    log_message_url: string | null,
    dm_message_url: string | null
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