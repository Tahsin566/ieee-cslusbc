import { useState } from "react";
import { BASE_URL } from "../constants";

export const useNews = () => {

    const [singleNewsData, setSingleNewsData] = useState();
    const [newsData, setNewsData] = useState([]);
    const [trendingNews, setTrendingNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const getsingleNewsData = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/news/${id}`, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            if(!response.ok){
                setLoading(false);
                return
            }
            setSingleNewsData(data.news);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching single news data:", error);
            setLoading(false);
        }
    };


    const getNews = async()=>{
        // setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/news/get-news`,{
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setNewsData(data);
                setTrendingNews(data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                // setLoading(false);
            }
        }
    

    return {
        getsingleNewsData,
        getNews,
        setNewsData,
        singleNewsData,
        trendingNews,
        newsData,
        loading
    };

}