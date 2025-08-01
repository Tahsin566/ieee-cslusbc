import { useState } from "react"
import { BASE_URL } from "../constants"

export const useEvent = () => {
    const [datas, setData] = useState()
    const [featuredEvent,setFeaturedEvent] = useState()
    const [upcomingEvents, setUpcomingEvents] = useState()
    const [milisecondsleft,setMilisecondsleft] = useState(0)
    const [loading, setLoading] = useState(false);

    const getEvents = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/event/get-event`, {
            })
            const data = await response.json()
            if(!response.ok){
                setLoading(false)
                return
            }
            setLoading(false)
            setData(data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const getFeaturedEvent = async () => {
        try {
            const response = await fetch(`${BASE_URL}/event/featured-event`, {
                method: 'GET'
            })
            const data = await response.json()
            if (!response.ok) {
                return
            }
            setFeaturedEvent(data.event)
        } catch (error) {
            console.log(error)
        }
    }

    const getupcomingEvents = async () => {
        try {
            const response = await fetch(`${BASE_URL}/event/get-upcoming-event`, {
            })
            const data = await response.json()

            if(!response.ok){
                return
            }
            setUpcomingEvents(data.event)
            setMilisecondsleft(data.millisecondsleft)
        } catch (error) {
            console.log(error)
        }
    }


    return {datas,getEvents,featuredEvent,getFeaturedEvent,upcomingEvents,getupcomingEvents,milisecondsleft,setData,loading}
}