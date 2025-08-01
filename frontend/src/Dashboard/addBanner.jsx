import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import {useUser} from '../../hooks/useUser'
import { useNavigate } from "react-router-dom";

export default function AddBanner() {

    const {user,getUser,loading} = useUser()

    const navigate = useNavigate()
    
    const [imagePreview, setImagePreview] = useState(null);

    const eventTypes = ['Research', 'Achievement', 'Blog', 'Event','Magazine','News','Gallery']
    
    const [banner, setBanner] = useState({
        name: '',
        description: '',
        type:'Event',
        image: '',
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBanner({ ...banner, image: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', banner.name);
        formData.append('description', banner.description);
        formData.append('type', banner.type);
        formData.append('image', banner.image);

        try {
            const response = await fetch(`${BASE_URL}/banner/add-banner`,{
                credentials:"include",
                method:"POST",
                body:formData
            })
            const data = await response.json();
            if(!data.success){
                toast.error(data.message)
                return
            }
            toast.success(data.message)
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);

        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        
        getUser()
        
    }, [])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }
    
  return (
    user?.role === "admin" ? <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#045C99] mb-2">Add Banner</h1>
                <p className="text-center text-gray-600 mb-10">Create a new banner for IEEE CS LU SB Chapter members and participants.</p>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Banner Information</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Event Name */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Banner Title*</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter banner title"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={banner.name}
                                onChange={(e) => setBanner({ ...banner, name: e.target.value })}
                            />
                        </div>

                        {/* Event Description */}
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Banner Description*</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                placeholder="Enter a detailed description of the banner..."
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={banner.description}
                                onChange={(e) => setBanner({ ...banner, description: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Event Image */}
                        <div>
                            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                                <div className="flex items-center gap-2">
                                    <FaImage /> Banner Image*
                                </div>
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-[#045C99]
                                hover:file:bg-blue-100"
                                onChange={handleImageChange}
                                required
                            />

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                    <img
                                        src={imagePreview}
                                        alt="Event Preview"
                                        className="w-full max-h-64 object-contain border rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                        {/* Event Type */}
                        <div>
                            <label htmlFor="eventType" className="block text-gray-700 font-medium mb-2">
                                Type*</label>
                            <select
                                id="eventType"
                                name="eventType"
                                value={banner.type}
                                onChange={(e) => setBanner({...banner, type: e.target.value})}
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                {eventTypes?.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                            disabled={loading}
                                type="submit"
                                className="w-full bg-[#045C99] text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                {loading ? 'Adding...' : 'Add Banner'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Event Guidelines */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-[#045C99] mb-2">Event Creation Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Provide a clear and descriptive name for your event</li>
                        <li>Include all relevant details in the description (agenda, speakers, etc.)</li>
                        <li>Upload a high-quality banner image (recommended size: 1200×628 pixels)</li>
                        <li>Double-check the event date, time, and location</li>
                        <li>All events must adhere to IEEE CS LU SB Chapter standards and policies</li>
                    </ul>
                </div>
            </div>
        </div>:<div className="min-h-screen"></div>
  );
}