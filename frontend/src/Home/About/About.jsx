import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../constants';

const About = () => {

    const [data, setData] = useState()

    const getAbout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/ieee`, {
            })
            const data = await response.json()
            if(!response.ok){
                return
            }
            setData(data.ieee[0])
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0,0)
        getAbout()
    }, [])

    return (
        <div>
            <section className="flex flex-col lg:flex-row items-center px-6 py-10  w-[90%] mx-auto -mt-20">
                <div className="flex-1 ">
                    <h2 className="text-3xl w-[100%] lg:text-start text-center mb-2  font-bold text-gray-900 p-5">
                        About IEEE CS LU SB Chapter
                    </h2>
                    <p className="text-lg text-gray-600 text-justify px-5 mb-2">
                        We are a community of engineering students and professionals dedicated to
                        technical innovation and excellence. Our branch provides opportunities for skill
                        development, networking, and professional growth.
                    </p>
                    <div className="grid grid-cols-2 gap-5 p-5 ">
                        <div className="bg-gray-200/20 p-5 rounded-xl flex flex-col justify-center items-center">
                            <h3 className="text-[#045C99] text-2xl font-bold leading-8 lg:ml-0  ml-2.5">{data?.ActiveMember}+</h3>
                            <p className="text-sm text-gray-600 font-bold w-[100%] text-center ">Active Member</p>
                        </div>
                        <div className="bg-gray-200/20 p-5 rounded-xl flex flex-col justify-center items-center">
                            <h3 className="text-[#045C99] text-2xl font-bold leading-8 lg:ml-0  ml-2.5">{data?.NumberofEvents}+</h3>
                            <p className="text-sm text-gray-600 font-bold w-[100%] text-center">Annual Events</p>
                        </div>
                        <div className="bg-gray-200/20 p-5 rounded-xl flex flex-col justify-center items-center">
                            <h3 className="text-[#045C99] text-2xl font-bold leading-8 lg:ml-0  ml-2.5">{data?.numofWorkshop}+</h3>
                            <p className="text-sm text-gray-600 font-bold w-[100%] text-center">Technical Workshops</p>
                        </div>
                        <div className="bg-gray-200/20 p-5 rounded-xl flex flex-col justify-center items-center">
                            <h3 className="text-[#045C99] text-2xl font-bold leading-8 lg:ml-0  ml-2.5">{data?.numofIndustryCollaboration}+</h3>
                            <p className="text-sm text-gray-600 font-bold w-[100%] text-center">Industry Partners</p>
                        </div>
                    </div>
                </div>
                <img
                    src={data?.image}
                    alt="IEEE LU"
                    className="w-[500px] h-[300px] lg:w-[600px] lg:h-[400px] rounded-lg mt-3 lg:mt-0 lg:ml-5"
                />
            </section>
        </div>
    );
};

export default About;