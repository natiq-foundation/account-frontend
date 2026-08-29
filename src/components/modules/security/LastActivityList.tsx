type LastActivityItem = {
    id: string;
    title: string;
    description: string;
    date: string;
};

type LastActivityListProps = {
    activities: LastActivityItem[];
};

export const LastActivityList = ({ activities }: LastActivityListProps) => {
    if (activities.length === 0) {
        return (
            <div className="py-6">
                <p className="text-sm text-zinc-500">
                    No recent security activity.
                </p>
            </div>
        );
    }

    return (
        <ul>
            {activities.map((activity) => (
                <li
                    key={activity.id}
                    className="flex flex-col gap-1 border-b border-zinc-800 py-5 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                    <div>
                        <p className="text-sm font-medium text-zinc-100">
                            {activity.title}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-zinc-400">
                            {activity.description}
                        </p>
                    </div>

                    <time className="shrink-0 text-sm text-zinc-500">
                        {activity.date}
                    </time>
                </li>
            ))}
        </ul>
    );
};
