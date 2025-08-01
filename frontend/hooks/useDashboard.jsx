import { useState } from "react";
import { BASE_URL } from "../constants";
import { useGallery } from "./useGallery";
import {toast} from 'react-toastify'

export const useDashboard = () => {

    const [news, setNews] = useState([]);
    const [allUser, setallUser] = useState([])
    const [messages, setMessages] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [events, setEvents] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [researches, setResearches] = useState([]);
    const [loading, setLoading] = useState(false)
    const [achievements, setAchievements] = useState([])
    const [banner, setBanner] = useState([])


    
    const getAllUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/auth/user`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                return
            }
            setallUser(data.users)
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllNews = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/news/get-news`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                navigate('/');
                return
            }


            setNews(data.news)
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllResearches = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/research`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                navigate('/');
                return
            }


            setResearches(data.research)
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllMagazines = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/magazine/get-magazine`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                navigate('/');
                return
            }


            setMagazines(data.magazine)
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/event/get-event`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                navigate('/');
                return
            }


            setEvents(data?.event)
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllBanner = async () => {
        try {
            const response = await fetch(`${BASE_URL}/banner`, {
                method: 'GET'
            })
            const data = await response.json()
            if (!response.ok) {
                return
            }
            setBanner(data?.banner)
        } catch (error) {
            console.log(error)
        }

    }

    const getAllBlogs = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/blog/get-blog`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();

            if (!response.ok) {
                setLoading(false);
                navigate('/');
                return
            }


            setBlogs(data.blog)
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const deleteBlog = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/blog/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!response.ok) {
                navigate('/');
                return
            }

            const filteredBlog = blogs.filter((b) => b._id !== id)
            setBlogs(filteredBlog)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMagazine = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/magazine/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!response.ok) {
                navigate('/');
                return
            }

            const filteredMegazine = magazines.filter((magazine) => magazine._id !== id)
            setMagazines(filteredMegazine)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteEvent = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/event/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!response.ok) {
                navigate('/');
                return
            }

            const filteredEvent = events.filter((event) => event._id !== id)
            setEvents(filteredEvent)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBanner = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/banner/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await response.json();
            if (data?.success === false) {
                return
            }
            const filteredbanner = banner?.filter((b) => b?._id !== id)
            setBanner(filteredbanner)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteResearch = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/research/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.deleted) {
                navigate('/');
                return
            }

            getAllResearches();
        } catch (error) {
            console.log(error);
        }
    }



    const deleteNews = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/news/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!response.ok) {
                navigate('/');
                return
            }

            const filteredNews = news.filter((n) => n._id !== id)
            setNews(filteredNews)
        } catch (error) {
            console.log(error);
        }
    }

    const getAchievement = async () => {
        try {
            const response = await fetch(`${BASE_URL}/experience-achievement/get-achievement`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            if (!data.success) {
                return
            }
            setAchievements(data.achievements)
        } catch (error) {
            console.log(error)
        }
    }

        const getallMessage = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/contact`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.json();
                if (!response.ok) {
                    setLoading(false);
                    return
                }
                setMessages(data?.contact)
                setLoading(false);
            }
            catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    
    
        const deleteMessage = async(id)=>{
            try {
                const response = await fetch(`${BASE_URL}/contact/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
    
                })
                const data = await response.json();
                if (!data.success) {
                    return
                }
                const filteredMessage = messages.filter((m)=>m._id !== id)
                setMessages(filteredMessage)
                
            } catch (error) {
                console.log(error)
            }
        }
    
        const deleteAchievement = async (id) => {
            try {
                const response = await fetch(`${BASE_URL}/experience-achievement/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
    
                })
                const data = await response.json();
                if (!data.success) {
                    return
                }
                const filteredAchievement = achievements.filter((achievement)=>achievement?._id !== id)
                setAchievements(filteredAchievement)
            }
            catch (error) {
                console.log(error)
            }
        }

            const handleApprovePaper = async (id) => {
                try {
                    const response = await fetch(`${BASE_URL}/research/approve-paper/${id}`, {
                        method: 'PATCH',
                        credentials: 'include'
        
                    })
                    const data = await response.json();
                    if (!data.success) {
                        return
                    }
                    data?.message === "research paper approved" ? toast.success(data?.message) : toast.error(data?.message)
                    const modifiedInfo = researches.map((r)=> r._id === id ? {...r,isApproved:!r.isApproved} : r)
                    setResearches(modifiedInfo)
                    
                }
                catch (error) {
                    console.log(error)
                }
            }

            const handleApproveBlog = async (id) => {
                    try {
                        const response = await fetch(`${BASE_URL}/blog/approve-blog/${id}`, {
                            method: 'PATCH',
                            credentials: 'include'
            
                        })
                        const data = await response.json();
                        if (!data.success) {
                            return
                        }
                        data?.message === "blog approved" ? toast.success(data?.message) : toast.error(data?.message)
                        const modifiedInfo = blogs.map((b)=> b._id === id ? {...b,isApproved:!b.isApproved} : b)
                        setBlogs(modifiedInfo)
                        
                    }
                    catch (error) {
                        console.log(error)
                        setLoading(false)
                    }
                }
            
            


    return {
        getAllNews,
        getAllResearches,
        getAllMagazines,
        getAllEvents,
        getAllBlogs,
        deleteBlog,
        deleteMagazine,
        deleteEvent,
        deleteResearch,
        deleteNews,
        deleteAchievement,
        deleteMessage,
        getAllUser,
        getallMessage,
        getAchievement,
        getAllBanner,
        deleteBanner,
        handleApprovePaper,
        handleApproveBlog,
        banner,
        loading,
        achievements,
        allUser,
        messages,
        news,
        magazines,
        events,
        blogs,
        researches
    }
}