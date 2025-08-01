import { useEffect, useLayoutEffect, useState,memo } from "react";
import { BASE_URL } from "../../constants";

const Eventcountdown = memo(({time:eventTime}) => {

    const [time,setTime] = useState(0)

    const [loading,setLoading] = useState(true)

    const getcountdown = async() => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/event/get-upcoming-event`,{
                method:'GET'
            })
            const data = await response.json()
            if(!response.ok){
                return
            }
            setTime(data.millisecondsleft || 0)
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
        return {days,hours,minutes,seconds}
    }

    useEffect(() => {
        if(time <= 0){
            return
        }
        const interval = setInterval(() => {
            setTime(time - 1000)
        }, 1000);
        return () => clearInterval(interval);
    }, [time])

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {getFormatedTime(time).days !== 0 && <div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{loading ? '00' : getFormatedTime(time).days || '00'}</span>
                <p className="text-sm">{getFormatedTime(time).days <= 1 ? 'Day' : 'Days'}</p>
            </div>}
            {<div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{loading ? '00' : getFormatedTime(time).hours}</span>
                <p className="text-sm">{getFormatedTime(time).hours <= 1 ? 'Hour' : 'Hours'}</p>
            </div>}
            {<div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{loading ? '00' : getFormatedTime(time).minutes}</span>
                <p className="text-sm">{getFormatedTime(time).minutes <= 1 ? 'Minute' : 'Minutes'}</p>
            </div>}
            {<div className="bg-[#2c3240] text-white px-4 py-3 rounded-xl w-40">
                <span className="text-2xl font-bold">{loading ? '00' : getFormatedTime(time).seconds}</span>
                <p className="text-sm">{getFormatedTime(time).seconds <= 1 ? 'Second' : 'Seconds'}</p>
            </div>}
        </div>
    );
});

//memoize

export default Eventcountdown;
