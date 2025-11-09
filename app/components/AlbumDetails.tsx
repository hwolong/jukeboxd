import { ApiInfo } from '../api_access';
import CommentBox from './CommentBox';

interface albumDetailsProps {
    apiInfo: ApiInfo
}

function sortArtists(artists: Array<{ name: string }>){
    if (artists.length <= 0){
        return 'No artists found.'
    } else if (artists.length > 1){
        const artistNames = artists.map(artist => artist.name);
        return artistNames.join(', ');
    } else {
        return artists[0].name;
    }
}

export default function AlbumDetails( {apiInfo} : albumDetailsProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 border">
            <img className="rounded-lg pt-4 pr-2 pl-2 max-w-[50%]" src={apiInfo.coverArt.images[0].image} alt={`${apiInfo.releaseGroup.title} cover art`} />
            <h1 className="text-xl font-bold">{sortArtists(apiInfo.artist.artists)}</h1>
            <h3 className="text-xl font-bold italic">{apiInfo.releaseGroup.title}</h3>
            <h3 className="text-lg">Released {apiInfo.releaseGroup['first-release-date']}</h3>
            <CommentBox mbid={apiInfo.releaseGroup.id} />
        </div>
    )

}