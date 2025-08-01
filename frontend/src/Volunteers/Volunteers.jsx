import React, { useEffect, useState } from 'react';
import userImage from '../../public/img/user.png';
import { BASE_URL } from '../../constants';
import { Link } from 'react-router-dom';


const Volunteers = () => {

  const [volunteers,setVolunteers] = useState([])

  const getVolunteers = async()=>{
    try {
      const response = await fetch(`${BASE_URL}/committee/volunteer`,{
        method:'GET',
        credentials:'include'
      })
      const data = await response.json()
      console.log(data)
      if(!response.ok){
        return
      }
      setVolunteers(data.volunteer)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getVolunteers()
  },[])

  return (
    <div className="bg-white text-gray-800">


      {/* Section Title */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold uppercase">Volunteers of IEEE Computer Society LU SB Chapter</h1>
          <p className="text-gray-600 mt-2">
            Discover and connect with dedicated IEEE Computer Society LU SB Chapter volunteers making a difference
          </p>
        </div>

        {/* Volunteers Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {new Array(...new Set(volunteers?.map((data,index)=> data))).map((volunteer, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 text-center shadow hover:shadow-lg transition">
              <Link to={`/details?id=${volunteer?.IEEEID}&name=${volunteer?.name}&path=volunteer`}>
              <img src={volunteer?.hosted_image} alt="Volunteer" className="mx-auto mb-4 h-32 w-32 object-cover rounded-full object-[50%_10%]" loading="lazy" />
            </Link>
              <h3 className="font-semibold text-lg">{volunteer.name}</h3>
              <h3 className="">Commitee : {volunteer?.duration}</h3>
              <div className="flex justify-center mt-3 space-x-3">
                <a href={volunteer.facebook} className="text-[#045C99] hover:text-black text-xl"><i className="fab fa-facebook"></i></a>
                <a href={volunteer.linkedin} className="text-[#045C99] hover:text-black text-xl"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      
      </div>
  );
};

export default Volunteers;
