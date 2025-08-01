import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaImage, FaUpload } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from'react-router-dom';

const UpdateGallery = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const { getUser,user,loading } = useUser();
    const navigate = useNavigate()

    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagefile, setimagefile] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setimagefile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setIsSubmitting(true);
        const formData = new FormData()
        formData.append('id', id)
        formData.append('caption', caption)
        formData.append('image', imagefile)

        try {
            const response = await fetch(`${BASE_URL}/gallery/update-gallery`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            const data = await response.json()
            if (!response.ok) {
                toast.error("Failed to update gallery");
                return
            }
            toast.success("Gallery updated successfully!");
            setIsSubmitting(false);
            e.target.reset();
            setImagePreview(null);
            setCaption('');
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        } catch (error) {
            console.log(error)
            toast.error("Failed to update gallery");
        }

    }

    useEffect(()=>{
        getUser()
        
    },[])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }

    return (
        user?.role === 'admin' ? <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#045C99] mb-2">Update Gallery</h1>
                <p className="text-center text-gray-600 mb-10">Upload an image with a caption for the IEEE CS LU SB Chapter gallery</p>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Image Upload */}
                        <div className="mb-8">
                            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                                <div className="flex items-center gap-2">
                                    <FaImage /> Select Image*
                                </div>
                            </label>

                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        required
                                    />
                                    <label htmlFor="image" className="cursor-pointer">
                                        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
                                        <p className="text-xs text-gray-500">(JPG, PNG, WEBP up to 5MB)</p>
                                    </label>
                                </div>
                            ) : (
                                <div className="mt-4 relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-contain border rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImagePreview(null)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Caption */}
                        <div className="mb-6">
                            <label htmlFor="caption" className="block text-gray-700 font-medium mb-2">Caption*</label>
                            <input
                                type="text"
                                id="caption"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Enter a caption for this image"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">Brief description of the image (max 100 characters)</p>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting || !imagePreview}
                                className={`w-full py-3 px-4 rounded-md font-medium text-white ${isSubmitting || !imagePreview
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#045C99] hover:bg-blue-700 transition'
                                    }`}
                            >
                                {isSubmitting ? 'Adding to Gallery...' : 'Update Gallery'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Guidelines */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-[#045C99] mb-2">Image Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Upload high-quality, relevant images related to IEEE events and activities</li>
                        <li>Ensure images are clear and well-composed</li>
                        <li>Provide descriptive captions that explain the context of the image</li>
                        <li>Make sure you have permission to use and publish the images</li>
                        <li>Avoid uploading copyrighted materials without proper authorization</li>
                    </ul>
                </div>
            </div>
        </div> : <div className="min-h-screen"></div>
    );
};

export default UpdateGallery;