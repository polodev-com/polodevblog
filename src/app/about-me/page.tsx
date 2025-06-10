"use client";
import {CustomNavbar} from "@/components/CustomNavbar";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CustomNavbar/>
            <main className="container mx-auto px-2 py-8 pt-28">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center">Hello there</h1>
                    <p className="text-lg text-gray-600 text-center mb-12">
                        This place supposed to be about me, but I haven&#39;t written anything yet.
                    </p>
                </div>
            </main>
        </div>
    );
}
