import { BsFillGrid3X3GapFill, BsListUl, BsSearch } from 'react-icons/bs'
import { FaFilter } from "react-icons/fa";
import 'react-tooltip/dist/react-tooltip.css'
import prisma from '@/lib/prisma';
import { database_case } from '../types';
import { toReadableTime, toRelativeTime } from '@/lib/utils'
import Link from 'next/link';

import "./cases.css";
import { UserItem } from '../shared/user/user';
import { CaseType } from '../shared/components/misc';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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
                    <button className="cases-ui-item btn-disabled" disabled><FaFilter /></button>
                    <button className="cases-ui-item btn-disabled" disabled><BsSearch /></button>
                </div>
                <div className="cases-ui-wrapper cases-view">
                    <button className="cases-ui-item btn-disabled" disabled>
                        <BsFillGrid3X3GapFill />
                    </button>
                    <button className="cases-ui-item btn-disabled" disabled>
                        <BsListUl />
                    </button>
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