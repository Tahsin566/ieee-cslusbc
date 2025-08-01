import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { FaUser } from 'react-icons/fa6';

const UserPage = () => {

    const { userProfile, getUserProfile, user } = useUser();
    const [searchParams] = useSearchParams()

    const id = searchParams.get("id")
    console.log(id);

    const navigate = useNavigate();



    // This would normally come from an API or context
    const [userData] = useState({
        name: 'John Doe',
        email: 'john.doe@ieee.org',
        ieeeId: 'IEEE-123456789',
        phoneNumber: '+1 (555) 123-4567',
        memberType: 'Local Member',
        department: 'Computer Science & Engineering',
        university: 'Leading University',
        joinedDate: 'January 15, 2023',
        experience: [
            {
                id: 1,
                position: 'Webmaster',
                duration: 'Jan 2023 - Present',
                description: 'Managed and maintained the IEEE student branch website.'
            },
            {
                id: 2,
                position: 'Publication Coordinator',
                duration: 'Mar 2022 - Dec 2022',
                description: 'Coordinated publication activities for the student branch.'
            }
        ],
        profileImage: 'https://i.ibb.co/7pp5Zcp/person1.jpg', // Default image path
        achievements: [
            { id: 1, title: 'Best Website Award', year: '2024' },
            { id: 2, title: 'IEEE Outstanding Branch Volunteer', year: '2023' }
        ]
    });

    // For demonstration, you would fetch user data from API in a real application
    useEffect(() => {
        getUserProfile(id)
    }, []);



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

    return (
        userProfile ? <div className="bg-gray-100 min-h-screen pt-3 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

                {/* Header with background */}
                <div className="bg-blue-600 h-40 relative">
                    {/* Navigation link */}
                    <div className="absolute top-4 left-4">
                        {user?.role === 'admin'
                            ? <Link to={'/dashboard'} className="text-white hover:text-blue-200">
                                &larr; Back to Dashboard
                            </Link> :
                            <Link to={'/'} className="text-white hover:text-blue-200">
                                &larr; Back to Home
                            </Link>
                        }
                    </div>
                    {/* Profile image */}
                    <div className="absolute -bottom-16 left-8">
                        {userProfile?.profilePicture ? <div className="relative">
                            <img
                                src={userProfile?.profilePicture}
                                alt={`${userProfile?.name}'s profile`}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover object-top bg-white"
                            />
                            <Link
                                to={`/uploadUserImg`}
                                className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs font-medium py-1 text-center hover:bg-blue-700 transition-colors duration-200"
                            >
                                Update Photo
                            </Link>
                        </div> :
                            <div className=' flex flex-col items-center'>
                                <FaUser size={30} />
                                <Link
                                    to={`/uploadUserImg`}
                                    className="bg-blue-600 text-white text-xs font-medium py-1 text-center hover:bg-blue-700 transition-colors duration-200 w-30"
                                >
                                    Update Photo
                                </Link>
                            </div>
                        }
                    </div>
                </div>

                {/* User info */}
                <div className="pt-20 px-8 pb-8">
                    <h1 className="text-3xl font-bold text-gray-800">{userProfile?.username}</h1>
                    <p className="text-blue-600 font-medium">{userProfile?.memberType} member</p>

                    {/* User details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className={`space-y-4 ${userProfile?.experiences?.length >= 3 ? 'mt-8' : ''}`}>
                            <div>
                                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                                <p className="text-gray-800">{userProfile?.email}</p>
                            </div>

                            <div>
                                <h2 className="text-sm font-medium text-gray-500">IEEE ID</h2>
                                <p className="text-gray-800">{userProfile?.IEEEID}</p>
                            </div>


                            <div>
                                <h2 className="text-sm font-medium text-gray-500">Department</h2>
                                <p className="text-gray-800">{userProfile?.department}</p>
                            </div>

                            <div>
                                <h2 className="text-sm font-medium text-gray-500">University</h2>
                                <p className="text-gray-800">{userProfile?.university}</p>
                            </div>

                            {userProfile?.userfacebook ? <div>
                                <h2 className="text-sm font-medium text-gray-500">Facebook</h2>
                                <p className="text-gray-800">{userProfile?.userfacebook}</p>
                            </div>:null}

                            {userProfile?.userlinkedin ? <div>
                                <h2 className="text-sm font-medium text-gray-500">Linkedin</h2>
                                <p className="text-gray-800">{userProfile?.userlinkedin}</p>
                            </div>:null}

                            <div>
                                <h2 className="text-sm font-medium text-gray-500">Member Since</h2>
                                <p className="text-gray-800">{new Date(userProfile?.createdAt).toDateString()}</p>
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
                            <div className="space-y-3 max-h-38 overflow-y-auto scrollbar-none">
                                {userProfile?.experiences?.length > 0 ? userProfile?.experiences?.map((exp) => (
                                    <div key={exp._id} className="border-l-2 border-blue-500 pl-4">
                                        <h3 className="font-medium text-gray-800">{exp.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                                        <p className="text-sm text-gray-500">{new Date(exp?.startDate).toDateString()?.split(" ")[1]} {new Date(exp?.startDate).toDateString()?.split(" ")[3]} - {new Date(exp?.endDate).toDateString()?.split(" ")[1]} {new Date(exp?.endDate).toDateString()?.split(" ")[3]}</p>
                                    </div>
                                )) : <div>No experience data found</div>}
                            </div>

                            {/* Achievements Section */}
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-5">Achievements</h2>
                            <div className="space-y-2 max-h-25 overflow-y-auto scrollbar-none">
                                {userProfile?.achievements?.length > 0 ? userProfile?.achievements.map((achievement) => (
                                    <div key={achievement._id} className="flex items-center">
                                        <span className="text-blue-600 mr-2">•</span>
                                        <div>
                                            <p className="font-medium text-gray-800">{achievement.title}</p>
                                            <p className="text-sm text-gray-500">{achievement.year}</p>
                                        </div>
                                    </div>
                                )) : <div>No achievements data found</div>}
                            </div>
                        </div>
                    </div>

                </div>

                <div className='p-2 flex justify-between flex-wrap'>

                    {user?.IEEEID === userProfile?.IEEEID ? <div className='flex flex-wrap '>

                        <Link
                            to={`/addAcheivement`}
                            className="bg-blue-50 text-[#045C99] px-4 py-2 rounded border border-blue-200 hover:bg-blue-100 transition mr-2 text-center w-50 flex items-center justify-center"
                        >
                            Add New achievement
                        </Link>

                        <Link
                            to={`/addlinks?email=${userProfile?.email}`}
                            className="bg-blue-50 text-[#045C99] px-4 py-2 rounded border border-blue-200 hover:bg-blue-100 transition mr-2 text-center w-35 flex items-center justify-center"
                        >
                            + social Links
                        </Link>

                        <Link
                            to={`/reset?email=${userProfile?.email}`}
                            className="bg-blue-50 text-[#045C99] px-4 py-2 rounded border border-blue-200 hover:bg-blue-100 transition mr-2 text-center w-50 flex items-center justify-center"
                        >
                            Reset Password
                        </Link>


                    </div> : null}


                    {/* <button className="bg-red-50 text-red-600 px-3 py-2 rounded border border-red-200 hover:bg-red-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button> */}

                    {/* <div onClick={handleLogout} className='w-full'> */}
                    <div>

                        <button onClick={handleLogout} className='bg-red-700 rounded-md text-white p-2 mb-2 w-40 cursor-pointer'>
                            Sign out
                        </button>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>:null
    );
};

export default UserPage;
