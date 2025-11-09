import { MusicBrainzApi, CoverArtArchiveApi, IReleaseGroup, IBrowseReleasesResult, IRelease, IBrowseArtistsResult, ICoversInfo } from "musicbrainz-api"

 export interface ApiInfo {
    releaseGroup: IReleaseGroup;
    releases: IBrowseReleasesResult;
    primaryRelease: IRelease;
    artist: IBrowseArtistsResult;
    coverArt: ICoversInfo;
}

const mbApi = new MusicBrainzApi({
    appName: 'Jukeboxd',
    appVersion: '0.1.0',
    appContactInfo: 'hwolong@gmail.com',
});

const caaApi = new CoverArtArchiveApi();

export async function getReleaseGroup({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching release group with MBID: ${mbid}`);
        const releaseGroup = await mbApi.lookup('release-group', mbid);
        return releaseGroup
    } catch (error) {
        console.error(error);
    }
}

async function getReleases({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching releases for release group MBID: ${mbid}`);
        const releases = await mbApi.browse('release', { 'release-group': mbid });
        return releases;
    } catch (error) {
        console.error(error);
    }
}

async function getArtist({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching artists for release group MBID: ${mbid}`);
        const artist = await mbApi.browse('artist', { 'release-group': mbid });
        return artist;
    } catch (error) {
        console.error(error);
    }
}

async function getCoverArt({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching cover art for release MBID: ${mbid}`);
        const coverArt = await caaApi.getReleaseCovers(mbid);
        return coverArt;
    } catch (error) {
        console.error(error);
    }
}

export async function getInfo({ mbid }: { mbid: string }) {
    try {
        console.log(`Fetching release group with MBID: ${mbid}`);
        const releaseGroup = await mbApi.lookup('release-group', mbid);
        const releases = await mbApi.browse('release', { 'release-group': mbid });
        const artist = await mbApi.browse('artist', { 'release-group': mbid });
        const primaryRelease = releases.releases.find(r => (r.date == releaseGroup["first-release-date"]) && r["cover-art-archive"].front) || releases.releases[0];
        const coverArt = await caaApi.getReleaseCovers(primaryRelease.id);
        return { releaseGroup, releases, primaryRelease, artist, coverArt } as ApiInfo;
    } catch (error) {
        console.error(error);
        return null;
    }
}
