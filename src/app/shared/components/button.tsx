import Link from "next/link";
import { BsDiscord } from "react-icons/bs";

export async function LoginButton() {

    function setSession() {
        const session_id = crypto.randomUUID();
        const inat = new Date()
        const exat = new Date(inat.getTime() + 24 * 60 * 60 * 1000).toUTCString();
        const cookie_content = `session_id=${session_id}; expires=${exat}; path=/`;

        document.cookie = cookie_content;
    }

    return (
        <Link
            onClick={setSession}
            data-tooltip-id="tooltip"
            data-tooltip-content={'Login with Discord'}
            className="nav-item login-btn"
            target="_self"
            href={`https://discord.com/api/oauth2/authorize?client_id=1174377662907687023&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Foauth%2Fdiscord&response_type=code&scope=identify%20guilds`}
        >
            <BsDiscord className="login-icon" />
        </Link>
    )
}