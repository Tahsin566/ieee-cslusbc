import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../constants';
import { Link } from 'react-router-dom';

const Committee = () => {
  const teamMembers = [
    { name: 'Mahfuz Alam Chowdhury', role: 'Chairperson', image: 'https://i.ibb.co.com/gFSpDXMQ/Mahfuz.jpg' },
    { name: 'Zuhaer Tanzim', role: 'Vice Chairperson', image: 'https://i.ibb.co.com/Jw5c8r4t/IMG-20250426-022010-473-1.webp' },
    { name: 'Jyoti Prokash Anindya', role: 'Secretary', image: 'https://i.ibb.co.com/35Cf6yBQ/anindya.jpg' },
    { name: 'Sabbir Hussain Khan', role: 'Treasurer', image: 'https://i.ibb.co.com/9kw8RLSh/sabbir.jpg' },
  ];

  const [excomm, setExcomm] = useState([])

  const getallExcom = async () => {

    try {
      const response = await fetch(`${BASE_URL}/committee/excom`)
      const data = await response.json()
      if (!data.success) return toast.error(data.message)
      console.log(data.excom)
      setExcomm(data.excom)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getallExcom()
  }, [])


  return (
    <section className="my-24 mx-12">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">2025 Committee</h2>
      <div className="flex flex-wrap justify-center gap-5 lg:gap-24">
        {excomm.map((member, index) => (
          <div key={index} className="text-center max-w-[280px] mt-3">
            <div className="">
            <Link to={`/details?id=${member.IEEEID}&name=${member.name}&path=home`}>
              <img className='w-50 h-50 bg-gray-300 object-cover rounded-full mx-auto mb-3' src={member?.hosted_image} alt={`${member.name}`} />
            </Link>
            </div>
            <div className="font-semibold text-lg text-black leading-7">{member.name}</div>
            <div className="text-sm font-normal leading-5 text-[#045C99]">{member.designation}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Committee;