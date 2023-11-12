import Navigation from '@/app/shared/nav/nav'
import Sidemap from '@/app/shared/sidemap/sidemap'
import prisma from '@/lib/prisma'
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';

import '@/app/shared/globals.css'
import './case.css'
import { UserDisplay } from '@/app/shared/user/user'

export default async function Page({ params }: { params: { case_id: number } }) {
    const mod_case = await prisma.mod_cases.findUnique({
        where: {
            case_id: params.case_id
        }
    })

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
                            <button className="case-action-btn"><BiCommentDetail /> comment</button>
                            <button className="case-action-btn delete-btn"><BsTrashFill /> delete</button>
                        </div>
                    </div>
                </section>
                <section className='case-view-item case-content'></section>
                <section className='case-view-item case-notes'></section>
            </main>
        </>
    )
}

function TimelineItem({ event, date }: { event: string, date: number }) {

    return (
        <div className="timeline-item">
            <h4 className="timeline-event">{event}</h4>
            <small className="timeline-date">{new Date(date).toLocaleString(undefined, { dateStyle: 'long' })}</small>
        </div>
    )
}