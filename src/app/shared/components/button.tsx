'use client';
import Image from 'next/image';
import { BsDiscord } from "react-icons/bs";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <button
                data-tooltip-id="tooltip"
                data-tooltip-content={'Signout of Discord'}
                className="nav-item login-btn"
                onClick={() => signOut()}
            >
                <div className='user-object'>
                    <div className='user-avatar'>
                        <Image
                            src={session.user?.image ? session.user.image : 'https://cdn.discordapp.com/embed/avatars/3.png'}
                            alt={`${session.user?.name}'s Avatar`}
                            width={128}
                            height={128}
                        />
                    </div>
                    <p className='user-name'>{session.user?.name}</p>
                </div>
            </button>
        )
    }
    return (
        <button
            data-tooltip-id="tooltip"
            data-tooltip-content={'Signin with Discord'}
            className="nav-item login-btn"
            onClick={() => signIn()}
        >
            <BsDiscord className="login-icon" />
        </button>
    )

}