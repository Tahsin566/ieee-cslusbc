import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaHome, FaNewspaper, FaBook, FaCalendarAlt, FaBlog, FaImages, FaUsers, FaSignOutAlt, FaBars, FaTimes, FaMapMarkerAlt, FaEnvelope, FaIdCard, FaAddressBook, FaComment, FaUserTie, FaFacebook, FaLinkedin, FaTrophy, FaChartBar, FaUserFriends, FaAward, FaIndustry, FaProjectDiagram, FaTools, FaCalendar } from 'react-icons/fa';
import { MdLogout } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { BASE_URL } from '../../constants';
import { useUser } from '../../hooks/useUser';
import { useDashboard } from '../../hooks/useDashboard';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { FaUser } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
// import { MarkdownConfig } from '../blog/Blog';
import { AiFillPicture, AiOutlinePicture } from "react-icons/ai";
import { RiLockPasswordFill } from 'react-icons/ri';
import { useGallery } from '../../hooks/useGallery';

const MarkdownConfig = {}

const Dashboard = () => {
    
    const { getUser, user } = useUser();

    const navigate = useNavigate();
    const {
        getAllUser,
        getAllNews,
        getAllResearches,
        getAllMagazines,
        getAllEvents,
        getallMessage,
        deleteAchievement,
        deleteMessage,
        deleteMagazine,
        deleteEvent,
        deleteResearch,
        deleteNews,
        getAchievement,
        getAllBanner,
        handleApprovePaper,
        handleApproveBlog,
        deleteBanner,
        achievements,
        news,
        messages,
        getAllBlogs,
        deleteBlog,
        allUser,
        blogs,
        banner,
        magazines,
        events,
        researches,
        loading
    } = useDashboard()

    const {deleteGallery,gallery,getAllGalleryPhoto} = useGallery()

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('home');


    const [committeeformData, setCommitteeFormData] = useState({
        name: '',
        designation: '',
        image: '',
        id: '',
        type: '',
        facebookLink: '',
        linkedinLink: ''
    })

    const [IEEEabout, setIEEEabout] = useState({
        ActiveMember: 0,
        NumberofEvents: 0,
        numofProjectCompleted: 0,
        numofIndustryCollaboration: 0,
        numofWorkshop: 0,
        awardsWon: 0,
        image: ''

    })


    // Mock users data
    // const users = [
    //     {
    //         id: 1,
    //         name: "Dr. Ahmed Khan",
    //         email: "ahmed.khan@ieee.org",
    //         ieeeId: "95782364",
    //         image: "/img/Lukman Hossain.jpg",
    //         role: "Senior Member",
    //         department: "Electrical Engineering",
    //         joinDate: "June 15, 2022"
    //     },
    //     {
    //         id: 2,
    //         name: "Sarah Thompson",
    //         email: "sarah.t@ieee.org",
    //         ieeeId: "86451279",
    //         image: "/img/sourav.jpg",
    //         role: "Member",
    //         department: "Computer Science",
    //         joinDate: "August 3, 2023"
    //     },
    //     {
    //         id: 3,
    //         name: "Rahul Mehta",
    //         email: "r.mehta@ieee.org",
    //         ieeeId: "78945612",
    //         image: "/img/pulok.jpg",
    //         role: "Student Member",
    //         department: "Electronics",
    //         joinDate: "January 22, 2024"
    //     },
    //     {
    //         id: 4,
    //         name: "Jessica Chen",
    //         email: "j.chen@ieee.org",
    //         ieeeId: "36974125",
    //         image: "/img/Tahsin.jpg",
    //         role: "Graduate Student",
    //         department: "Telecommunications",
    //         joinDate: "March 8, 2024"
    //     },
    //     {
    //         id: 5,
    //         name: "Michael Lee",
    //         email: "m.lee@ieee.org",
    //         ieeeId: "45612378",
    //         image: "/img/tahmid.jpg",
    //         role: "Associate Member",
    //         department: "Robotics",
    //         joinDate: "November 14, 2023"
    //     },
    //     {
    //         id: 6,
    //         name: "Badar Hossain",
    //         email: "p.sharma@ieee.org",
    //         ieeeId: "12789456",
    //         image: "/img/Badar.jpg",
    //         role: "Student Member",
    //         department: "Mechanical Engineering",
    //         joinDate: "February 19, 2024"
    //     }
    // ];    // Mock contacts data
    // const contacts = [
    //     {
    //         id: 1,
    //         name: "Dr. Ahmed Khan",
    //         email: "ahmed.khan@ieee.org",
    //         position: "Branch Chair",
    //         image: "/img/Lukman Hossain.jpg",
    //         department: "Electrical Engineering"
    //     },
    //     {
    //         id: 2,
    //         name: "Sarah Thompson",
    //         email: "sarah.t@ieee.org",
    //         position: "Vice Chair",
    //         image: "/img/sourav.jpg",
    //         department: "Computer Science"
    //     },
    //     {
    //         id: 3,
    //         name: "Rahul Mehta",
    //         email: "r.mehta@ieee.org",
    //         position: "Secretary",
    //         image: "/img/pulok.jpg",
    //         department: "Electronics"
    //     },
    //     {
    //         id: 4,
    //         name: "Jessica Chen",
    //         email: "j.chen@ieee.org",
    //         position: "Treasurer",
    //         image: "/img/Tahsin.jpg",
    //         department: "Telecommunications"
    //     },
    //     {
    //         id: 5,
    //         name: "Michael Lee",
    //         email: "m.lee@ieee.org",
    //         position: "Event Coordinator",
    //         image: "/img/tahmid.jpg",
    //         department: "Robotics"
    //     },
    //     {
    //         id: 6,
    //         name: "Badar Hossain",
    //         email: "b.hossain@ieee.org",
    //         position: "Membership Lead",
    //         image: "/img/Badar.jpg",
    //         department: "Mechanical Engineering"
    //     }
    // ];

    const stats = [
        { id: 1, title: 'Total Research Papers', count: researches.length, icon: <FaBook /> },
        { id: 2, title: 'Published Magazines', count: magazines.length, icon: <FaNewspaper /> },
        { id: 3, title: 'Events', count: events.length, icon: <FaCalendarAlt /> },
        { id: 4, title: 'Blogs', count: blogs.length, icon: <FaBlog /> },
    ];

    // Mock achievements data
    // const achievementsf = [
    //     {
    //         id: 1,
    //         title: "IEEE Outstanding Branch Counselor Award",
    //         description: "Recognizes IEEE Student Branch Counselors who have demonstrated exemplary involvement with their Student Branch.",
    //         category: "Branch Awards",
    //         year: 2023
    //     },
    //     {
    //         id: 2,
    //         title: "IEEE Regional Exemplary Student Branch Award",
    //         description: "Recognizes Student Branches for their outstanding activities, membership growth, and technical programs.",
    //         category: "Branch Awards",
    //         year: 2023
    //     },
    //     {
    //         id: 3,
    //         title: "IEEE WIE Student Branch Affinity Group of the Year",
    //         description: "Honors exceptional Women in Engineering Student Branch Affinity Groups for their contributions.",
    //         category: "Special Recognition",
    //         year: 2023
    //     },
    //     {
    //         id: 4,
    //         title: "IEEE Student Paper Contest Winner",
    //         description: "Awarded to students with exceptional research papers presented at IEEE conferences.",
    //         category: "Individual Awards",
    //         year: 2023
    //     },
    //     {
    //         id: 5,
    //         title: "IEEE Richard E. Merwin Student Scholarship",
    //         description: "Recognizes student leaders who show promise in their academic careers.",
    //         category: "Scholarships",
    //         year: 2022
    //     },
    //     {
    //         id: 6,
    //         title: "IEEE Computer Society Upsilon Pi Epsilon Award",
    //         description: "Honors academic excellence for students in computer science related fields.",
    //         category: "Academic Excellence",
    //         year: 2022
    //     }
    // ];


    const handleLogout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/signout`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();

            if (!response.ok) {
                return
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', committeeformData.name)
        formData.append('designation', committeeformData.designation)
        formData.append('facebookLink', committeeformData.facebookLink)
        formData.append('linkedinLink', committeeformData.linkedinLink)
        formData.append('type', committeeformData.type)
        formData.append('image', committeeformData.image)
        formData.append('id', committeeformData.id)


        try {
            const response = await fetch(`${BASE_URL}/committee/add-committee`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await response.json();
            if (!data.success) {
                return
            }
            toast.success('Added successfully')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitAbout = async (e) => {


        e.preventDefault()

        const formData = new FormData()
        formData.append('ActiveMember', IEEEabout.ActiveMember)
        formData.append('NumberofEvents', IEEEabout.NumberofEvents)
        formData.append('numofProjectCompleted', IEEEabout.numofProjectCompleted)
        formData.append('numofIndustryCollaboration', IEEEabout.numofIndustryCollaboration)
        formData.append('numofWorkshop', IEEEabout.numofWorkshop)
        formData.append('awardsWon', IEEEabout.awardsWon)
        formData.append('image', IEEEabout.image)


        try {
            const response = await fetch(`${BASE_URL}/ieee`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            const data = await response.json();
            if (!data.success) {
                toast.error(data?.message)
                return
            }
            toast.success('Added successfully')
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUser()
        getAllUser();
        getallMessage();
        getAllBlogs();
        getAllMagazines();
        getAllEvents();
        getAllResearches();
        getAllNews();
        getAllBanner();
        getAllGalleryPhoto()
        getAchievement()
    }, [])

    

    // if (loading) {
    //     return <div className="flex items-center justify-center h-screen">
    //         <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-gray-900"></div>
    //     </div>
    // }


    return (
        user?.role === "admin" || true ? <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <ToastContainer />
            <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#045C99] text-white transition-all duration-300 ease-in-out flex flex-col h-screen`}>
                {/* Logo and Brand */}
                <div className="flex items-center justify-center py-3 border-b border-blue-700/50">
                    <img
                        src="https://i.ibb.co/Kxt1VLrP/ieeelogo.png"
                        alt="IEEE Logo"
                        className={`${isSidebarOpen ? 'w-32' : 'w-12'} transition-all duration-300`}
                    />
                </div>

                {/* Navigation Links - Made Scrollable */}
                <nav className="flex-1 overflow-y-auto py-3 px-3">
                    <ul className="space-y-1.5">
                        <li>
                            <button
                                onClick={() => setActiveSection('home')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'home' ? 'bg-blue-700' : ''}`}
                            >
                                <FaHome className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Dashboard Home</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('research')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'research' ? 'bg-blue-700' : ''}`}
                            >
                                <FaBook className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Research Papers</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('magazine')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'magazine' ? 'bg-blue-700' : ''}`}
                            >
                                <FaNewspaper className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Magazines</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('event')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'event' ? 'bg-blue-700' : ''}`}
                            >
                                <FaCalendarAlt className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Events</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('banner')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'event' ? 'bg-blue-700' : ''}`}
                            >
                                <AiFillPicture className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Banners</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('blog')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'blog' ? 'bg-blue-700' : ''}`}
                            >
                                <FaBlog className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Blogs</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('news')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'news' ? 'bg-blue-700' : ''}`}
                            >
                                <FaNewspaper className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">News</span>}
                            </button>
                        </li>                       
                         <li>
                            <button
                                onClick={() => setActiveSection('gallery')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'gallery' ? 'bg-blue-700' : ''}`}
                            >
                                <FaImages className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Gallery</span>}
                            </button>
                        </li>                        
                        <li>
                            <button
                                onClick={() => setActiveSection('users')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'users' ? 'bg-blue-700' : ''}`}
                            >
                                <FaUsers className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Users</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('contacts')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'contacts' ? 'bg-blue-700' : ''}`}
                            >
                                <FaAddressBook className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Contacts</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('committee')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'committee' ? 'bg-blue-700' : ''}`}
                            >
                                <FaUserTie className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Committee</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('achievements')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'achievements' ? 'bg-blue-700' : ''}`}
                            >
                                <FaTrophy className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Achievements</span>}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('statistics')}
                                className={`flex items-center w-full p-3 rounded-lg hover:bg-blue-700 transition duration-200 ${activeSection === 'statistics' ? 'bg-blue-700' : ''}`}
                            >
                                <FaChartBar className="text-xl" />
                                {isSidebarOpen && <span className="ml-4">Statistics</span>}
                            </button>
                        </li>

                    </ul>

                </nav>


                {/* Fixed Logout Button */}
                {/* <div className="py-2 px-3 border-t border-blue-700/50 flex h-16 items-center flex-wrap"> */}
                <div className={`${isSidebarOpen ? 'justify-between' : 'justify-center'} flex flex-wrap p-2`}>

                    <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-red-700 transition duration-200">
                        <MdLogout className="text-xl" />
                        {isSidebarOpen && <span className="ml-3">Logout</span>}
                    </button>
                    <div>

                        <button onClick={() => navigate('/')} className="flex items-center p-3 rounded-lg hover:bg-red-700 transition duration-200">
                            <IoExit className="text-xl" />
                            {isSidebarOpen && <span className="ml-3">Exit</span>}
                        </button>
                    </div>
                    {/* </div> */}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
                            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>

                        <div className="flex items-center space-x-4">


                            <div className="flex items-center">
                                <img
                                    src="/img/user.png"
                                    alt="Admin User"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <span className="ml-2 font-medium text-gray-700">Admin User</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
                    {activeSection === 'home' && (
                        <>
                            <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
                            <p className="text-gray-600 mt-1">Welcome to your IEEE Computer Society LU SB Chapter admin dashboard</p>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                                {stats.map(stat => (
                                    <div key={stat.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                                        <div className="p-3 rounded-full bg-blue-100 text-[#045C99]">
                                            {stat.icon}
                                        </div>
                                        <div className="ml-4">
                                            <h2 className="text-gray-600 text-sm">{stat.title}</h2>
                                            <p className="text-2xl font-semibold text-gray-800">{stat.count}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-8">
                                <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <Link to="/addEvent" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                                        <div className="flex items-center text-[#045C99]">
                                            <FaCalendarAlt className="text-xl" />
                                            <span className="ml-2 font-medium">Add New Event</span>
                                        </div>
                                    </Link>
                                    <Link to="/addNews" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                                        <div className="flex items-center text-[#045C99]">
                                            <FaNewspaper className="text-xl" />
                                            <span className="ml-2 font-medium">Add News Article</span>
                                        </div>
                                    </Link>
                                    <Link to="/addMegazine" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                                        <div className="flex items-center text-[#045C99]">
                                            <FaBook className="text-xl" />
                                            <span className="ml-2 font-medium">Upload Magazine</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Recent Activities */}

                        </>
                    )}

                    {activeSection === 'research' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Research Papers Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage all IEEE CS LU SB Chapter research papers here</p>

                            <div className="flex justify-between items-center mb-6">

                                <Link to="/addResearch" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add New Paper
                                </Link>
                            </div>
                            {/* Research Papers Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Sample Research Paper Card 1 */}
                                {researches.length > 0 ? researches.map((research, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate"><a href={`paper/${research._id}`}>{research.title}</a></h3>
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{research.category}</span>
                                                <span className="mx-2">•</span>
                                                <span>{new Date(research.publicationDate).toDateString()}</span>
                                            </div>
                                            <div className="text-sm text-gray-600 mb-3 line-clamp-3">
                                                <p>{research.abstract}</p>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                {/* <FaBook className="mr-1" /> <span className="mr-3">Citations: 23</span> */}

                                                <span className="mr-3"></span>
                                                <span>Author: {research.author}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <Link to={`/updateResearch?id=${research._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                    Update
                                                </Link>
                                                <button onClick={() => handleApprovePaper(research._id)} className=" px-3 py-1 rounded border border-red-200 hover:bg-green-100 transition">
                                                    {research.isApproved === true ? 'Approved' : 'Approve'}
                                                </button>
                                                <button onClick={() => deleteResearch(research._id)} className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200 hover:bg-red-100 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p>No research papers found</p>}

                            </div>


                        </div>
                    )}

                    {activeSection === 'magazine' && (

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Magazine Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter magazines here</p>

                            <div className="flex justify-between items-center mb-6">

                                <Link to="/addMegazine" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add New Magazine
                                </Link>
                            </div>
                            {/* Magazines Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Sample Magazine Card 1 */}

                                {magazines.length > 0 ? magazines.map((magazine, index) => {
                                    return <div>

                                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                            <img
                                                src={`${(magazine.magazineImage)}`}
                                                alt="IEEE Magazine Cover"
                                                className="w-full"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2"><a href={`megazine/${magazine._id}`}>{magazine.title}</a></h3>
                                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Latest Issue</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Vol. {magazine.volumeNumber}, Issue {magazine.issueNumber}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-3">
                                                    <p className="line-clamp-3">{magazine.description}</p>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                                    <span>{magazine.category}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{new Date(magazine.publicationDate).toDateString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <Link to={`/updateMegazine?id=${magazine._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                        Update
                                                    </Link>
                                                    <button onClick={() => deleteMagazine(magazine._id)} className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200 hover:bg-red-100 transition">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                                    :
                                    <p>No magazines found</p>}

                            </div>


                        </div>
                    )}

                    {activeSection === 'event' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Event Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter events here</p>

                            <div className="flex items-center mb-6 gap-2 flex-wrap">

                                <Link to="/addEvent" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add New Event
                                </Link>

                            </div>
                            {/* Events Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Upcoming Event Card */}
                                {events.length > 0 ? events.map((event, index) => {
                                    return <div key={index}>
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative">

                                            <div>
                                                <img src={`${event?.image}`} className='w-full object-fit h-70' />
                                            </div>
                                            <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                                                {event.isFeatured === true ? 'Featured' : "Latest"}
                                            </div>
                                            <div className="absolute bottom-2 left-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                                                {event.status}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h3>
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <FaCalendarAlt className="mr-1" />
                                                <span>{new Date(event.startdate).toDateString()}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 mb-3">
                                                <FaMapMarkerAlt className="mr-1" />
                                                <span className="line-clamp-1">{event.location}</span>
                                            </div>
                                            <div>{parseInt(event?.time?.split(":")[0]) > 12 ? parseInt(event?.time?.split(":")[0]) - 12 + ":" + event?.time.split(":")[1] : event?.time} {parseInt(event?.time?.split(":")[0]) > 12 ? 'PM' : 'AM'}</div>
                                            <div className="text-sm text-gray-600 mb-3 line-clamp-1">
                                                <p>{event.description}</p>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{event.type}</span>
                                                <span className="mx-2">•</span>
                                                <span>Register link <a target="_blank" className="text-blue-500 hover:underline" href={event?.registrationLink}>{event?.registrationLink}</a></span>
                                            </div>
                                            <div className="flex justify-between">
                                                <Link to={`/updateEvent?id=${event._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                    Update
                                                </Link>
                                                <button onClick={() => deleteEvent(event._id)} className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200 hover:bg-red-100 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                })
                                    :
                                    <p>No events found</p>}
                            </div>

                        </div>
                    )}

                    {activeSection === 'banner' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Banner Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter Banners here</p>

                            <div className="flex items-center mb-6 gap-2 flex-wrap">
                                <Link to="/addBanner" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add Banner
                                </Link>
                            </div>
                            {/* Events Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Upcoming Event Card */}
                                {banner?.length > 0 ? banner?.map((banner, index) => {
                                    return <div key={index} className="relative group">
                                        <img
                                            src={`${banner?.image}`}
                                            alt="IEEE Conference"
                                            className="h-52 w-full object-fit rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-sm font-medium line-clamp-2">{banner?.title}</p>
                                            <div className="flex justify-end items-center mt-2">
                                                {/* <Link to={`/updateGallery?id=${gallery._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                    Update
                                                </Link> */}
                                                <button onClick={()=>deleteBanner(banner?._id)} className="bg-red-500/80 hover:bg-red-600/80 text-xs text-white px-2 py-1 rounded cursor-pointer">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                })
                                    :
                                    <p>No banner found</p>}
                            </div>

                        </div>
                    )}

                    {activeSection === 'blog' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Blog Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter blog posts here</p>

                            <div className="flex justify-between items-center mb-6">

                                <Link to="/write" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add New Blog Post
                                </Link>
                            </div>
                            {/* Blog Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Blog Post Card 1 */}

                                {blogs.length > 0 ? blogs.map((blog, index) => {
                                    return <div key={index}>
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                                            <img
                                                src={`${blog.blogImage}`}
                                                alt="Blog post thumbnail"
                                                className="w-full object-fit h-66"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2"><a href={`blogs/${blog._id}`}>{blog.title}</a></h3>
                                                <div className="flex items-center text-sm text-gray-600 mb-3">
                                                    <span>By {blog.author}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{new Date(blog.createdAt).toDateString()}</span>
                                                </div>
                                                <div className="text-sm text-gray-600 mb-3 line-clamp-3">
                                                    <Markdown
                                                        components={MarkdownConfig}

                                                    >
                                                        {blog.markdown}
                                                    </Markdown>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                                </div>
                                                <div className="flex justify-between">
                                                    <Link to={`/updateBlog?id=${blog._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                        Update
                                                    </Link>
                                                    <button onClick={() => {handleApproveBlog(blog._id)}} className=" px-3 py-1 rounded border border-green-200 hover:bg-green-100 transition">
                                                        {blog?.isApproved === true? 'Approved' : "Approve"}
                                                    </button>
                                                    <button onClick={() => deleteBlog(blog._id)} className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200 hover:bg-red-100 transition">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                                    :
                                    <p>No blogs found</p>}

                                {/* Blog Post Card 2 */}

                            </div>


                        </div>
                    )}

                    {activeSection === 'news' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">News Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter news articles here</p>

                            <div className="flex justify-between items-center mb-6">

                                <Link to="/addNews" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add New News Article
                                </Link>
                            </div>                            {/* News Items */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* News Article Card 1 */}


                                {news.length > 0 ? news.map((news, index) => {
                                    return <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200" key={index}>
                                        <img
                                            src={`${news.newsImage}`}
                                            alt="News article thumbnail"
                                            className="w-full object-fit h-[220px]"
                                        />
                                        <div className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">{news.category}</span>
                                                <span className="text-xs text-gray-500">Published {new Date(news.createdAt).toDateString()}</span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2"><a href={`news/${news._id}`}>{news.title}</a></h3>
                                            <div className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                <p>{news.markdown}</p>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <span>By {news.author}</span>
                                                {/* <span className="mx-2">•</span> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <Link to={`/updateNews?id=${news._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                    Update
                                                </Link>
                                                <button onClick={() => deleteNews(news._id)} className="bg-red-50 text-red-600 px-3 py-1 rounded border border-red-200 hover:bg-red-100 transition">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                })
                                    : <p>No news found</p>}

                            </div>


                        </div>
                    )}

                    {activeSection === 'gallery' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Gallery Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter image gallery here</p>

                            <div className="flex justify-between items-center mb-6">

                                <Link to="/addGallery" className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Upload Images
                                </Link>
                            </div>                            {/* Gallery Items */}
                            {gallery.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Gallery Image 1 */}


                                {gallery.map((gallery, index) => (
                                    <div className="relative group">
                                        <img
                                            src={`${gallery.image}`}
                                            alt="IEEE Conference"
                                            className="h-48 w-full object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-sm font-medium line-clamp-2">{gallery.caption}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <Link to={`/updateGallery?id=${gallery._id}`} className="bg-blue-50 text-[#045C99] px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 transition">
                                                    Update
                                                </Link>
                                                <button onClick={() => deleteGallery(gallery._id)} className="bg-red-500/80 hover:bg-red-600/80 text-xs text-white px-2 py-1 rounded">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div> : <p>No gallery photo found</p>}

                        </div>
                    )}

                    {activeSection === 'users' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Users Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter members and users here</p>

                            <div className="flex justify-between items-center mb-6">
                                <div className="relative">

                                </div>
                                {/* <button className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Add New User
                                </button> */}
                            </div>
                            {/* Users Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allUser?.map(user => (
                                    <div key={user.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                        <div className="p-6 flex flex-col items-center">
                                            {user?.profilePicture ? <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-100">
                                                <img
                                                    src={user.profilePicture}
                                                    alt={`${user.name}'s profile`}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            </div> : <FaUser size={55} className='h-28' />}
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">{user?.name}</h3>

                                            <div className="w-full space-y-3 mb-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FaEnvelope className="mr-2 text-gray-400" />
                                                    <span className="truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <FaIdCard className="mr-2 text-gray-400" />
                                                    <span>IEEE ID: {user.IEEEID}</span>
                                                </div>
                                                <span>Role: {user?.role?.charAt(0)?.toUpperCase()}{user?.role?.slice(1)}</span>
                                            </div>
                                            <div className="flex justify-between w-full flex-wrap gap-2">


                                                <Link
                                                    to={`/addExperience?id=${user?.IEEEID}`}
                                                    className="bg-blue-50 text-[#045C99] px-4 py-2 rounded border border-blue-200 hover:bg-blue-100 transition text-center w-50 flex items-center justify-center"
                                                >
                                                    Add New Experience
                                                </Link>
                                                

                                                <Link
                                                    to={`/user?id=${user?.IEEEID}`}
                                                    className="bg-blue-50 text-[#045C99] px-4 py-2 rounded border border-blue-200 hover:bg-blue-100 transition text-center  flex items-center justify-center"
                                                >
                                                    View Profile
                                                </Link>

                                                <Link to={`/forgot?email=${user?.email}`} className='text-xs w-12 rounded border border-blue-200 bg-blue-50 flex flex-wrap justify-center items-center'>
                                                <RiLockPasswordFill /> change
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'contacts' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Contacts Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Manage IEEE CS LU SB Chapter contacts here</p>

                            {/* Contacts Grid - Simplified to show only name and email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {messages?.map(contact => (
                                    <div key={contact._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                        <div className="p-5 flex flex-col">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{contact.name}</h3>

                                            <div className="flex items-center text-sm text-gray-600 mb-4">
                                                <FaEnvelope className="mr-2 text-gray-400" />
                                                <span className="truncate">{contact.email}</span>
                                            </div>
                                            <div className='flex justify-between flex-wrap'>

                                            <Link
                                                to={`/messages?id=${contact._id}`}
                                                className=" flex items-center justify-center bg-[#045C99] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
                                            >
                                                <FaComment className="mr-2" />
                                                Message
                                            </Link>
                                            <button onClick={()=>deleteMessage(contact._id)} className='bg-red-600 rounded py-1 px-4 text-white cursor-pointer'>
                                                Delete
                                            </button>
                                                </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'committee' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Committee Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">Add or update IEEE CS LU SB Chapter committee members information</p>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name*
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={committeeformData.name}
                                            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                            placeholder="Enter committee member's full name"
                                            onChange={(e) => setCommitteeFormData({ ...committeeformData, name: e.target.value })}
                                            required
                                        />
                                    </div>

                                    {/* Designation Input */}
                                    <div>
                                        <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                                            Designation*
                                        </label>
                                        <input
                                            type="text"
                                            id="designation"
                                            name="designation"
                                            // value={committeeformData.designation}
                                            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                            placeholder="Enter position or designation"
                                            required
                                            onChange={(e) => setCommitteeFormData({ ...committeeformData, designation: e.target.value })}
                                        />
                                    </div>

                                    {/* IEEE ID Input */}
                                    <div>
                                        <label htmlFor="ieeeId" className="block text-sm font-medium text-gray-700 mb-1">
                                            IEEE ID*
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaIdCard className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                id="ieeeId"
                                                name="ieeeId"
                                                value={committeeformData.id}
                                                onChange={(e) => setCommitteeFormData({ ...committeeformData, id: e.target.value || '' })}
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter 8-digit IEEE ID"
                                                title="IEEE ID should be an 8-digit number"
                                            />
                                        </div>
                                    </div>

                                    {/* Committee Type Select */}
                                    <div>
                                        <label htmlFor="committeeType" className="block text-sm font-medium text-gray-700 mb-1">
                                            Committee Type*
                                        </label>
                                        <select
                                            id="committeeType"
                                            name="committeeType"
                                            onChange={(e) => setCommitteeFormData({ ...committeeformData, type: e.target.value })}
                                            className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                            required
                                        >
                                            <option value="">Select committee type</option>
                                            <option value="ExCom">ExCom</option>
                                            <option value="Ex ExCom">Ex ExCom</option>
                                            <option value="Advisory Panel">Advisory Panel</option>
                                            <option value="Volunteer">Volunteer</option>
                                            <option value="Member">Member</option>
                                        </select>
                                    </div>

                                    {/* Facebook Link Input */}
                                    <div>
                                        <label htmlFor="facebookLink" className="block text-sm font-medium text-gray-700 mb-1">
                                            Facebook Profile
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaFacebook className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <input
                                                type="url"
                                                id="facebookLink"
                                                onChange={(e) => setCommitteeFormData({ ...committeeformData, facebookLink: e.target.value })}
                                                name="facebookLink"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="https://facebook.com/username"
                                            />
                                        </div>
                                    </div>

                                    {/* LinkedIn Link Input */}
                                    <div>
                                        <label htmlFor="linkedinLink" className="block text-sm font-medium text-gray-700 mb-1">
                                            LinkedIn Profile
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLinkedin className="h-4 w-4 text-blue-800" />
                                            </div>
                                            <input
                                                type="url"
                                                id="linkedinLink"
                                                name="linkedinLink"
                                                onChange={(e) => setCommitteeFormData({ ...committeeformData, linkedinLink: e.target.value })}
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="https://linkedin.com/in/username"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                                        Profile Image*
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100 mr-4">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="file"
                                            id="profileImage"
                                            name="profileImage"
                                            onChange={(e) => setCommitteeFormData({ ...committeeformData, image: e.target.files[0] })}
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Recommended: Square image, at least 300x300 pixels
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-[#045C99] text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                                    >
                                        Add Committee Member
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Achievements Section */}
                    {activeSection === 'achievements' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">Achievements Management</h1>
                            <p className="text-gray-600 mt-1 mb-6">IEEE CS LU SB Chapter achievements</p>

                            <div className="space-y-4">
                                {achievements.map(achievement => (
                                    <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="mr-4 text-amber-500">
                                                    <FaTrophy className="text-2xl" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-lg text-gray-800">{achievement.title}</h3>
                                                    <div className="flex items-center mt-1 gap-2">
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                                                            {achievement.AchievementType}
                                                        </span>
                                                        <span className="text-gray-500 text-sm">
                                                            Year: {achievement.year}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 mt-2 text-sm">
                                                        {achievement.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteAchievement(achievement?._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition whitespace-nowrap ml-4 inline-block">
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <button onClick={() => navigate('/addAcheivement')} className="flex items-center bg-[#045C99] text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                    <span className="mr-2">Add New Achievement</span> +
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Statistics Section */}
                    {activeSection === 'statistics' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-2xl font-semibold text-gray-800">IEEE CS LU SB Chapter Statistics</h1>
                            <p className="text-gray-600 mt-1 mb-6">Update IEEE CS LU SB Chapter statistics and metrics</p>

                            <form className="space-y-6" onSubmit={handleSubmitAbout}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Active Members Input */}
                                    <div>
                                        <label htmlFor="activeMembers" className="block text-sm font-medium text-gray-700 mb-1">
                                            Active Members
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUserFriends className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="ActiveMember"
                                                name="ActiveMember"
                                                min="0"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter count"
                                                onChange={(e) => setIEEEabout({ ...IEEEabout, ActiveMember: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Technical Workshops Input */}
                                    <div>
                                        <label htmlFor="technicalWorkshops" className="block text-sm font-medium text-gray-700 mb-1">
                                            Technical Workshop Count
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaTools className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="technicalWorkshops"
                                                name="technicalWorkshops"
                                                min="0"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter count"
                                                onChange={(e) => setIEEEabout({ ...IEEEabout, numofWorkshop: e.target.value })}
                                                
                                            />
                                        </div>
                                    </div>

                                    {/* Industry Partners Input */}
                                    <div>
                                        <label htmlFor="industryPartners" className="block text-sm font-medium text-gray-700 mb-1">
                                            Industry Partners Count
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaIndustry className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="industryPartners"
                                                name="industryPartners"
                                                min="0"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter count"
                                                onChange={(e) => setIEEEabout({ ...IEEEabout, numofIndustryCollaboration: e.target.value })}
                                                
                                            />
                                        </div>
                                    </div>

                                    {/* Awards Won Input */}
                                    <div>
                                        <label htmlFor="awardsWon" className="block text-sm font-medium text-gray-700 mb-1">
                                            Awards Won Count
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaAward className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="awardsWon"
                                                name="awardsWon"
                                                min="0"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter count"
                                                onChange={(e) => setIEEEabout({ ...IEEEabout, awardsWon: e.target.value })}
                                                
                                            />
                                        </div>
                                    </div>

                                    {/* Events Organized Input */}
                                    <div>
                                        <label htmlFor="eventsOrganized" className="block text-sm font-medium text-gray-700 mb-1">
                                            Events Organized Count
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="eventsOrganized"
                                                name="eventsOrganized"
                                                min="0"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter count"
                                                onChange={(e) => setIEEEabout({ ...IEEEabout, NumberofEvents: e.target.value })}
                                                
                                            />
                                        </div>
                                    </div>

                                    {/* Projects Completed Input */}
                                    <div>
                                        <label htmlFor="projectsCompleted" className="block text-sm font-medium text-gray-700 mb-1">
                                            Projects Completed Count
                                        </label>
                                        <div className="relative mt-1">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaProjectDiagram className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="number"
                                                id="projectsCompleted"
                                                name="projectsCompleted"
                                                min="0"
                                                className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                                placeholder="Enter count"
                                                onChange={(e) => setIEEEabout({ ...IEEEabout, numofProjectCompleted: e.target.value })}
                                                
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>Upload image</div>
                                <div className="mt-1 flex items-center">
                                    <input
                                        type="file"
                                        id="aboutImage"
                                        name="aboutImage"
                                        onChange={(e) => setIEEEabout({ ...IEEEabout, image: e.target.files[0] })}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-[#045C99] text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-300 flex justify-center items-center"
                                    >
                                        Update Statistics
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                </main>
            </div>
        </div> :
            (user?.role === "user") ? <div className='flex flex-col justify-center items-center min-h-screen'>
                <div>You are not authorized</div>
                <br></br>
                <Link className='p-2 bg-blue-500 text-white rounded' to={'/'}>Go to home</Link>
            </div> : null
    );
};

export default Dashboard;