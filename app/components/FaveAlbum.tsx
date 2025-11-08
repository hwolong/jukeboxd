import { MusicBrainzApi } from "musicbrainz-api"
import { getReleaseGroup } from "../api_access";
import { stringify } from "querystring";

const mbApi = new MusicBrainzApi({
    appName: 'Jukeboxd',
    appVersion: '0.1.0',
    appContactInfo: 'hwolong@gmail.com',
});

async function makeAlbum({ mbid }: { mbid: string }) {
    try {
        const releaseGroup = await getReleaseGroup({ mbid });
        return (
            <div>
                <h1>{releaseGroup.title}</h1>
                <h3><b>Release date:</b> {releaseGroup["first-release-date"]}</h3>
            </div>
        );
    } catch (error) {
        return <p>Error fetching album</p>;
    }
}

export default function FaveAlbum() {
    return (
        <div>
            <h2>Favorite Album</h2>
            {makeAlbum({ mbid: "271faeb3-fdd1-3ebb-80aa-97b3116e9341" })}
        </div>
    )
}