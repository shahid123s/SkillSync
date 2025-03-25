import React from "react";

export default function Banner() {
    return (
        <section className="bg-slate-50 py-12 px-6">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="text-sm">
                        <span className="text-teal-500">Inspiration</span>
                    </div> 

                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">
                        Why Swift UI Should Be on the Radar of Every Mobile Developer
                    </h1>

                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-200">
                        Start learning now
                    </button>
                </div>

                <div className="relative h-[300px] md:h-[350px]">
                    <img
                        src="/placeholder.svg?height=350&width=500"
                        alt="Developer working on laptop"
                        className="object-cover rounded-lg w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}
