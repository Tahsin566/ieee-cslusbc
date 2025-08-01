import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaLink, FaImage } from 'react-icons/fa';
import { BASE_URL } from '../../constants';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
    
    const {getUser,user,loading} = useUser();
    const navigate = useNavigate();
    
    const [imagePreview, setImagePreview] = useState(null);
    const [eventType, setEventType] = useState('Technical');
    const [featured, setFeatured] = useState(false);
    const [eventStatus, setEventStatus] = useState('Upcoming');


    const [eventData,setEventData] = useState({
        name: '',
        description: '',
        image: '',
        startdate: '',
        time: '',
        location: '',
        isFeatured: false,
        status: 'Upcoming',
        type: 'Technical',
        registrationLink: ''
    })

    const eventTypes = ['Technical', 'Workshop', 'Social', 'Meeting','Webinar'];
    const eventStatuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!(eventData.name && eventData.description && eventData.image && eventData.time && eventData.location && eventType && eventStatus)){
            toast.error("Please fill all the fields");
            return
        }

        const formData = new FormData();
        formData.append("name",eventData.name);
        formData.append("description",eventData.description);
        formData.append("image",eventData.image);
        formData.append("startdate",eventData.startdate);
        formData.append("time",eventData.time);
        formData.append("location",eventData.location);
        formData.append("isFeatured",featured);
        formData.append("status",eventStatus.toLowerCase());
        formData.append("type",eventType.toLowerCase());
        formData.append("registrationLink",eventData.registrationLink);

        try {
            const response = await fetch(`${BASE_URL}/event/add-event`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            if (!response.ok) {
                toast.error("Failed to add event");
                return
            }
            toast.success("Event added successfully!");
            e.target.reset();
            setImagePreview(null);
            setEventType('Technical');
            setFeatured(false);
            setEventStatus('Upcoming');
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        } catch (error) {
            toast.error("Failed to add event"+error.message);
        }

        setImagePreview(null);
        setEventType('Technical');
        setFeatured(false);
        setEventStatus('Upcoming');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEventData({ ...eventData, image: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(()=>{
        getUser()
    },[])

    if(loading){
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
    }

    return (
        user?.role === "admin" ? <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#045C99] mb-2">Add Event</h1>
                <p className="text-center text-gray-600 mb-10">Create a new event for IEEE CS LU SB Chapter members and participants. Please fill in all required information.</p>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Event Information</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Event Name */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Event Name*</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter event name"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={eventData.name}
                                onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                            />
                        </div>

                        {/* Event Description */}
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Event Description*</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="6"
                                placeholder="Enter a detailed description of the event..."
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={eventData.description}
                                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Event Image */}
                        <div>
                            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                                <div className="flex items-center gap-2">
                                    <FaImage /> Event Image*
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

                        {/* Event Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt /> Start Date*
                                    </div>
                                </label>
                                <input
                                    type="date"
                                    id="startdate"
                                    name="startdate"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={eventData.startdate}
                                    onChange={(e) => setEventData({ ...eventData, startdate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block text-gray-700 font-medium mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaClock /> Start Time*
                                    </div>
                                </label>
                                <input
                                    type="time"
                                    id="startTime"
                                    name="startTime"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={eventData.time}
                                    onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Event Location */}
                        <div>
                            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt /> Location*
                                </div>
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter event location (e.g., Auditorium, Online, etc.)"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={eventData.location}
                                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label htmlFor="eventType" className="block text-gray-700 font-medium mb-2">Event Type*</label>
                            <select
                                id="eventType"
                                name="eventType"
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Event Status */}
                        <div>
                            <label htmlFor="eventStatus" className="block text-gray-700 font-medium mb-2">Event Status*</label>
                            <select
                                id="eventStatus"
                                name="eventStatus"
                                value={eventStatus}
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                onChange={(e) => setEventStatus(e.target.value)}
                            >
                                {eventStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        {/* Featured Event */}
                        <div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={featured}
                                    onChange={() => setFeatured(!featured)}
                                    className="w-5 h-5 text-[#045C99] focus:ring-blue-500"
                                    value={featured}
                                />
                                <label htmlFor="featured" className="ml-2 block text-gray-700 font-medium">
                                    Featured Event (Will be displayed prominently)
                                </label>
                            </div>
                        </div>

                        {/* Registration Link */}
                        <div>
                            <label htmlFor="registrationLink" className="block text-gray-700 font-medium mb-2">
                                <div className="flex items-center gap-2">
                                    <FaLink /> Registration Link
                                </div>
                            </label>
                            <input
                                type="url"
                                id="registrationLink"
                                name="registrationLink"
                                placeholder="https://registration-link.com"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={eventData.registrationLink}
                                onChange={(e) => setEventData({ ...eventData, registrationLink: e.target.value })}
                            />
                            <p className="text-sm text-gray-500 mt-1">Leave empty if registration is not required</p>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#045C99] text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                Create Event
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
                        <li>Upload a high-quality image (recommended size: 1200×628 pixels)</li>
                        <li>Double-check the event date, time, and location</li>
                        <li>Mark as "Featured" only for major IEEE CS LU SB Chapter events</li>
                        <li>Add a registration link if attendance tracking is required</li>
                        <li>All events must adhere to IEEE CS LU SB Chapter standards and policies</li>
                    </ul>
                </div>
            </div>
        </div> : <div className="min-h-screen"></div>
    );
};

export default AddEvent;