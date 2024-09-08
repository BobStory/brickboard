import React from 'react';
import Link from 'next/link';

import { SidemapProps, ModuleSectionProps, DashboardUserRole } from '@/app/types';
import { ResponseComponent500 } from '../components/responses';

import { BsFileEarmarkPersonFill, BsArrowLeft } from 'react-icons/bs'
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { FiFileText, FiSettings } from 'react-icons/fi'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import './sidemap.css'
import '../globals.css'

export default function Sidemap({ highlight_module, render }: SidemapProps) {
    return (
        <nav className="sidemap-navigation">
            {
                render.jump_back ? <Link href={'/cases'} className="jump-back"><BsArrowLeft />Back</Link> : <ModuleSection highlight_module={highlight_module} />
            }
        </nav>
    )
}

async function ModuleSection({ highlight_module }: { highlight_module: ModuleSectionProps }) {

    const session = await getServerSession(authOptions);

    return (
        <section className="modules">
            <SidemapContent highlight_module={highlight_module} role_mode={session?.user?.role} />
        </section>
    );
}

function SidemapContent({ highlight_module, role_mode }: { highlight_module: ModuleSectionProps, role_mode: DashboardUserRole }) {

    function isHighlighted(moduleId: string) {
        return moduleId === highlight_module;
    };

    switch (role_mode) {
        case 'ROLE_ADMIN':
            return (
                <>
                    <LinkModuleCases isHighlighted={isHighlighted} />
                    <LinkModuleLogs isHighlighted={isHighlighted} />
                    <LinkModuleAdministration isHighlighted={isHighlighted} />
                    <LinkModuleSettings isHighlighted={isHighlighted} />
                </>
            )
        case 'ROLE_STAFF':
            return (
                <>
                    <LinkModuleCases isHighlighted={isHighlighted} />
                    <LinkModuleLogs isHighlighted={isHighlighted} />
                    <LinkModuleSettings isHighlighted={isHighlighted} />
                </>
            )
        case 'ROLE_USER':
            return (
                <>
                    <LinkModuleCases isHighlighted={isHighlighted} />
                    <LinkModuleSettings isHighlighted={isHighlighted} />
                </>
            )

        default:
            return (<ResponseComponent500 />)

    }

}

function LinkModuleCases({ isHighlighted }: { isHighlighted: Function }) {
    return (
        <Link
            href={'../cases'}
            className={`module ${isHighlighted('cases') ? 'highlight-module' : ''}`} id='cases'
        >
            <p>Cases</p>
            <BsFileEarmarkPersonFill />
        </Link>
    )
}

function LinkModuleLogs({ isHighlighted }: { isHighlighted: Function }) {
    return (
        <Link
            href={'../logs/'}
            className={`module ${isHighlighted('logs') ? 'highlight-module' : ''}`} id='logs'
        >
            <p>Logs</p>
            <FiFileText />
        </Link>
    )
}

function LinkModuleAdministration({ isHighlighted }: { isHighlighted: Function }) {
    return (
        <Link
            href={'../administration/'}
            className={`module ${isHighlighted('logs') ? 'highlight-module' : ''}`} id='logs'
        >
            <p>Administration</p>
            <MdOutlineAdminPanelSettings />
        </Link>
    )
}

function LinkModuleSettings({ isHighlighted }: { isHighlighted: Function }) {
    return (
        <Link
            href={'../settings/'}
            className={`module ${isHighlighted('settings') ? 'highlight-module' : ''}`} id='settings'
        >
            <p>Settings</p>
            <FiSettings />
        </Link>
    )
}