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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", marginBottom: "20px" }}>
            <h1>{release.releaseGroup.title}</h1>
            <img style={{ maxWidth: "500px", borderRadius: "20px", padding: "10px" }} src={release.coverArt.images[0].image} alt={`${release.releaseGroup.title} cover art`} />
            <h3><b>Artist:</b> {release.artist.artists.map(artist => artist.name).join(", ")}</h3>
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