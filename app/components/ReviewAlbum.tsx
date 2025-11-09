interface ReviewProps {
    albumName: string;
    artistName: string;
    stars: number;
    reviewBody: string;
    id: string;
    key?: number
}

export default function ReviewAlbum({stars, reviewBody}: ReviewProps) {
    return (
        <div className="bg-(--color-off-white) rounded-3xl p-6 w-full shadow-lg flex flex-row my-2">
            <div>
                <p>{(() => {
                    switch (stars) {
                        case 1:
                            return '½';
                        case 2:
                            return '★';
                        case 3:
                            return '★½';
                        case 4:
                            return '★★';
                        case 5:
                            return '★★½';
                        case 6:
                            return '★★★';
                        case 7:
                            return '★★★½';
                        case 8:
                            return '★★★★';
                        case 9:
                            return '★★★★½';
                        case 10:
                            return '★★★★★';
                        default:
                            return 'No Rating';
                    }
                })()}</p>
                <p className="text-(--color-dark) text-sm leading-relaxed italic">{`"${reviewBody}"`}</p>
            </div>
            <div className="grow"></div>
            <div className="flex flex-col items-center ml-4">
                <div className="grow"></div>
                <div className="grow"></div>
            </div>
        </div>
    );
}