'use client'

import { useRouter } from 'next/navigation';
import '../sidemap/sidemap.css'
import { RiShieldFill, RiShieldFlashFill } from 'react-icons/ri'
import { BsFileEarmarkPersonFill, BsChatLeftTextFill } from 'react-icons/bs'
import { FiFileText, FiSettings } from 'react-icons/fi'
import { TbReload, TbSearch } from 'react-icons/tb'
import React from 'react';

type SidemapProps = {
    render: {
        reloadDataBtn: boolean
        searchBar: boolean
    },
    highlight_module: string | undefined
}

type ModuleSectionProps = {
    highlight_module: string | undefined
}

export default function Sidemap({ render, highlight_module }: SidemapProps) {
    return (
        <nav className="sidemap-navigation">
            <section className="interface">
                {/* <div className="interface-item reload-data" hidden={!render.reloadDataBtn}>
                    <TbReload />
                </div>
                <div className="interface-item searchbar" hidden={!render.searchBar}>
                    <input type="search" name="search-modules" id="searchbar-modules" />
                    <TbSearch />
                </div> */}
            </section>
            <ModuleSection highlight_module={highlight_module} />
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
            <div className={`module ${isHighlighted('cases') ? 'highlight-module' : ''}`} id='cases' onClick={() => router.push('../cases/')}>
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