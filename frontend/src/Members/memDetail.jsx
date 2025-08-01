import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa6"
import { BASE_URL } from "../../constants"

export default function MemberDetails() {

    const [userProfile,setUserProfile] = useState(null)
    const [profileloading, setProfileLoading] = useState(true);

    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const path = searchParams.get("path") || ''

    const name = searchParams.get("name")

    const navigate = useNavigate()


    const getUserProfile = async (id) => {
            setProfileLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/auth/${id}`, {
                    credentials: 'include'
                })
    
                const data = await response.json();
                if (!data?.success) {
                    setProfileLoading(false);
                    return
                }
    
                setProfileLoading(false);
                setUserProfile(data?.user)
    
            } catch (error) {
                console.log(error);
                setProfileLoading(false);
            }
        }
    

        useEffect(() => {
            getUserProfile(id)
        }, [])
    

    if (profileloading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }


    return userProfile ? <div>

        <div className="bg-gray-100 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

                {/* Header with background */}
                <div className="bg-blue-600 h-40 relative">
                    {/* Navigation link */}
                    <div className="absolute top-4 left-4">

                        {path === "home" ? <button onClick={() => navigate('/')} className="text-white hover:text-blue-200">
                            &larr; Back to Page
                        </button> :
                            <button onClick={() => navigate(`/membersPage`)} className="text-white hover:text-blue-200">&larr; Back to Page</button>}


                    </div>
                    {/* Profile image */}
                    <div className="absolute -bottom-16 left-16">
                        {userProfile?.profilePicture ? <div className="relative">
                            <img
                                src={userProfile?.profilePicture}
                                alt={`${userProfile?.name}'s profile`}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover object-top bg-white"
                            />
                        </div> :
                            <div className=' flex flex-col items-center'>
                                <FaUser size={30} />
                            </div>
                        }
                    </div>
                </div>

                {/* User info */}
                <div className="pt-20 px-8 pb-8">
                    <h1 className="text-3xl font-bold text-gray-800 max-w-sm">{name}</h1>
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
                            </div> : null}

                            {userProfile?.userlinkedin ? <div>
                                <h2 className="text-sm font-medium text-gray-500">Linkedin</h2>
                                <p className="text-gray-800">{userProfile?.userlinkedin}</p>
                            </div> : null}

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
                                )) : <div>No Experience Found</div>}
                            </div>

                            {/* Achievements Section */}
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-8">Achievements</h2>
                            <div className="space-y-2 max-h-25 overflow-y-auto scrollbar-none">
                                {userProfile?.achievements?.length > 0 ? userProfile?.achievements.map((achievement) => (
                                    <div key={achievement._id} className="flex items-center">
                                        <span className="text-blue-600 mr-2">•</span>
                                        <div>
                                            <p className="font-medium text-gray-800">{achievement.title}</p>
                                            <p className="text-sm text-gray-500">{achievement.year}</p>
                                        </div>
                                    </div>
                                )) : <div>No Achievements Found</div>}
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </div>

    </div> : <div className="min-h-screen flex justify-center items-center ">
        <div className="space-y-5">
            <div>No data found</div>
            <Link to={'/'} className="w-lg p-2 rounded bg-blue-500 text-white">Back to Page</Link>
        </div>
    </div>

}