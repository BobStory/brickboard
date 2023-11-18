import axios from 'axios';
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto'
import { AuthDataObject, DiscordUserObject } from '@/app/types';

const dc_api_endpoint = 'https://discord.com/api/v10/'
const auth_string = Buffer.from(`${process.env.DC_CLIENT_ID}:${process.env.DC_CLIENT_SECRET}`).toString('base64');
const prisma = new PrismaClient();


export async function GET(req: NextApiRequest) {

    const url_string = req.url as string;
    const url_params = new URLSearchParams(url_string.split('?')[1]);
    const code = url_params.get('code');
    const session_id = req.headers.cookie?.split('; ').find((cookie) => cookie.startsWith('session_id'))?.split('=')[1];

    if (code) {
        console.log(session_id);
        if (session_id) {
            authenticateUser(code, session_id);
            return NextResponse.redirect(`http://localhost:3000/home`)
        }
    }
    else {
        return NextResponse.redirect(`http://localhost:3000/`)
    }
}

async function saveUserData(user_data: DiscordUserObject) {
    const add_user = await prisma.brickboard_users.upsert({
        where: {
            id: Number(user_data.id)
        },
        update: {
            username: user_data.username,
            global_name: user_data.global_name,
            avatar: user_data.avatar,
            locale: user_data.locale
        },
        create: {
            id: Number(user_data.id),
            username: user_data.username,
            global_name: user_data.global_name,
            avatar: user_data.avatar,
            locale: user_data.locale
        }
    })
}

async function saveAuthData(access_data: AuthDataObject, user_id: number, session_id: string) {

    const add_auth_data = await prisma.brickboard_auth.upsert({
        where: {
            id: user_id
        },
        update: {
            access_token: access_data.access_token,
            refresh_token: access_data.refresh_token,
            scope: access_data.scope,
            session_id: session_id
        },
        create: {
            id: Number(user_id),
            access_token: access_data.access_token,
            refresh_token: access_data.refresh_token,
            scope: access_data.scope,
            session_id: session_id
        }
    });
}

export async function authenticateUser(code: string, session_id: string) {
    const data = new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'http://localhost:3000/api/oauth/discord'
    })

    const response = await axios.post(`${dc_api_endpoint}oauth2/token`,
        data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth_string}`
        }
    });

    if (response.data) {
        const access = response.data.access_token;
        const userinfo = await axios.get(`${dc_api_endpoint}/users/@me`, {
            headers: {
                'Authorization': `Bearer ${access}`
            }
        });

        saveUserData(userinfo.data);
        saveAuthData(response.data, userinfo.data.id, session_id);
    }
}

export async function reAuthenticateUser(refresh_token: string, user_id: number) {
    const refresh_data = new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
    })

    const refresh = await axios.post(`${dc_api_endpoint}oauth2/token`,
        refresh_data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth_string}`
        }
    });
    saveAuthData(refresh.data, user_id, '');
}