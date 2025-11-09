import FaveAlbum from "./FaveAlbum";

export default function FaveAlbumHolder({ mbids }: { mbids: string[] }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {mbids.map(mbid => (
                <FaveAlbum key={mbid} mbid={mbid} />
            ))}
        </div>
    );
}