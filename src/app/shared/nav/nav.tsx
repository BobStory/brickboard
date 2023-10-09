'use client'

import { Tooltip } from 'react-tooltip'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa'
import '../nav/nav.css';
import { FiChevronRight } from 'react-icons/fi'
import React from 'react';

type NavigationProps = {
    render: {
        locationHint: boolean,
        locationHintContent: Array<string>
    }
}

export default function Navigation({ render }: NavigationProps) {
    const router = useRouter()
    return (
        <nav className='main-navigation'>
            <Tooltip id="tooltip" />
            <button className="nav-logo" onClick={() => router.push('../home/')}>
                <Image
                    className='img-avatar'
                    src={'https://cdn.discordapp.com/avatars/979794367759908934/5456a3c30015c48499c5b5e0fb44aabb.webp'}
                    alt={'Brickbot Logo'}
                    height={144}
                    width={144}
                />
                <p>Brickbot</p>
            </button>
            <div className="nav-item-container">
                <div className="nav-item location-hint" hidden={!render.locationHint}>
                    {render.locationHintContent.map((content, index) => (
                        <React.Fragment key={index}>
                            {index > 0}
                            <p>{content}</p>
                            <FiChevronRight />
                        </React.Fragment>
                    ))}
                </div>
                <div className="nav-item nav-user">
                    <span className="user-icon">
                        <Image
                            className='img-avatar'
                            src={'https://cdn.discordapp.com/embed/avatars/3.png'}
                            alt={'User Avatar'}
                            height={144}
                            width={144}
                        />
                    </span>
                    <span className="user-name">Wumpus3000</span>
                    <FaChevronDown></FaChevronDown>
                </div>
            </div>
        </nav>
    )
}