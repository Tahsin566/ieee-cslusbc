import React, { useEffect, useState } from 'react';
import { FaCalendarDays, FaUser } from 'react-icons/fa6';
import { BASE_URL } from '../../constants';
import Markdown from 'react-markdown';
import { categories, TimeCategories } from '../../data/categories';
import { useBlog } from '../../hooks/useBlog';

export const MarkdownConfig = {
    a:(props) => <a className='text-green-500 ' {...props} />,
    p: (props) => <p className='text-gray-600' {...props} />,
    h1: (props) => <h1 className='text-xl font-semibold' {...props} />,
    h2: (props) => <h2 className='text-lg font-semibold' {...props} />,
    h3: (props) => <h3 className='text-md font-semibold' {...props} />,
    h4: (props) => <h4 className='text-sm font-semibold' {...props} />,
    h5: (props) => <h5 className='text-xs font-semibold' {...props} />,
    h6: (props) => <h6 className='text-xs font-semibold' {...props} />,
    ul: (props) => <ul className='list-disc ml-4' {...props} />,
    ol: (props) => <ol className='list-decimal ml-4' {...props} />,
    li: (props) => <li className='list-item' {...props} />,
    img: (props) => <img className='w-full h-auto rounded-md' {...props} />,
    blockquote: (props) => <blockquote className='border-l-4 border-gray-300 pl-4 italic' {...props} />,
    code: (props) => <code className='bg-gray-100 px-1 py-0.5 rounded' {...props} />,
    br: (props) => <br {...props} />,
}

const Blog = () => {

    const {topcategory,getBlogs,PopularBlog,blog,setBlog,loading} = useBlog()
    
    const [filteredBlog, setFilteredBlog] = useState([])
    const [search, setSearch] = useState('')
    

    const searchHandler = () => {
        if (search === '') {
            getBlogs();
            return
        }
        const filteredData = blog.filter((news) => news.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredBlog(filteredData);

    }

    const handleDateFilter = async(e) => {
        e.preventDefault()
        try {
          const response = await fetch(`${BASE_URL}/blog/time/${e.target.value}`)
          const data = await response.json()
          if (!response.ok) {
            return
          }
          setBlog(data.blog)
        } catch (error) {
          console.log(error)
        }
      }


    const handleCategoryFilter = async(e) => {
        e.preventDefault()
        try {
          const response = await fetch(`${BASE_URL}/blog/category/${e.target.value}`)
          const data = await response.json()
          if (!response.ok) {
            return
          }
          setBlog(data.blog)
        } catch (error) {
          console.log(error)
        }
      }



    useEffect(() => {
        getBlogs()
    }, [])


    useEffect(() => {
        searchHandler()
    }, [search])


    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }


    return (
        <>
            {/* Blog Title */}
            <section className="text-center py-8 mb-10">
                <h1 className="text-4xl text-[#045C99]  font-bold">IEEE CS LU SB Chapter Blogs</h1>
                <p className="text-gray-600 mt-2 mx-2">Stay updated with the latest news, events and technical articles from IEEE CS LU SB Chapter</p>
            </section>

            {/* Main Blog Section */}
            <section className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6 w-[90%] mx-auto mb-12">
                {/* Left: Blog List + Filters */}
                <div>
                    {/* Filter Options */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex gap-4">
                            <select onChange={handleDateFilter} className="px-4 py-2 rounded-lg border border-gray-300">
                                <option >Select</option>
                                {TimeCategories.map((category, i) => (
                                    <option key={i} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <select onChange={handleCategoryFilter} className="px-4 py-2 rounded-lg border border-gray-300">
                                <option>Select</option>
                                {categories.map((category, i) => (
                                    <option key={i} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-lg border border-gray-300 w-full md:w-auto"
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    {/* Blog Cards */}
                    <div>

                        {blog?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Blog  */}


                            {blog && blog?.map((news, i) => (
                                news?.title.toLowerCase().includes(search.toLowerCase()) && <div key={i} className="shadow-md rounded-lg pb-4 overflow-hidden">
                                    <img src={`${news?.blogImage}`} alt={news.title} className="h-72 w-full object-fit" />
                                    <div className="flex gap-6 p-3 text-sm text-gray-500">
                                        <p><FaCalendarDays className="inline mr-1" />{news.createdAt.split("T")[0]}</p>
                                        <p><FaUser className="inline mr-1" />{news.author}</p>
                                    </div>

                                    <div className='h-[156px] overflow-hidden'>
                                        <h3 className="text-xl font-semibold px-4">{news.title}</h3>
                                        <div className="px-4 text-gray-700 line-clamp-4"><Markdown
                                        components={MarkdownConfig}
                                        >{news.markdown}</Markdown></div>

                                    </div>
                                    <div>
                                        <a href={`/blogs/${news._id}`} className="text-[#045C99] px-4 hover:underline">Read More</a>
                                    </div>
                                </div>
                            ))}


                        </div> : <p className="text-center font-bold text-2xl">No blog found</p>}
                    </div>
                    {filteredBlog?.length === 0 && search !== '' && <div className="text-center py-12 text-xl">No blog found</div>}
                </div>

                {/* Right: Sidebar */}
                <div className="space-y-6">
                    {/* Popular Posts */}
                    <div className="shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">Popular Post</h3>
                        {PopularBlog && PopularBlog?.map((topic, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b">
                                <img src={`${topic.blogImage}`} className="h-15 w-15 object-cover" />
                                <div className="text-sm flex flex-col items-end">
                                    <h5 className="font-semibold">{topic.title}</h5>
                                    <p className="text-gray-500">{new Date(topic.createdAt.split("T")[0]).toDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>

                        {blog?.length > 0 && topcategory?.map((category, i) => (
                            <div key={i} className="flex justify-between py-2">
                                <p>{category._id}</p>
                                <h5>{category.count}</h5>
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="shadow-md rounded-lg p-4 flex flex-wrap gap-3">
                        {["AI", "Robotics", "IoT", "Machine Learning", "Workshops"].map((tag, idx) => (
                            <span key={idx} className="hover:text-white text-black    px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-[#045C99]   ">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;