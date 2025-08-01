import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';

const AdvisorPanel = () => {

    const [advisors, setAdvisors] = useState([])


    const getAdvisors = async () => {

        try {
            const response = await fetch(`${BASE_URL}/committee/advisor`)
            const data = await response.json()
            console.log(data)
            if (!data.success) return 
            setAdvisors(data?.advisor)
        } catch (error) {
            console.log(error)
            setAdvisors([])
        }
    }

    useEffect(() => {
        getAdvisors()
    }, [])

    return (
        <div>
            <section className="text-center mb-10">
                <h1 className="text-3xl mt-4 font-bold text-[#045C99]">Current Advisory Panel</h1>
                <p className="text-gray-600">Distinguished Advisors Supporting Our Mission</p>
                <div className="flex flex-row justify-center gap-25 flex-wrap  mt-6">


                    {advisors?.map((advisor) => (
                            <div className="p-6 text-center">
                                <div className="shadow-md p-4 mx-auto w-fit px-10">
                                    <img src={advisor?.hosted_image} alt="Sir" className="w-[200px] h-[200px] object-cover mx-auto mb-3" loading="lazy" />
                                    {/* <h3 className="text-xl font-bold">Md. Jehadul Islam Mony</h3> */}
                                    <h3 className="text-xl font-bold">{advisor?.name}</h3>
                                    {/* <span className="text-[#045C99]">Advisor</span> */}
                                    <span className="text-[#045C99]">{advisor?.designation}</span>
                                    <p className='w-[150px] mx-auto'>Department of </p>
                                    <p>{advisor?.department}</p>
                                    <div className="text-2xl mt-2">
                                        <a target='_blank' href={advisor?.facebook} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>
                                        <a target='_blank' href={advisor?.linkedin} className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>
                                    </div>
                                </div>
                            </div>

                        ))}


                    {/* <div className="p-6 text-center">
                        <div className="shadow-md p-4 mx-auto w-fit px-10">
                            <img src="https://i.ibb.co.com/whB9WsPh/Jalal-sir.jpg" alt="Sir" className="w-[200px] h-[200px] object-cover mx-auto mb-3" />
                            <h3 className="text-xl font-bold">
                                Md. Jalal Uddin Chowdhury</h3>
                            <span className="text-[#045C99]">Co-Advisor</span>
                            <p className='w-[150px] mx-auto'>Department of </p>
                            <p>Computer Science & Engineering</p>
                            <div className="text-2xl mt-2">
                                <a href="https://www.facebook.com/share/123w2JVRGsp/" className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-facebook"></i></a>
                                <a href="https://www.linkedin.com/in/jalalchy101?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-black hover:text-[#045C99] px-2"><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                    </div> */}


                </div>
            </section>
        </div>
    );
};

export default AdvisorPanel;