import Review from "./Review";

export default async function ReviewTimeline() {
    

    return (
        <div className="flex flex-row grow mx-8 mb-8">
            <div className="grow"></div>
            <section id="new_reviews" className="flex flex-col items-start w-9/10 md:w-4/5">
                <Review 
                    albumName="The Dark Side of the Moon" 
                    artistName="Pink Floyd" 
                    reviewBody="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
                    id="bang"
                />
            </section>
            <div className="grow"></div>
        </div>
    ); 
}