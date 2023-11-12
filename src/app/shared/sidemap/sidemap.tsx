'use client'

import { useRouter } from 'next/navigation';
import { RiShieldFill, RiShieldFlashFill } from 'react-icons/ri'
import { BsFileEarmarkPersonFill, BsChatLeftTextFill, BsArrowLeft } from 'react-icons/bs'
import { FiFileText, FiSettings } from 'react-icons/fi'
import React from 'react';
import { SidemapProps, ModuleSectionProps } from '@/app/types';

import './sidemap.css'
import '../globals.css'

export default function Sidemap({ highlight_module, render }: SidemapProps) {
    const router = useRouter();
    return (
        <nav className="sidemap-navigation">
            {
                render.jump_back ? <button className="jump-back" onClick={() => { router.push('../') }}><BsArrowLeft />Back</button> : <ModuleSection highlight_module={highlight_module} />
            }
        </nav>
    )
}

function ModuleSection({ highlight_module }: ModuleSectionProps) {
    const router = useRouter()
    const isHighlighted = (moduleId: string) => {
        return moduleId === highlight_module;
    };
    return (
        <section className="modules">
            <div className={`module ${isHighlighted('auto_moderation') ? 'highlight-module' : ''}`} id='auto_moderation' onClick={() => router.push('../auto_moderation/')}>
                <p>Auto Moderation</p>
                <RiShieldFlashFill />
            </div>
            <div className={`module ${isHighlighted('moderation') ? 'highlight-module' : ''}`} id='moderation' onClick={() => router.push('../moderation/')}>
                <p>Moderation</p>
                <RiShieldFill />
            </div>
            <div className={`module ${isHighlighted('cases') ? 'highlight-module' : ''}`} id='cases' onClick={() => router.push('../cases')}>
                <p>Cases</p>
                <BsFileEarmarkPersonFill />
            </div>
            <div className={`module ${isHighlighted('logs') ? 'highlight-module' : ''}`} id='logs' onClick={() => router.push('../logs/')}>
                <p>Logging</p>
                <FiFileText />
            </div>
            <div className={`module ${isHighlighted('messages') ? 'highlight-module' : ''}`} id='messages' onClick={() => router.push('../messages/')}>
                <p>Messages</p>
                <BsChatLeftTextFill />
            </div>
            <div className={`module ${isHighlighted('settings') ? 'highlight-module' : ''}`} id='settings' onClick={() => router.push('../settings/')}>
                <p>Settings</p>
                <FiSettings />
            </div>
        </section>
    );
}