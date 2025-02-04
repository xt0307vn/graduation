import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <h1 className="text-2xlarge text-red-600 font-bold">401</h1>
            <p className="text-medium text-black">
                You are not authorized to access this page.
            </p>
            <Link href="/login" className="text-primary">
                Go to Login
            </Link>
        </div>
    );
}