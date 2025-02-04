import Link from "next/link";

export default function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <h1 className="text-2xlarge text-red-600 font-bold">403</h1>
            <p className="text-medium text-black">
                You do not have permission to access this page
            </p>
            <Link href="/" className="text-primary">
                Go to Home
            </Link>
        </div>
    );
}