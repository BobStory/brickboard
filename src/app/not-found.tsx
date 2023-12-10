import './shared/globals.css'
import { RespNotFound } from "./shared/components/responses";

export default function NotFound() {
    return (
        <main className="access-error">
            <RespNotFound />
        </main>
    )
}