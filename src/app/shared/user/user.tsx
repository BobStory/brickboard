import { UserDisplyOptions } from '@/app/types';
import Image from 'next/image';
import './user.css'
import '@/app/shared/globals.css'

export async function UserItem({ user_id }: { user_id: any }) {

    // const user_data = await fetch(`https://discord.com/api/v9/users/${user_id}`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `MTExMzc1NTg4NzE5MDk1Mzk5NA.GSEov5.NlVZIH-jc9U8-zF5fdMjMHGQmfrzxGWBzSPIgs`,
    //         'Content-Type': 'application/json',
    //     },
    // });

    // const user = await user_data.json();

    // const user_name = user.username
    const user_name = 'Dummmy 300'
    // const user_avatar = user.avatar

    // const avatar_url = `https://cdn.discordapp.com/avatars/${user_id}/${user_avatar}.png`
    const avatar_url = 'https://cdn.discordapp.com/embed/avatars/3.png'

    return (
        <div className='user-object'>
            <div className='user-avatar'>
                <Image
                    src={avatar_url}
                    alt={`${user_name}'s Avatar`}
                    width={128}
                    height={128}
                />
            </div>
            <p className='user-name'>{user_name}</p>
            <p className='user-id'>{`${user_id}`}</p>
        </div>
    );
}

export function UserDisplay(options: UserDisplyOptions) {

    const userArray = options.user

    return (
        <div className={`user-display ${options.size}`}>
            {
                userArray.map(async (user_item: any) => {
                    // const user_data = await fetch(`https://discord.com/api/v9/users/${user_item}`, {
                    //     method: 'GET',
                    //     headers: {
                    //         'Authorization': `MTExMzc1NTg4NzE5MDk1Mzk5NA.GSEov5.NlVZIH-jc9U8-zF5fdMjMHGQmfrzxGWBzSPIgs`,
                    //         'Content-Type': 'application/json',
                    //     },
                    // });

                    // const user = await user_data.json();

                    // const user_avatar = user.avatar

                    // const avatar_url = `https://cdn.discordapp.com/avatars/${user_item}/${user_avatar}.png`
                    const avatar_url = 'https://cdn.discordapp.com/embed/avatars/3.png'
                    return (
                        <span className='user-item' key={`user-${user_item}`} id={`user-${user_item}`}>
                            <Image
                                className='user-icon'
                                src={avatar_url}
                                alt={''}
                                width={100}
                                height={100}
                            />
                        </span>
                    )
                })
            }
        </div>
    )
}