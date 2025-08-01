import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../constants';

const Countdown = () => {

    const [time, setTime] = useState(0)
    const [banner,setBanner] = useState([])

    const [loading, setLoading] = useState(true)

    const getcountdown = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/event/get-upcoming-event`, {
                method: 'GET'
            })
            const data = await response.json()
            if (!data.success) {
                return
            }
            setTime(data.millisecondsleft || 0)
            setBanner(data.event || [])
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getcountdown()
    }, [])

    const getFormatedTime = (time) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds }
    }

    useEffect(() => {
        if (time <= 0) {
            return
        }
        const interval = setInterval(() => {
            setTime(time - 1000)
        }, 1000);
        return () => clearInterval(interval);
    }, [time])


    const bannerimg = `${banner?.image}`


    return (
         <div>
            <div
                className="hero relative overflow-hidden"
            >
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: banner?.image
                            ? `url(${bannerimg})`
                            :
                            "url(https://i.ibb.co.com/vvXVccv7/time-Banner.png)",
                        filter: "blur(8px)",
                        transform: "scale(1.1)",
                    }}
                ></div>
                <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold">Next Event Countdown</h1>
                        <div className='flex justify-center items-center mb-3'>
                            <div className="grid grid-flow-col gap-5 text-center  auto-cols-max text-[#f7a320] font-extrabold">
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-5xl ">
                                        <span
                                            style={{ "--value": getFormatedTime(time).days }}
                                            aria-live="polite"
                                            aria-label="15 days remaining"
                                        >
                                            {getFormatedTime(time).days}
                                        </span>
                                    </span>
                                    {getFormatedTime(time).days > 1? "days" : "day"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-5xl">
                                        <span
                                            style={{ "--value": getFormatedTime(time).hours }}
                                            aria-live="polite"
                                            aria-label="10 hours remaining"
                                        >
                                            {getFormatedTime(time).hours}
                                        </span>
                                    </span>
                                    {getFormatedTime(time).hours > 1 ? "hours" : "hour"}
                                </div>
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-5xl">
                                        <span
                                            style={{ "--value": getFormatedTime(time).minutes }}
                                            aria-live="polite"
                                            aria-label="24 minutes remaining"
                                        >
                                            {getFormatedTime(time).minutes}
                                        </span>
                                    </span>
                                    min
                                </div>
                                <div className="flex flex-col">
                                    <span className="countdown font-mono text-5xl">
                                        <span
                                            style={{ "--value": getFormatedTime(time).seconds }}
                                            aria-live="polite"
                                            aria-label="59 seconds remaining"
                                        >
                                            {getFormatedTime(time).seconds}
                                        </span>
                                    </span>
                                    sec
                                </div>
                            </div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold">{banner?.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;