interface ReviewProps {
    albumName: string;
    artistName: string;
    reviewBody: string;
    id: string;
    key?: number
}

export default function Review({albumName, artistName, reviewBody, id}: ReviewProps) {
    return (
        <div className="bg-(--color-off-white) rounded-3xl p-6 w-full shadow-lg flex flex-row my-2">
            <div>
                <div className="flex flex-row items-end h-lh">
                        <h3 className="text-lg font-bold text-(--color-dark) h-fit">{albumName}</h3>
                        <p className="text-sm text-(--color-main) font-semibold ml-4 h-full">{artistName}</p>
                </div>
                <p className="text-(--color-dark) text-sm leading-relaxed italic">{`"${reviewBody}"`}</p>
            </div>
            <div className="grow"></div>
            <div className="flex flex-col items-center ml-4">
                <div className="grow"></div>
                <a href={`/album/${id}`} className="text-lg text-(--color-main) font-semibold whitespace-nowrap">View Album</a>
                <div className="grow"></div>
            </div>
        </div>
    );
}