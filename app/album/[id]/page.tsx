import { ApiInfo, getInfo } from "@/app/api_access";
import AlbumDetails from "@/app/components/AlbumDetails";
import Header from "@/app/components/Header";

interface AlbumDetailsRouteRootProps {
    params: {
        id: string
    }
    apiInfo?: ApiInfo
}

export default async function AlbumDetailsRouteRoot({params, apiInfo}: AlbumDetailsRouteRootProps) {

    let body;
    if (apiInfo) {
        body = <AlbumDetails apiInfo={apiInfo}></AlbumDetails>
    }
    else {
        const info = await getInfo({mbid: params.id});
        body = info ? <AlbumDetails apiInfo={info}></AlbumDetails> : <h4>Error, not found :(</h4>
    }

    return (
        <main id="top" className="h-full w-full font font-['Ubuntu',sans-serif]">
            <Header></Header>
            {body}
        </main>
    );
}