import React, { use, useEffect, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper React components



// Custom styles for Swiper

import 'swiper/css';
import './swiper.css'

import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

// Import Swiper styles


import { FaCalendar, FaLocationDot, FaVideo, FaNewspaper, FaCalendarDays, FaScrewdriverWrench, FaPhotoFilm, FaBook, FaFileLines, FaUserPlus, FaPen, FaBlog, FaTrophy, FaUsersGear, FaStar, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { BASE_URL } from '../../constants';
import Eventcountdown from './EventCountDown.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEvent } from '../../hooks/useEvent.jsx';
import { EventCategories } from '../../data/categories.js';

const Event = () => {

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("All Events")
    const {datas,
        getEvents,
        featuredEvent,
        getFeaturedEvent,
        getupcomingEvents,
        upcomingEvents,
        milisecondsleft,
        setData,
        loading
    } = useEvent()    

    

    const filterEvents = async(type) => {
        if(type === "All Events"){
            getEvents()
            return
        }
        try {
            const response = await fetch(`${BASE_URL}/event/category/${type?.toLowerCase()}`, {
                method: 'GET'
            })
            const data = await response.json()
            if(!response.ok){
                return
            }
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDatefiler = async(e) => {
        const date = e.target.value
        try {
            const response = await fetch(`${BASE_URL}/event/date-filter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ startDate:date })
            })
            const data = await response.json()
            
            if(!response.ok){
                return
            }
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        getFeaturedEvent()
        getupcomingEvents()
        getEvents()
    }, [])


    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }

    
    return (
        <div className="font-roboto bg-white text-[#141d28] w-[90%] mx-auto">
            
            {/* Hero Section */}
            <section className="bg-[#141d28] text-white min-h-[400px]  flex flex-col justify-center mt-4 px-5 py-12 lg:px-45 lg:text-3xl sm:p-8 md:p-4 rounded-xl">
                <div className="">
                    <h1 className="text-4xl font-semibold">{upcomingEvents && upcomingEvents?.name}</h1>
                    <h2 className="text-2xl text-[#045C99] mt-2">{upcomingEvents?.status === "upcoming" ? "Coming Soon" : (upcomingEvents && milisecondsleft <= 0 && 'Event Live')}</h2>
                    <p className="max-w-xl  mt-4 text-base">
                        {upcomingEvents?.description}
                    </p>

                    <div className="flex flex-wrap  gap-4 mt-8">
                        
                            <Eventcountdown time={upcomingEvents?.milisecondsleft?.toString()}/>
                        
                        {upcomingEvents && <a href={upcomingEvents?.registrationLink} target="_blank" className="ml-6 p-2 bg-[#045C99] text-white font-semibold rounded-xl flex justify-center items-center">Register Now</a>}
                    </div>
                </div>
            </section>

            {/* Events Tabs */}
            <section className="py-12">
                <div className="container mx-auto">
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        {[{name:"All Events"},...EventCategories].map((item, i) => (
                            <button onClick={() => {filterEvents(item.name); setActiveTab(item.name)}} key={i} className={`px-4 py-2 rounded-lg ${activeTab === item.name ? 'bg-[#045C99] text-white' : 'bg-gray-700 text-white'} cursor-pointer`}>{item.name}</button>
                        ))}
                        <input type="date" className="px-4 py-2 rounded-lg bg-white text-black border"  onChange={handleDatefiler}/>
                        <button className="px-4 py-2 bg-[#045C99] text-white rounded-lg flex items-center gap-2">
                            <FaCalendar /> Calendar View
                        </button>
                    </div>


                    {datas?.event?.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {datas?.event?.map((event, i) => (

                            <div key={i} className="bg-white p-4 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 max-w-[480px]">
                                <img
                                    src={`${event.image}`}
                                    alt="Event"
                                    className="rounded-xl mb-4 w-full h-[200px] object-fit"
                                />
                                <span className="text-xs uppercase px-2 py-1 bg-[#045C99] text-white font-semibold rounded-md mb-2 inline-block">{event.type}</span>
                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                                    <FaCalendar /> {new Date(event.startdate).toDateString()}
                                </div>
                                <h3 className="text-lg font-semibold mb-1">{event?.name}</h3>
                                <h3 className=''>{parseInt(event?.time?.split(":")[0]) > 12 ? parseInt(event?.time?.split(":")[0]) - 12 +":"+event?.time.split(":")[1]: event?.time} {parseInt(event?.time?.split(":")[0]) > 12 ? 'PM':'AM'}</h3>
                                <p className="text-sm mb-2 line-clamp-1">
                                    {event.description}
                                </p>
                                <div className="text-sm flex items-center gap-2 mb-4">
                                    <FaLocationDot /> {event?.location}
                                </div>
                                {event?.status !== 'completed' ? <a className="px-2 py-2 bg-[#045C99] text-white rounded-lg" href={event?.registrationLink} target="_blank">Register Now</a>:null}
                            </div>

                        ))}

                    </div> : <p className="text-center text-2xl font-bold">No events found</p>}


                </div>




            </section>

            {/* Featured Section */}
            <section className="py-12">
                <div className="text-center">
                    <h1 className="text-3xl mb-4 font-extrabold">Featured Events</h1>
                    {featuredEvent && <img src={`${featuredEvent?.image}`} alt="Featured Banner" className="mx-auto rounded-xl" />}
                </div>
            </section>

            {/* Newsletter Section */}
            {featuredEvent ? <section className="bg-white text-black  py-12 px-4">
                <div className="max-w-full mx-auto border border-gray-200 shadow-xl rounded-2xl p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">Stay Updated</h1>
                        <p className="font-semibold">Subscribe to our channel and never miss an event update.</p>
                        <div className="flex justify-center mt-4 flex-wrap gap-2">
                        
                            <Link to={'https://www.youtube.com/@ieeecslusbchapter6574'} className="bg-[#045C99] px-4 py-2 rounded-md text-white font-semibold">
                                Subscribe
                            </Link>
                        </div>
                    </div>
                </div>
            </section> : <p className="text-center text-2xl font-bold">No events found</p>}

            {/* Footer */}

        </div>
    );
};

export default Event;