import { useState } from "react";
import { BASE_URL } from "../constants";

export const useBlog = () => {

    const [singleBlog, setSingleBlog] = useState();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState([]);
    const [PopularBlog,setPopularBlog] = useState()
    const [topcategory, setTopcategory] = useState([])

    const getsingleBlog = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/blog/${id}`, {
                credentials: "include",
            });
            const data = await response.json();
            setLoading(false);
            setSingleBlog(data.blog);
        } catch (error) {
            console.error("Error fetching single blog:", error);
            setLoading(false);
        }
    };

        const getBlogs = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${BASE_URL}/blog/get-approved-blog`)
                const data = await response.json()
                if (!response.ok) {
                    setLoading(false)
                    return
                }
                setBlog(data.blog)
                setPopularBlog(data.trendingBlog)
                setTopcategory(data.topcategory)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }


    return {
        getsingleBlog,
        getBlogs,
        PopularBlog,
        setBlog,
        topcategory,
        blog,
        singleBlog,
        loading,
    }

}