import React from 'react';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants';
import { useUser } from '../../hooks/useUser';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from'react-router-dom';
import { categories } from '../../data/categories';

const UpdateNews = () => {

    
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const { user, getUser } = useUser();
    const navigate = useNavigate()

    const [tags, setTags] = useState([]);
    const [newsCategory, setNewsCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tagInput, setTagInput] = useState('');
    const [imagePreview, setImagePreview] = useState('');


    const [news, setNews] = useState({
        title: "",
        author: "",
        markdown: "",
        publicationDate: "",
        newsImage: "",
        category: ""
    })

    const getSingleNews = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/news/${id}`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();
            

            if (!response.ok) {
                setLoading(false);
                return      
            }
            setNews({
                title: data.news.title,
                author: data.news.author,
                markdown: data.news.markdown,
                newsImage: data.news.newsImage,
                publicationDate: data.news.publicationDate,
                category: data.news.category
            })
            setTagInput(data.news.tags)
            setTags(data.news.tags)
            handleAddTag()
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id',id)
        formData.append("title", news.title);
        formData.append("author", news.author);
        formData.append("markdown", news.markdown);
        formData.append("publicationDate", news.publicationDate);
        formData.append("newsImage", news.newsImage);
        formData.append("tags", tags);
        formData.append("category", news.category?.trim());

        try {
            const response = await fetch(`${BASE_URL}/news/update-news`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                return
            }
            toast.success("News updated successfully!");
            e.target.reset();
            setTags([]);
            setTagInput('');
            setImagePreview('');
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        } catch (error) {
            console.log(error);
        }
    };



    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNews({ ...news, newsImage: e.target.files[0] });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const getNewsCategory = async () => {
        // setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/category/general`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();
            
            if (!response.ok) {
                // setLoading(false);
                return
            }
            setNewsCategory(data.categories)
            // setLoading(false);

        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    }



    useEffect(() => {
        getUser()
        getNewsCategory()
        getSingleNews(id)
    }, []);

    if(loading){
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        user?.role === "admin" ? <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#045C99]   -600 mb-2">Update News</h1>
                <p className="text-center text-gray-600 mb-10">Update news articles to our platform. Please fill in all required information carefully.</p>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">News Information</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* News Title */}
                        
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">News Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter news title"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={news.title}
                                onChange={(e) => setNews({ ...news, title: e.target.value })}
                            />
                        </div>

                        {/* Author Name */}
                        <div>
                            <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author Name</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                placeholder="Enter author name"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={news.author}
                                onChange={(e) => setNews({ ...news, author: e.target.value })}
                            />
                        </div>

                        {/* Publication Date */}
                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Publication Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setNews({ ...news, publicationDate: e.target.value })}
                            />
                        </div>

                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={news.category}
                                onChange={(e) => setNews({ ...news, category: e.target.value })}
                            >
                                <option value="Select a category">Select a category</option>
                                {categories?.map((category) => (
                                    <option key={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                        {/* News Description */}
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">News Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                placeholder="Enter a detailed description of the news article..."
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={news.markdown}
                                onChange={(e) => setNews({ ...news, markdown: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Tags</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Add a tag (e.g., Technology, Workshop)"
                                    className="flex-1 px-4 py-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                />
                                <button
                                    type="button"
                                    className="px-4 py-3 bg-[#045C99]    text-white rounded-r-md hover:bg-blue-700"
                                    onClick={handleAddTag}
                                >
                                    Add
                                </button>
                            </div>

                            {/* Tags Display */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-100 text-[#045C99]   -700 px-3 py-1 rounded-full flex items-center"
                                    >
                                        <span>{tag}</span>
                                        <button
                                            type="button"
                                            className="ml-2 text-[#045C99]   -700 hover:text-[#045C99]   -900 focus:outline-none"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                {tags.length === 0 && (
                                    <p className="text-gray-500 text-sm">No tags added yet. Add relevant tags to categorize your news.</p>
                                )}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Featured Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-[#045C99]   -700
                                hover:file:bg-blue-100"
                                onChange={handleImageChange}
                            />

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full max-h-64 object-contain border rounded-md"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#045C99]  text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                Update News Article
                            </button>
                        </div>
                    </form>
                </div>

                {/* Additional Information */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-[#045C99]   -800 mb-2">Submission Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Ensure your news article is relevant to IEEE CS LU SB Chapter activities or technology trends</li>
                        <li>Provide accurate and complete information</li>
                        <li>Upload a high-quality image that relates to your news article</li>
                        <li>Add relevant tags to improve searchability</li>
                        <li>All submissions will be reviewed before publication</li>
                    </ul>
                </div>
            </div>
        </div> : <div className="min-h-screen"></div>
    );
};

export default UpdateNews;