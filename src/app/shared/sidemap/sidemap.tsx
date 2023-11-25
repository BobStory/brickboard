import { RiShieldFill, RiShieldFlashFill } from 'react-icons/ri'
import { BsFileEarmarkPersonFill, BsChatLeftTextFill, BsArrowLeft } from 'react-icons/bs'
import { FiFileText, FiSettings } from 'react-icons/fi'
import React from 'react';
import { SidemapProps, ModuleSectionProps, DashboardUserRole } from '@/app/types';

import './sidemap.css'
import '../globals.css'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

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

    const isHighlighted = (moduleId: string) => {
        return moduleId === highlight_module;
    };

    switch (role_mode) {
        case 'ROLE_ADMIN':
            return (
                <>
                    <Link
                        href={'../auto_moderation/'}
                        className={`module ${isHighlighted('auto_moderation') ? 'highlight-module' : ''}`} id='auto_moderation'
                    >
                        <p>Auto Moderation</p>
                        <RiShieldFlashFill />
                    </Link>
                    <Link
                        href={'../moderation/'}
                        className={`module ${isHighlighted('moderation') ? 'highlight-module' : ''}`} id='moderation'
                    >
                        <p>Moderation</p>
                        <RiShieldFill />
                    </Link>
                    <Link
                        href={'../cases'}
                        className={`module ${isHighlighted('cases') ? 'highlight-module' : ''}`} id='cases'
                    >
                        <p>Cases</p>
                        <BsFileEarmarkPersonFill />
                    </Link>
                    <Link
                        href={'../logs/'}
                        className={`module ${isHighlighted('logs') ? 'highlight-module' : ''}`} id='logs'
                    >
                        <p>Logging</p>
                        <FiFileText />
                    </Link>
                    <Link
                        href={'../messages/'}
                        className={`module ${isHighlighted('messages') ? 'highlight-module' : ''}`} id='messages'
                    >
                        <p>Messages</p>
                        <BsChatLeftTextFill />
                    </Link>
                    <Link
                        href={'../settings/'}
                        className={`module ${isHighlighted('settings') ? 'highlight-module' : ''}`} id='settings'
                    >
                        <p>Settings</p>
                        <FiSettings />
                    </Link>
                </>
            )
        case 'ROLE_STAFF':
            return (
                <>
                    <Link
                        href={'../moderation/'}
                        className={`module ${isHighlighted('moderation') ? 'highlight-module' : ''}`} id='moderation'
                    >
                        <p>Moderation</p>
                        <RiShieldFill />
                    </Link>
                    <Link
                        href={'../cases'}
                        className={`module ${isHighlighted('cases') ? 'highlight-module' : ''}`} id='cases'
                    >
                        <p>Cases</p>
                        <BsFileEarmarkPersonFill />
                    </Link>
                    <Link
                        href={'../logs/'}
                        className={`module ${isHighlighted('logs') ? 'highlight-module' : ''}`} id='logs'
                    >
                        <p>Logging</p>
                        <FiFileText />
                    </Link>
                    <Link
                        href={'../messages/'}
                        className={`module ${isHighlighted('messages') ? 'highlight-module' : ''}`} id='messages'
                    >
                        <p>Messages</p>
                        <BsChatLeftTextFill />
                    </Link>
                </>
            )
        case 'ROLE_USER':
            return (
                <Link
                    href={'../cases'}
                    className={`module ${isHighlighted('cases') ? 'highlight-module' : ''}`} id='cases'
                >
                    <p>Cases</p>
                    <BsFileEarmarkPersonFill />
                </Link>
            )

        default:
            return (
                <>
                    <code>500 - Internal Server Error.</code>
                    <small>You should not see this. Try to login again or with an diffrent account. If the error persits, file an issue on GitHub</small>
                </>
            )

    }

}