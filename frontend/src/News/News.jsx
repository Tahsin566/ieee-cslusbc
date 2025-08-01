import React, { useEffect, useState } from 'react';
import { FaCalendarDays, FaUser } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { BASE_URL } from '../../constants';
import { categories as newCategories } from '../../data/categories';
import { useNews } from '../../hooks/useNews';
import { Link } from 'react-router-dom';

const News = () => {
    
    const {getNews,setNewsData,newsData,trendingNews,loading} = useNews()

    const filterNews = async(category) => {

        if(category === "All news"){
            getNews()
            return
        }
        try {
            const response = await fetch(`${BASE_URL}/news/category/${category}`,{
                method: "GET"
            });
            const data = await response.json();
            if(!response.ok){
                return
            }
            setNewsData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNews();
    }, [])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }


    return (
        <section className='mb-10'>
            {/* Hero Header */}
            <div className="relative w-full h-[60vh] overflow-hidden mb-3">
                <img src="/img/news.jpg" alt="News Banner" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-8 w-full">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        IEEE Computer Society LU SB Chapter Inaugurates New Academic Session
                    </h2>
                    <p className="mt-2">
                        The IEEE Computer Society LU SB Chapter starts its journey with renewed enthusiasm and commitment to technological advancement
                    </p>
                </div>
            </div>

            {/* News Buttons */}
            <div className="flex flex-wrap gap-3 p-10">
                {[ {name:"All news"},...newCategories].map((news, i) => (
                    <button onClick={() => filterNews(news.name)} key={i} className="px-4 py-2 cursor-pointer border border-[#045C99] text-black bg-white rounded-lg hover:bg-[#045C99] hover:text-white transition">
                        {news.name}
                    </button>
                ))}
            </div>

            {/* News Content */}
            <div className="grid lg:grid-cols-[70%_30%] gap-6 px-10">
                {/* Left News Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {newsData?.news?.length > 0 ? newsData?.news?.map((news, i) => (
                        <div key={i} className="shadow-md rounded-lg pb-4 overflow-hidden space-y-4">
                            <img src={`${news.newsImage}`} alt={news.title} loading="lazy" className="h-[230px] w-full object-fit" />
                            <div className="flex gap-6 p-3 text-sm text-gray-500">
                                <p><FaCalendarDays className="inline mr-1" /> {new Date(news.publicationDate).toDateString()}</p>
                                <p><FaUser className="inline mr-1" /> {news.author}</p>
                            </div>
                            <h3 className="text-xl font-semibold px-4">{news.title}</h3>
                            <div className='h-[150px] overflow-hidden'>
                            <p className="text-gray-700 px-4 line-clamp-6">{news.markdown}</p>
                            </div>
                            <a href={`/news/${news._id}`} className="text-[#045C99] px-4 hover:underline">Read More</a>
                        </div>
                    )):<div className='text-xl text-center'>No news found</div>}
                </div>

                {/* Right Sidebar */}
                <div className="shadow-md rounded-lg p-4 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Trending Topics</h3>
                        {trendingNews?.trendingNews?.map((topic, i) => (
                            i < 2 && <div key={i} className="flex justify-between items-center py-2 border-b">
                                <h2 className="text-[#045C99] text-xl">{`0${i + 1}`}</h2>
                                <div className="text-sm flex flex-col items-end">
                                    <h5 className="font-semibold">{topic.title}</h5>
                                    <p className="text-gray-500">{new Date(topic.publicationDate).toDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div>
                        {/* <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
                        <input
                            type="text"
                            placeholder="Enter Your Email"
                            className="w-full p-2 border rounded-lg mb-2"
                        /> */}
                        <Link target='_blank' to="https://www.youtube.com/@ieeecslusbchapter6574" className="w-full my-5 p-2 bg-[#045C99] text-white rounded-lg hover:bg-red-600 transition">
                            Subscribe to our channel
                        </Link>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Follow IEEE CS LU SB Chapter</h3>
                        <div className="flex gap-4 text-2xl text-black">
                            <a href="https://www.facebook.com/ieeecslu" target="_blank" rel="noreferrer">
                                <FaFacebook className="hover:text-[#045C99]" />
                            </a>
                            <a href="https://www.linkedin.com/company/ieeecslu/" target="_blank" rel="noreferrer">
                                <FaLinkedin className="hover:text-[#045C99]" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;