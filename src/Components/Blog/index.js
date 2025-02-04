import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Blog({data}) {
    return (
        <div className="blog__item flex gap-4 bg-white rounded shadow-lg">
            <div className="blog__meta px-4 py-4">
                <p className="inline-flex items-center justify-center gap-1 bg-primary px-[0.5rem] py-[0.125rem] text-xsmall text-white rounded-sm">
                    <FontAwesomeIcon icon={faEarthAsia} />
                    <span >{data.category.name}</span>
                </p>
                <Link href={`/post/${data?.slug}`}>
                    <h3 className="blog__title line-clamp-2 text-medium font-medium hover:text-primary" dangerouslySetInnerHTML={{ __html: data?.title}}></h3>
                </Link>
                <p className="blog__desc line-clamp-1 text-small" dangerouslySetInnerHTML={{ __html: data?.content}}></p>
            </div>
            <div className="blog__thumbnail">
                <img className='h-full' src={data?.image ? data?.image : '/images/error-image.png'} alt={data?.title}/>
            </div>
        </div>
    )
}