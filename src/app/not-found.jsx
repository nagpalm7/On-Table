import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <div className="card bg-base-100 shadow-xl p-8 m-8">
                <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
                <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
                <a href="/" className="btn">
                    Go back home
                </a>
            </div>
        </div>
    );
}