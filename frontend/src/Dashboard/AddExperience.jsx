import React, { useState, useEffect } from 'react';
import { FaIdCard, FaCheck } from 'react-icons/fa';
import { FaCalendar, FaCalendarCheck, FaFacebook, FaLinkedin, FaUser } from 'react-icons/fa6';
import { RiUserStarLine } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
import { data, Link, useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { useUser } from '../../hooks/useUser';
import { toast, ToastContainer } from 'react-toastify';

const AddExperience = () => {

    const navigate = useNavigate()
    
    const [ieeeId, setIeeeId] = useState('');
    const [name,setName] = useState('');
    const [experienceTitle, setExperienceTitle] = useState('');
    const [experienceDescription, setExperienceDescription] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const location = useLocation();

    const {user,getUser,loading} = useUser()


    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        // Get IEEE ID from URL query parameters if available
        const queryParams = new URLSearchParams(location.search);
        const idFromUrl = queryParams.get('id');
        if (idFromUrl) {
            setIeeeId(idFromUrl);
        }
    }, [location]);

    const handleSubmit = async(e) => {

        e.preventDefault();
       
        try {
            const response = await fetch(`${BASE_URL}/experience-achievement/experience`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name:name,
                    IEEEID:ieeeId,
                    title: experienceTitle,
                    description: experienceDescription,
                    facebook: facebook,
                    linkedin: linkedin,
                    startDate: startDate,
                    endDate: endDate
                })
            })
            const data = await response.json();
            console.log(data)
            if(!data?.success){
                toast.error(data?.message)
                return
            }
            toast.success(data?.message)
            setIsSubmitted(true);
            setExperienceTitle('');
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);

        } catch (error) {
            console.error('Error:', error);
            toast.error(error?.message)

        }
        console.log(experienceTitle)

        // Reset form after 3 seconds
        setTimeout(() => {
            setName('');
            setIeeeId('');
            setExperienceTitle('');
            setExperienceDescription('');  
            setFacebook('');
            setLinkedin('') 
            setIsSubmitted(false);
            navigate('/dashboard')
            
        }, 1000);
    };

    const memberType = [
        'Chairperson',
        'Vice Chairperson',
        'Secretary',
        'Treasurer',
        'ACM Coordinator',
        'Webmaster',
        'Program Coordinator',
        'Publicity Coordinator',
        'Photography and Video Content Executive',
        'Publications & Newsletter Coordinator',
        'Membership Development Coordinator',
        'Logistic Executive',
        'Graphics Design Executive',
        'Chief Reporting Executive',
        'Volunteer'

    ]

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }
    return (
        user?.role === "admin" ? <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Add Experience</h1>
                    <p className="mt-2 text-gray-600">
                        Record IEEE member experiences, achievements, and contributions
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="rounded-full bg-green-100 p-3 mb-4">
                                <FaCheck className="text-green-600 text-3xl" />
                            </div>
                            <h2 className="text-2xl font-medium text-gray-800 mb-2">Experience Added Successfully!</h2>
                            <p className="text-gray-600">The member experience has been recorded.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* IEEE ID Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="ieeeId"
                                        name="ieeeId"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-3"
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter the name of the member
                                </p>
                            </div>
                            <div>
                                <label htmlFor="ieeeId" className="block text-sm font-medium text-gray-700 mb-1">
                                    IEEE ID*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaIdCard className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="ieeeId"
                                        name="ieeeId"
                                        type="text"
                                        value={ieeeId}
                                        onChange={(e) => setIeeeId(e.target.value)}
                                        required
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-3"
                                        placeholder="Enter 8-digit IEEE ID"
                                        // pattern="[0-9]{8}"
                                        title="IEEE ID should be an 8-digit number"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter the 8-digit numeric IEEE ID of the member
                                </p>
                            </div>

                            <div>
                                <label htmlFor="experienceTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                    Experience title
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <RiUserStarLine className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="category"
                                        name="category"
                                        value={experienceTitle}
                                        onChange={(e)=>{setExperienceTitle(e.target.value)}}
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                        required
                                    >
                                        <option value="">Select Member category</option>
                                        {memberType.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter the title of the experience
                                </p>
                            </div>
                            

                            {/* Experience Textarea */}
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                                    Member Experience*
                                </label>
                                <textarea
                                    id="experience"
                                    name="experience"
                                    rows={3}
                                    value={experienceDescription}
                                    onChange={(e) => setExperienceDescription(e.target.value)}
                                    required
                                    className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md p-3"
                                    placeholder="Describe the member's experience, contributions, achievements, or participation in IEEE activities..."
                                ></textarea>
                                <p className="mt-1 text-xs text-gray-500">
                                    Include details such as events attended, leadership roles, publications, contributions, awards, etc.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaFacebook className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="facebook"
                                        name="facebook"
                                        type="text"
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-3"
                                        placeholder="Enter facebook link"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter facebook link
                                </p>
                            </div>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    LinkedIn
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLinkedin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="linkedin"
                                        name="linkedin"
                                        type="text"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-3"
                                        placeholder="Enter LinkedIn link"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter Linkedin link
                                </p>
                            </div>

                            <div>
                                <label htmlFor="Startdate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="startdate"
                                        name="startdate"
                                        type="date"
                                        
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-3"
                                        title="Start Date"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter the start date
                                </p>
                            </div>

                            <div>
                                <label htmlFor="enddate" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="enddate"
                                        name="enddate"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder={new Date().toISOString().split('T')[0]}
                                        className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-3"
                                        title="IEEE ID should be an 8-digit number"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Enter the end date
                                </p>
                            </div>

                            

                            {/* Submit Button */}
                            <div className="pt-4 flex gap-2">
                                <button
                                    type="submit"
                                    className="w-full bg-[#045C99] text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                                >
                                    Save Member Experience
                                </button>
                                <Link
                                    to={'/dashboard'}
                                    type="submit"
                                    className="w-full bg-[#045C99] text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                                >
                                    Back to dashboard
                                </Link>
                            </div>
                        </form>
                    )}
                </div>

                
            </div>
        </div>: <div className="min-h-screen"></div>
    );
};

export default AddExperience;