import { MusicBrainzApi } from "musicbrainz-api"

const mbApi = new MusicBrainzApi({
    appName: 'Jukeboxd',
    appVersion: '0.1.0',
    appContactInfo: 'hwolong@gmail.com',
});

export async function getReleaseGroup({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching release group with MBID: ${mbid}`);
        const releaseGroup = await mbApi.lookup('release-group', mbid);
        console.log(releaseGroup);
        return releaseGroup
    } catch (error) {
        console.error(error);
    }
}
