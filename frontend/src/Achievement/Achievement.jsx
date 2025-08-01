import React, { useEffect, useState } from 'react';
import achievementImg from '../../public/img/achivement.jpg';
import { BASE_URL } from '../../constants';

const Achievement = () => {

    const [achievements, setAchievements] = useState()
    const [ieeeStatistics, setIeeeStatistics] = useState()
    const [loading, setLoading] = useState(false)

    const getIEEEStatistics = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/ieee`, {
            })
            const data = await response.json()
            if (!response.ok) {
                setLoading(false)
                return
            }
            setIeeeStatistics(data.ieee[0])
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const getAchivements = async () => {
        try {
            const response = await fetch(`${BASE_URL}/experience-achievement/get-achievement`, {
            })
            const data = await response.json()
            if (!response.ok) {
                return
            }
            setAchievements(data.achievements)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getIEEEStatistics()
        getAchivements()
    }, [])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }

    return (
        <div className="text-gray-800 font-sans">
            {/* Header Section */}
            <header
                className="relative w-full h-72 bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${achievementImg})` }}
            >
                {/* Blurred Background Layer */}
                <div className="absolute inset-0 bg-cover bg-center filter blur-xs" style={{ backgroundImage: `url(${achievementImg})` }} />



                {/* Text Content */}
                <div className="relative z-2 text-center px-4">
                    <h2 className="text-3xl md:text-5xl font-bold">
                        Our <span className="text-[#045C99]">Achievements</span>
                    </h2>
                    <p className="mt-2 text-xl">Celebrating excellence and innovation in IEEE Computer Society LU SB Chapter</p>
                </div>
            </header>


            {/* Achievement Stats */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">


                    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h2 className="text-3xl font-extrabold text-[#045C99]">{ieeeStatistics?.ActiveMember}+</h2>
                        <p className="mt-2">Active Members</p>
                    </div>

                    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h2 className="text-3xl font-extrabold text-[#045C99]">{ieeeStatistics?.awardsWon}+</h2>
                        <p className="mt-2">Awards Won</p>
                    </div>

                    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h2 className="text-3xl font-extrabold text-[#045C99]">{ieeeStatistics?.NumberofEvents}+</h2>
                        <p className="mt-2">Events Organized</p>
                    </div>

                    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h2 className="text-3xl font-extrabold text-[#045C99]">{ieeeStatistics?.numofProjectCompleted}+</h2>
                        <p className="mt-2">Projects Completed</p>
                    </div>
                </div>
            </section>

            {/* Award Gallery */}
            <section className="py-16">
                <h1 className="text-3xl font-bold text-center mb-10">Award Gallery</h1>
                <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">
                    {achievements?.map((award,index) => (
                        <div key={index} className="bg-white rounded shadow p-4 flex flex-col items-center text-center">
                            <img src={award?.image} alt={`Award ${award?.name}`} className="w-full h-auto mb-4" />
                            <h4 className="font-semibold">{award?.title}</h4>
                            <p className="text-sm text-gray-600">{award?.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 bg-gray-50">
                <h1 className="text-3xl font-bold text-center mb-10">Achievement Timeline</h1>
                <div className="max-w-4xl mx-auto border-l-4 border-[#045C99] relative space-y-12">
                    {achievements?.map((achievement, index) => (
                        <div key={index} className="pl-6 relative">
                            <div className="w-4 h-4 bg-[#045C99] rounded-full absolute -left-2 top-1.5"></div>
                            <h2 className="text-2xl font-bold">{achievement?.year}</h2>
                            <div className="mt-2">
                                <h4 className="font-semibold">{achievement?.title}</h4>
                                <p className="text-sm text-gray-700">{achievement?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}

        </div>
    );
};

export default Achievement;