import { differenceInHours, formatDistanceToNow } from "date-fns";

export const formatUrl = (url?: string): string => {
    if (!url) return '';
    return url.replace(/^(https?:\/\/)/, '');
};

export const getRelativeTime = (dateString: Date) => {
    const date = new Date(dateString)
    const hoursAgo = differenceInHours(new Date(), date)

    return hoursAgo < 24 ? `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago` : formatDistanceToNow(date, { addSuffix: true })
}