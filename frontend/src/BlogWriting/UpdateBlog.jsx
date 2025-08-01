import React, { useEffect } from 'react';
import { useState } from "react";
import { FaCircle, FaClock, FaLink, FaCamera, FaCloudArrowUp } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../constants";
import { useUser } from '../../hooks/useUser';
import { toast, ToastContainer } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../../data/categories';
import Markdown from 'react-markdown'
import { MarkdownConfig } from '../blog/Blog';

const UpdateBlog = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const navigate = useNavigate()

    const [wordCount, setWordCount] = useState(0);
    const { user, getUser } = useUser();
    const [loading, setLoading] = useState(true);

    const [blog, setBlog] = useState({
        title: '',
        author: '',
        category: '',
        markdown: '',
        blogImage: '',
    })

    const getSingleBlog = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/blog/${id}`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                return
            }
            setBlog({
                title: data.blog.title,
                author: data.blog.author,
                category: data.blog.category,
                markdown: data.blog.markdown
            })
            setWordCount(data.blog.markdown.trim().split(/\s+/).length)
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', blog.title);
        formData.append('author', blog.author);
        formData.append('category', blog.category?.trim());
        formData.append('markdown', blog.markdown);
        formData.append('blogImage', blog.blogImage);

        if (blog.markdown.trim().split(/\s+/).length <= 500 || blog.markdown.trim().split(/\s+/).length >= 2000) {
            toast.error('Word count must be between 500-2000 words')
            return
        }

        try {
            const response = await fetch(`${BASE_URL}/blog/update-blog`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            const data = await response.json();
            if (!response.ok) {
                toast.error("Failed to update blog");
                return
            }
            toast.success("Blog updated successfully");
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update blog");
        }
    }

    useEffect(() => {
        getUser();
        getSingleBlog(id);
    }, [])

    if (loading) {
        return <div>
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        </div>
    }

    return (
        user?.role === "admin" ? <section className="flex flex-col lg:flex-row gap-6 px-4 py-6">
            {/* Left section */}
            <ToastContainer />
            <div className="flex-1 space-y-6">
                {/* Blog Writer Box */}
                <div className="bg-white p-4 rounded shadow">
                    {/* Title Row */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Update the Blog</h2>
                        
                    </div>

                    {/* Form */}
                    <form className="space-y-3">
                        <div>
                            <label htmlFor="blog-title" className="block text-sm text-gray-700 mb-1">Blog Title</label>
                            <input type="text" id="blog-title" className="w-full p-2 border rounded" placeholder="Enter your blog title" onChange={(e) => setBlog({ ...blog, title: e.target.value })} value={blog.title} />
                        </div>
                        <div>
                            <label htmlFor="author-name" className="block text-sm text-gray-700 mb-1">Author Name</label>
                            <input type="text" id="author-name" className="w-full p-2 border rounded" placeholder="Your name" onChange={(e) => setBlog({ ...blog, author: e.target.value })} value={blog.author} />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm text-gray-700 mb-1">Category</label>
                            <select id="category" className="w-full p-2 border rounded" value={blog.category} onChange={(e) => setBlog({ ...blog, category: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories?.map((category, index) => (
                                    <option key={index}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="blog-content" className="block text-sm text-gray-700 mb-1">Blog Content</label>
                            <div className="border p-3 rounded-lg space-y-3"  >
                                <div className="flex gap-3 text-lg">
                                    <button type="button"><b>B</b></button>
                                    <button type="button"><i>I</i></button>
                                    <button type="button"><FaLink /></button>
                                    <button type="button"><FaCamera /></button>
                                </div>
                                <textarea
                                onChange={(e) => {
                                    setBlog({ ...blog, markdown: e.target.value })
                                    setWordCount(blog.markdown.trim().split(/\s+/).length)
                                    }}
                                    value={blog.markdown}
                                    id="blog_content"
                                    className="w-full h-48 border p-2 rounded resize-none"
                                    placeholder="Write your blog content here..."
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Upload Box */}
                <div className="text-center">
                    <label htmlFor="file_upload" className="border-2 border-dashed border-gray-300 rounded-lg p-5 bg-white block hover:border-blue-500 cursor-pointer mb-4">
                        <div className="text-3xl mb-2 text-gray-600"><FaCloudArrowUp /></div>
                        <p>Upload a <span className="text-blue-600 font-semibold">file</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        <input type="file" id="file_upload" accept='image/*' required name='blogImage' hidden onChange={(e) => setBlog({ ...blog, blogImage: e.target.files[0] })} />
                    </label>
                    <div className="flex justify-end gap-4">
                        {/* <button className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                        <button className="bg-gray-300 px-4 py-2 rounded">Save Draft</button> */}
                        <Link to={'/dashboard'} className="bg-[#045C99]  text-white px-4 py-2 rounded hover:bg-black">Go to dashboard</Link>
                        <button onClick={handleSubmit} className="bg-[#045C99]  text-white px-4 py-2 rounded hover:bg-black">Update Blog</button>
                    </div>
                </div>
            </div>

            {/* Right section - Guidelines */}
            <div className="w-full lg:w-1/3 bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold pb-2">Writing Guidelines</h2>

                <div className="mb-4">
                    <h3 className="text-md font-medium pb-1">Word Count</h3>
                    <p><strong>Minimum:</strong> 500 words</p>
                    <p><strong>Maximum:</strong> 2000 words</p>
                    <p><strong>Current:</strong> {wordCount} words</p>
                </div>

                <div className="mb-4">
                    <h3 className="text-md font-medium pb-1">Formatting Tips</h3>
                    <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                        <li>Use headers to organize content</li>
                        <li>Include relevant images</li>
                        <li>Keep paragraphs concise</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="text-md font-medium pb-1">Content Guidelines</h3>
                    <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                        <li>Original content only</li>
                        <li>Cite all sources</li>
                        <li>Avoid plagiarism</li>
                        <li>Technical accuracy</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-md font-medium pb-1">Preview</h3>
                    <div className="border p-3 rounded">
                        <h4 className="text-md font-semibold pb-2">Blog Preview</h4>
                        <p className="text-sm text-gray-600 max-h-71 overflow-y-auto">{blog.markdown.length === 0 ? 'Your blog preview will appear here as you type.':<Markdown components={MarkdownConfig}>{blog.markdown}</Markdown>}</p>
                    </div>
                </div>
            </div>
        </section> : <div className="min-h-screen"></div>
    );
};

export default UpdateBlog;