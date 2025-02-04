import Link from "next/link";

export default function Medicine({data}) {
    const tags = data?.tags ? data?.tags.split(/\s*,\s*/).slice(0, 3) : ''
    return (
        <div className="medicine__item flex flex-col bg-white shadow-md rounded-md">
            <div className="medicine__thumbnail">
                <img src={data?.image ? data?.image : '/images/error-image.png'} alt={data?.name}/>
            </div>
            <div className="medicine__meta px-3 py-3 shrink-0 flex-1 flex flex-col">
                <Link href={`medicine/${data?.slug}`} className="flex-1">
                    <h3 className="medicine__title text-hover text-medium font-bold mb-1 line-clamp-2">{data?.name}</h3>
                </Link>
                <p className="medicine__desc text-xsmall line-clamp-2 font-medium" dangerouslySetInnerHTML={{__html: data?.content}}></p>
            </div>
            <div className="medicine__tags flex gap-2 text-xsmall px-3 py-3 h-12 shrink-0">
                {
                    tags ? tags.map((tag, index) => (
                            <p className="tag px-2 py-0.5 rounded-full text-gray-700 lowercase line-clamp-1" key={`tag-${index}`}>{tag}</p>
                        )) :
                        <p className="tag px-2 py-0.5 rounded-full text-gray-700 lowercase line-clamp-1">...</p>
                }
            </div>
        </div>
    )
}