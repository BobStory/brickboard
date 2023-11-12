import { BsFillGrid3X3GapFill, BsFillQuestionCircleFill, BsFilterSquareFill, BsListUl, BsSearch } from 'react-icons/bs'
import { FaFilter } from "react-icons/fa";
import 'react-tooltip/dist/react-tooltip.css'
import prisma from '@/lib/prisma';
import { database_case } from '../types';
import { toReadableTime, toRelativeTime } from '@/lib/utils'
import Image from 'next/image';
import Link from 'next/link';

import "./cases.css";
import { UserItem } from '../shared/user/user';

async function getCases() {
    const cases = await prisma.mod_cases.findMany()
    return cases.reverse()
}

export default async function Page() {

    const allCases = await getCases();

    return (
        <main className='main-cases'>
            <section className="cases-ui">
                <div className="cases-ui-wrapper cases-filter">
                    <div className="cases-ui-item"><FaFilter /></div>
                    <div className="cases-ui-item"><BsSearch /></div>
                </div>
                <div className="cases-ui-wrapper cases-view">
                    <div className="cases-ui-item">
                        <BsFillGrid3X3GapFill />
                    </div>
                    <div className="cases-ui-item">
                        <BsListUl />
                    </div>
                </div>
            </section>
            <section className="cases-container">
                <div className="case-head">
                    <div className="head-item">
                        <span className="case-icon-ph"></span>
                        <p>id</p>
                        <p>User</p>
                        <p>Reason</p>
                        <p>Author</p>
                        <p>Created</p>
                        <p>Duration</p>
                    </div>
                </div>
                <div className="case-body">
                    {
                        allCases.map(mod_case => {
                            return (
                                <CaseItem key={mod_case.case_id} case_data={mod_case} />
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}

async function CaseItem({ case_data }: { case_data: database_case }) {
    return (
        <div className='case-item-container' id={`case-${case_data.case_id}`}>
            <span className={`${case_data.timestamp_end ? 'status-open' : 'status-closed'}${case_data.type == 1 ? 'content-mod' : ''}`}></span>
            <Link className='case-item' href={`cases/view/${case_data.case_id}`}>
                <CaseType case_type={case_data.type} />
                <p>{Number(case_data.case_id)}</p>
                <UserItem user_id={case_data.user_id} />
                <p>{case_data.reason}</p>
                <UserItem user_id={case_data.author_id} />
                <CaseDate timestamp={case_data.timestamp_now} />
                <CaseDate timestamp={case_data.timestamp_end} />
            </Link>
        </div>
    );

}

function CaseDate({ timestamp }: any) {
    if (timestamp) {
        return (
            <p data-tooltip-id="tooltip" data-tooltip-content={toReadableTime(timestamp)}>{toRelativeTime(timestamp)}</p>
        )
    }
    else {
        return (
            <p data-tooltip-id="tooltip" data-tooltip-content="Unknown">-</p>
        )
    }
}

function CaseType({ case_type }: any) {
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
                <span className="case-type-icon" data-tooltip-id="tooltip" data-tooltip-content="Type Unknown">
                    <BsFillQuestionCircleFill />
                </span>
            )
    }
}