import { MusicBrainzApi } from "musicbrainz-api"
import { getInfo } from "../api_access";
import { stringify } from "querystring";

const mbApi = new MusicBrainzApi({
    appName: 'Jukeboxd',
    appVersion: '0.1.0',
    appContactInfo: 'hwolong@gmail.com',
});

async function makeAlbum({ mbid }: { mbid: string }) {
    const release = await getInfo({ mbid });
    if (!release) {
        throw "getInfo Failed";
    }
    console.log(release);
    return (
        <div className="flex flex-col items-center justify-center gap-4 border">
            <h1>{release.releaseGroup.title}</h1>
            <img className="max-w-xs rounded-lg p-2" src={release.coverArt.images[0].image} alt={`${release.releaseGroup.title} cover art`} />
            <h3>{release.artist.artists.length > 1 ? <b>Artists:</b> : <b>Artist:</b>} {release.artist.artists.map(artist => artist.name).join(", ")}</h3>
            <h3><b>Release date:</b> {release.releaseGroup["first-release-date"]}</h3>
        </div>
    );
}

export default function FaveAlbum({ mbid }: { mbid: string }) {
    return (
        <div>
            {makeAlbum({ mbid })}
        </div>
    )
}