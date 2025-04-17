import React from "react";
import BannerImage from '../../assets/Banner.png'
import { useNavigate } from "react-router-dom";
export default function Banner() {
    const navigate=  useNavigate()
    return (
        <section className="bg-slate-50 py-12 px-6">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="text-sm">
                        <span className="text-teal-500">Inspiration</span>
                    </div> 

                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">
                    Sync Your Skills, Shape Your Future
                    </h1>

                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <button
                    onClick={() => navigate('/courses')} 
                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition duration-200">
                        Start learning now
                    </button>
                </div>

                <div className="relative h-[300px] md:h-[350px]">
                    <img
                        src={BannerImage}
                        alt="Developer working on laptop"
                        className="object-cover rounded-lg w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}
