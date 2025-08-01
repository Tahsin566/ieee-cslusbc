import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';
import image from '../../../public/img/banner.png';


const Banner = () => {

    const navigate = useNavigate();
    const [events, setEvents] = useState();
    const [loading, setLoading] = useState(false);

    const getEvents = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/banner`, {
                method: 'GET'
            })
            const data = await response.json()
            if (!response.ok) {
                setLoading(false)
                return
            }
            setEvents(data?.banner)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        setLoading(true)
        getEvents()
        setLoading(false)
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
        </div>
    }

    return (


        <div className="relative mt-[0.5px] h-[400px] md:h-[500px] lg:h-[620px] overflow-hidden">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}

                className="mySwiper relative"
            >
                {events?.length > 0 ? events?.map((event, index) => (
                    <SwiperSlide key={index} className="relative h-full">
                        <div className="absolute inset-0">

                            <img src={`${event?.image}`} alt={`IEEE Banner ${index + 1}`}
                                className=" h-[400px] md:h-[500px] lg:h-[600px] object-fit opacity-[0.7]"
                                loading="lazy" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40 px-4">
                            <h2 className="text-5xl md:text-6xl font-bold font-['Roboto'] mb-4">
                                <span className="text-white text-sky-950 text-shadow-2xl text-shadow-sky-500">
                                    {event?.title}
                                    </span> 
                            </h2>
                            {/* <p className="text-lg mb-4 line-clamp-2 max-w-[60%]">{event?.description}</p> */}
                            {event?.bannerType === "Event" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/event`)}>Go to events</button>:null}
                            {event?.bannerType === "Research" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/researchPapers`)}>Browse paper</button>:null}
                            {event?.bannerType === "Achievement" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/achievement`)}>View Achievements</button>:null}
                            {event?.bannerType === "Blog" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/blog`)}>Browse blog</button>:null}
                            {event?.bannerType === "News" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/news`)}>Browse news</button>:null}
                            {event?.bannerType === "Magazine" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/megazine`)}>Browse megazine</button>:null}
                            {event?.bannerType === "Gallery" ? <button className="px-2 py-2 bg-[#045C99] text-white rounded-lg z-20 cursor-pointer" onClick={() => navigate(`/gallery`)}>Browse gallery</button>:null}
                        </div>

                    </SwiperSlide>
                )) : [
                    'No event at the moment'

                ].map((img, index) => (
                    <SwiperSlide key={index} className="relative text-white no-repeat flex">
                        <img src={`../../../public/img/${img}`} alt={img} className="w-[70px] h-[70px] object-cover" />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>

    )
};

export default Banner;