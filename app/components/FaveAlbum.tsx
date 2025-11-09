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
            <img className="rounded-lg pt-4 pr-2 pl-2" src={release.coverArt.images[0].image} alt={`${release.releaseGroup.title} cover art`} />
            <h1 className="text-xl font-bold italic">{release.releaseGroup.title}</h1>
            <h3 className="text-lg">{release.artist.artists.map(artist => artist.name).join(", ")}</h3>
            <h3 className="text-lg">Released {release.releaseGroup["first-release-date"]}</h3>
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