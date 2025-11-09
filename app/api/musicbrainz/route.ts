import { MusicBrainzApi, CoverArtArchiveApi, IReleaseGroup, IBrowseReleasesResult, IRelease, IBrowseArtistsResult, ICoversInfo } from "musicbrainz-api";

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mbid = searchParams.get('mbid');

    if (!mbid) {
        return Response.json({ error: 'Missing mbid' }, { status: 400 });
    }

    try {
        const releaseGroup = await mbApi.lookup('release-group', mbid);
        const releases = await mbApi.browse('release', { 'release-group': mbid });
        const artist = await mbApi.browse('artist', { 'release-group': mbid });
        const primaryRelease = releases.releases.find(r => (r.date == releaseGroup["first-release-date"]) && r["cover-art-archive"].front) || releases.releases[0];
        const coverArt = await caaApi.getReleaseCovers(primaryRelease.id);
        
        const apiInfo: ApiInfo = { releaseGroup, releases, primaryRelease, artist, coverArt };
        return Response.json(apiInfo);
    } catch (error) {
        console.error('Error fetching from MusicBrainz:', error);
        return Response.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
