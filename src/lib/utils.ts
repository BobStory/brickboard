export function toRelativeTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const currentDate = new Date();

    const timeDifference = date.getTime() - currentDate.getTime();

    const isPast = timeDifference <= 0;

    const seconds = Math.abs(Math.floor(timeDifference / 1000));
    const minutes = Math.abs(Math.floor(seconds / 60));
    const hours = Math.abs(Math.floor(minutes / 60));
    const days = Math.abs(Math.floor(hours / 24));
    const months = Math.abs(Math.floor(days / 30));
    const years = Math.abs(Math.floor(months / 12));

    if (years > 0) {
        return isPast ? (years === 1 ? "1 year ago" : `${years} years ago`) : `in ${years} years`;
    } else if (months > 0) {
        return isPast ? (months === 1 ? "1 month ago" : `${months} months ago`) : `in ${months} months`;
    } else if (days > 0) {
        return isPast
            ? days === 1
                ? "1 day ago"
                : `${days} days ago`
            : days === 1
                ? "in 1 day"
                : `in ${days} days`;
    } else if (hours > 0) {
        return isPast ? (hours === 1 ? "1 hour ago" : `${hours} hours ago`) : `in ${hours} hours`;
    } else if (minutes > 0) {
        return isPast
            ? minutes === 1
                ? "1 minute ago"
                : `${minutes} minutes ago`
            : minutes === 1
                ? "in 1 minute"
                : `in ${minutes} minutes`;
    } else {
        return isPast ? (seconds <= 1 ? "just now" : `${seconds} seconds ago`) : `in ${seconds} seconds`;
    }
}

export function toReadableTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleString(undefined, options);
}

export async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
}

export function CaseTypeToString(type: any): string {
    switch (type) {
        case 1:
            return 'blocked by Content-Moderation'
        case 2:
            return 'Message deleted'
        case 3:
            return 'User warned'
        case 4:
            return 'User timed out'
        case 5:
            return 'User kicked'
        case 6:
            return 'User banned'
        default:
            return 'Unknown Type'
    }
}