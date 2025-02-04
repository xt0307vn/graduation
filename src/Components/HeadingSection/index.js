import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function HeadingSection({props}) {
    return (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xlarge font-bold">{props.name}</h2>
            <div className="flex items-center gap-1">
                <Link href={props?.url ? props?.url : '#' } className="text-small text-hover">
                    Xem tất cả <FontAwesomeIcon icon={faChevronRight} />
                </Link>
            </div>
        </div>
    )
}