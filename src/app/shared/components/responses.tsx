import '../../shared/globals.css';

export function ResponseComponent403() {
    return (
        <div className="response-container">
            <h3>403 - Forbidden</h3>
            <small>
                Try to sign in with an account wich has required permissions to use this page.
                <br />
                If this is unexpected, please file an issue on&nbsp;
                <a href="https://github.com/BobStory/brickboard/issues/new" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                &nbsp;or contact an administrator.
            </small>
        </div >
    )
}

export function ResponseComponent401() {
    return (
        <div className="response-container">
            <h3>401 - Unauthorized</h3>
            <small>
                You have no permission to access this page. Please try to log in your Discord account.
                <br />
                If this is unexpected, please file an issue on&nbsp;
                <a href="https://github.com/BobStory/brickboard/issues/new" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                &nbsp;or contact an administrator.
            </small>
        </div >
    )
}

export function ResponseComponent500() {
    return (
        <div className="response-container">
            <h3>500 - Internal Server Error</h3>
            <small>
                You should not see this. Try to login again or use an other account.
                If the error persits, please file an issue on&nbsp;<a href="https://github.com/BobStory/brickboard/issues/new" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            </small>
        </div>
    )
}

export function ResponseComponent404() {
    return (
        <div className="response-container">
            <h3>404 - Not Found</h3>
            <small>
                The ressource you requested could not be found.
                If this is unexpected, please file an issue on&nbsp;<a href="https://github.com/BobStory/brickboard/issues/new" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
            </small>
        </div>
    )
}