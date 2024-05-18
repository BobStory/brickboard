import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { DashboardUserRole } from "../types";
import { ResponseComponent403 } from "../shared/components/responses";

export default async function page() {
    const session = await getServerSession(authOptions);

    switch (session?.user?.role as DashboardUserRole) {
        case 'ROLE_ADMIN':
            return (
                <main>
                    <div>Settings</div>
                </main>
            )

        default:
            return (
                <main className="access-error">
                    <ResponseComponent403 />
                </main>
            )
    }
}