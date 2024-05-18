import './shared/globals.css'
import { ResponseComponent404 } from "./shared/components/responses";

export default function NotFound() {
    return (
        <main className="access-error">
            <ResponseComponent404 />
        </main>
    )
}