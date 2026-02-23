export const formatRelativeTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    return `${hours} hours ago`;
};