import { ApiInfo } from '../api_access';

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
        <div className="flex flex-col items-start gap-4 p-4">
            <div className="w-204 h-104 rounded-s">
                <img 
                    className="w-full h-full object-contain"
                    src={apiInfo.coverArt.images[0].image} 
                    alt={`${apiInfo.releaseGroup.title} cover art`} 
                />
            </div>
            <div className="w-204 text-center">
                <h2 className="text-m mb-2">Artist: {sortArtists(apiInfo.artist.artists)}</h2>
                <h3 className="text-xl font-bold italic mb-2">{apiInfo.releaseGroup.title}</h3>
                <h3 className="text-lg">Released {apiInfo.releaseGroup['first-release-date']}</h3>
            </div>
        </div>
    )

}