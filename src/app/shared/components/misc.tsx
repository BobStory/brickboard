import { BsFillQuestionCircleFill } from 'react-icons/bs'
import Image from 'next/image';
import { DashboardUserRole } from '@/app/types';

export function CaseNoteItem({ case_note }: { case_note: any }) {
    return (
        <div></div>
    )
}

export function TimelineItem({ event, date }: { event: string, date: number }) {

    return (
        <div className="timeline-item">
            <h4 className="timeline-event">{event}</h4>
            <small className="timeline-date">{new Date(date).toLocaleString(undefined, { dateStyle: 'long' })}</small>
        </div>
    )
}

export function CaseType({ case_type }: any) {
    switch (case_type) {
        case 1:
            return (
                <Image
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Content Moderation"
                    className='case-type-icon'
                    src={'https://cdn.discordapp.com/emojis/1162945986809831474.webp?size=128&quality=lossless'}
                    alt={'Content Moderation'}
                    height={128}
                    width={128}
                />
            )
        case 2:
            return (
                <Image
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Message Delete"
                    className='case-type-icon'
                    src={'https://cdn.discordapp.com/emojis/1162945908271497276.webp?size=128&quality=lossless'}
                    alt={'Message Delete'}
                    height={128}
                    width={128}
                />
            )
        case 3:
            return (
                <Image
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Warn"
                    className='case-type-icon'
                    src={'https://cdn.discordapp.com/emojis/1162945885047640175.webp?size=128&quality=lossless'}
                    alt={'Warn'}
                    height={128}
                    width={128}
                />
            )
        case 4:
            return (
                <Image
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Timeout"
                    className='case-type-icon'
                    src={'https://cdn.discordapp.com/emojis/1162945869176381490.webp?size=128&quality=lossless'}
                    alt={'Timeout'}
                    height={128}
                    width={128}
                />
            )
        case 5:
            return (
                <Image
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Kick"
                    className='case-type-icon'
                    src={'https://cdn.discordapp.com/emojis/1162945852231405689.webp?size=128&quality=lossless'}
                    alt={'Kick'}
                    height={128}
                    width={128}
                />
            )
        case 6:
            return (
                <Image
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Ban"
                    className='case-type-icon'
                    src={'https://cdn.discordapp.com/emojis/1162945836276252732.webp?size=128&quality=lossless'}
                    alt={'Ban'}
                    height={128}
                    width={128}
                />
            )

        default:
            return (
                <div className="case-type-icon" data-tooltip-id="tooltip" data-tooltip-content="Type Unknown">
                    <BsFillQuestionCircleFill />
                </div>
            )
    }
}

export function UserRole({ role_type }: { role_type: DashboardUserRole }) {
    switch (role_type) {
        case 'ROLE_ADMIN':
            return (
                <span className="user-role role-admin">@administrator</span>
            )
        case 'ROLE_STAFF':
            return (
                <span className="user-role role-staff">@moderator</span>
            )
        case 'ROLE_USER':
            return (
                <span className="user-role role-user">@user</span>
            )

        default:
            return (
                <span className="user-role role-unknown">@unknown_role</span>
            )
    }
}