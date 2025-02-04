import Link from "next/link";

export default function DiseaseSimple({props}) {
    return (
        <Link href={`/disease/${props.slug}`}>
            <div className="flex items-center gap-3 shadow-md rounded bg-white">
                <div className="disease__thumbnail h-[80px] w-[80px] rounded overflow-hidden">
                    <img className="object-cover h-full" src={props.image} alt="POPULAR_IMG" />
                </div>
                <h3 className="text-small font-bold">{props.name}</h3>
            </div>
        </Link>
    )
}