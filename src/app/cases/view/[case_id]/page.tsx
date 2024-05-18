import Navigation from '@/app/shared/nav/nav'
import Sidemap from '@/app/shared/sidemap/sidemap'
import { UserDisplay, UserItem } from '@/app/shared/user/user'
import { CaseType, TimelineItem } from '@/app/shared/components/misc';
import { ResponseComponent403, ResponseComponent404 } from '@/app/shared/components/responses';
import { CaseTypeToString } from '@/lib/utils';

import '@/app/shared/globals.css'
import './case.css'

import prisma from '@/lib/prisma'

import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page({ params }: { params: { case_id: number } }) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect(`/api/auth/signin?callbackUrl=/cases/view/${params.case_id}`);
    }

    if (session?.user?.role == 'ROLE_USER') {
        return (
            <main className='main-cases access-denied'>
                <ResponseComponent403 />
            </main>
        )
    }
    else {

        const mod_case = await prisma.moderation_cases_old.findUnique({
            where: {
                case_id: params.case_id
            }
        })

        if (mod_case) {

            return (
                <>
                    <Navigation render={{
                        locationHint: false,
                        locationHintContent: ['Cases', `Case ${params.case_id}`]
                    }} />
                    <Sidemap
                        render={{
                            jump_back: true
                        }}
                        highlight_module={undefined}
                    />
                    <main className='case-view'>
                        <section className='case-view-item case-tools'>
                            <div className="participants-container tool-container">
                                <h3 className='case-view-heading'>Participants</h3>
                                {/* <UserDisplay size={'medium'} user={[mod_case?.author_id, mod_case?.user_id]} /> */}
                                <UserDisplay size={'medium'} user={[1, 2, 3, 4]} />
                            </div>
                            <div className="timeline-container tool-container">
                                <h3 className='case-view-heading'>Timeline</h3>
                                <div className="timeline-item-container">
                                    <TimelineItem event={'note added by Wumpus2000'} date={Date.now()} />
                                    <TimelineItem event={'Timeout ended'} date={Date.now()} />
                                    <TimelineItem event={'Wumpus1000 Timed out'} date={Date.now()} />
                                </div>
                            </div>
                            <div className="action-container">
                                <h3 className='case-view-heading'>Actions</h3>
                                <div className='case-view-btn-container'>
                                    <button className="case-action-btn"><MdModeEditOutline /> edit</button>
                                    <button className="case-action-btn delete-btn"><BsTrashFill /> delete</button>
                                </div>
                            </div>
                        </section>
                        <section className='case-view-item case-content'>
                            <div className="case-content-head">
                                <h3 className="cc-body-title">Overview</h3>
                                <div className="cc-head-container">
                                    <div className="cc-head-row">
                                        <h3 className="cc-head-title">Initial Reason</h3>
                                        <p className="cc-row-desc cc-type-desc">
                                            <CaseType case_type={mod_case.case_type} />
                                            {CaseTypeToString(mod_case.case_type)}
                                        </p>
                                    </div>
                                    <div className="cc-head-row">
                                        <h3 className="cc-head-title">Performed By</h3>
                                        <p className="cc-row-desc">
                                            <UserItem user_id={undefined} />
                                        </p>
                                    </div>
                                    <div className="cc-head-row">
                                        <h3 className="cc-head-title">at</h3>
                                        <p className="cc-row-desc">13. November 2023</p>
                                    </div>
                                </div>
                            </div>
                            <tr className="cc-sep"></tr>
                            <div className="case-content-body">
                                <h3 className="cc-body-title">Details</h3>
                                <div className="cc-body-container">
                                    <div className="case-content-row">
                                        <h4 className="cc-row-title">Duration</h4>
                                        <p className="cc-row-desc">-</p>
                                    </div>
                                    <div className="case-content-row">
                                        <h4 className="cc-row-title">User</h4>
                                        <p className="cc-row-desc">
                                            <UserItem user_id={undefined} />
                                        </p>
                                    </div>
                                    <div className="case-content-row">
                                        <h4 className="cc-row-title">Case-ID</h4>
                                        <p className="cc-row-desc">{params.case_id}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <section className='case-view-item case-notes'>
                            <CaseNoteItem case_note={undefined} />
                        </section> */}
                    </main>
                </>
            )
        }
        else {
            return (
                <>
                    <Navigation render={{
                        locationHint: false,
                        locationHintContent: ['Cases', `Case ${params.case_id}`]
                    }} />
                    <main className="access-error">
                        <ResponseComponent404 />
                    </main>
                </>
            )
        }
    }

}