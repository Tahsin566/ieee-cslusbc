import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useMagazine } from "../../hooks/useMagazine";

const SingleMegazine = () => {

    const { id } = useParams();

    const { singleMagazine, getMagazine, getSingleMegazine, magazineData } = useMagazine()

    const [prevIssue,setPrevIssue] = useState([])


    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getSingleMegazine(id);
        getMagazine()
        setPrevIssue(magazineData?.magazine?.filter((m)=>m?.issueNumber < singleMagazine?.issueNumber))
    }, []);


    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }


    const randomViews = Math.floor(Math.random() * 10000) + 1000;
    const randomDownloads = Math.floor(Math.random() * 1000) + 100;
    const randomShares = Math.floor(Math.random() * 500) + 50;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            {/* {JSON.stringify(magazineData?.magazine?.filter((m)=>m?.issueNumber > singleMagazine?.issueNumber))} */}
            {JSON.stringify(prevIssue)}
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                    {/* Magazine Header */}
                    <div className="bg-gradient-to-r bg-[#045C99] py-8 px-6 md:px-10">
                        <div className="flex items-center justify-between">
                            <span className="text-white text-sm font-semibold bg-blue-800 px-3 py-1 rounded-full">
                                IEEE CS LU SBC Magazine
                            </span>
                            <span className="text-white text-sm">
                                Published: {new Date(singleMagazine?.publicationDate)?.toDateString() || "May 2025"}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
                            {singleMagazine?.title}
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 md:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Magazine Image */}
                            <div
                                className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-300"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                                    transition: 'transform 0.3s ease-in-out'
                                }}
                            >
                                <img
                                    className="w-full h-auto object-cover"
                                    src={`${singleMagazine?.magazineImage}`}
                                    alt={singleMagazine?.title}
                                />


                            </div>

                            {/* Magazine Details */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">About This Issue</h2>

                                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                        {singleMagazine?.description}
                                    </p>

                                    {/* Additional details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-blue-800">Publication</h3>
                                            <p className="text-gray-800">{singleMagazine?.publishedBy}</p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-blue-800">Issue</h3>
                                            <p className="text-gray-800">Volume {singleMagazine?.volumeNumber}, Issue {singleMagazine?.issueNumber}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`${singleMagazine?.magazineFile}`}
                                        target="_blank"
                                        className="flex-1 flex justify-center items-center gap-2 bg-[#045C99] hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </a>

                                </div>
                            </div>
                        </div>

                        {/* Stats Section */}
                        {/* <div className="grid grid-cols-3 gap-4 mt-10 border-t border-gray-200 pt-10">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-blue-600">{randomViews.toLocaleString()}</h3>
                                <p className="text-gray-600">Views</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-blue-600">{randomDownloads.toLocaleString()}</h3>
                                <p className="text-gray-600">Downloads</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-blue-600">{randomShares.toLocaleString()}</h3>
                                <p className="text-gray-600">Shares</p>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Featured Articles Section */}


                {/* Previous Issues */}
                {prevIssue?.length > 0 ? <div className="mt-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Previous Issues</h2>
                        <a href="/megazine" className="text-blue-600 hover:text-blue-800 font-medium">View All</a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {prevIssue?.map((item) => (
                            <div>

                                {<div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                                    <div className="h-40 bg-gray-200">
                                        <img
                                            src={`${item?.magazineImage}`}
                                            alt="Previous Issue"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800">{item?.title} #{item?.issueNumber}</h3>
                                        <p className="text-xs text-gray-500 mt-1">Q{item?.issueNumber} {item?.volumeNumber}</p>
                                    </div>
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>:<></>}
            </div>
        </div>
    );
};

export default SingleMegazine;