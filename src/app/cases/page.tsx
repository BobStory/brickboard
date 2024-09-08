import prisma from '@/lib/prisma';
import { moderation_case } from '../types';
import { toReadableTime, toRelativeTime } from '@/lib/utils'
import Link from 'next/link';

import "./cases.css";
import { UserItem } from '../shared/user/user';
import { CaseType, TooltipItem } from '../shared/components/misc';
import { ResponseComponent403 } from '../shared/components/responses';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function getCases() {
    const cases = await prisma.moderation_cases_old.findMany({ orderBy: { case_id: 'desc' } });
    return cases.reverse()
}

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/api/auth/signin?callbackUrl=/cases');
    }

    const allCases = await getCases();

    if (session?.user?.role == 'ROLE_USER') {
        return (
            <main className='main-cases access-denied'>
                <ResponseComponent403 />
            </main>
        )
    }
    else {
        return (
            <>
                <TooltipItem />
                <main className='case-main-page'>
                    <section className="case-container">
                        <div className="case-head">
                            <div className="head-container">
                                <div className='head-item plchd'></div>
                                <div className='head-item'>
                                    <p>id</p>
                                </div>
                                <div className='head-item'>
                                    <p>user</p>
                                </div>
                                <div className='head-item'>
                                    <p>reason</p>
                                </div>
                                <div className='head-item'>
                                    <p>moderator</p>
                                </div>
                                <div className='head-item'>
                                    <p>created</p>
                                </div>
                                <div className='head-item'>
                                    <p>duration</p>
                                </div>
                            </div>
                        </div>
                        <div className="case-body">
                            {allCases.map(mod_case => {
                                return (
                                    <CaseItem key={mod_case.case_id} case_data={mod_case} />
                                );
                            })}
                        </div>
                    </section>
                </main>
            </>
        )
    }

}

async function CaseItem({ case_data }: { case_data: moderation_case }) {
    return (
        <div className='case-item-container' id={`case-${case_data.case_id}`}>
            <Link className='case-item' href={`cases/view/${case_data.case_id}`}>
                <CaseType case_type={case_data.case_type} />
                <p>{Number(case_data.case_id)}</p>
                <UserItem user_id={case_data.user_id} />
                <p>{case_data.reason_open}</p>
                <UserItem user_id={case_data.moderator_id_open} />
                <CaseDate timestamp={case_data.timestamp_open} />
                <CaseDate timestamp={case_data.timestamp_close} />
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
            <p data-tooltip-id="tooltip" data-tooltip-content="Unknown"></p>
        )
    }
}