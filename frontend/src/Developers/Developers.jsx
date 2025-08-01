import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';




const WebMasters = [
  {
    name: 'Lukman Hossain',
    role: 'Web Master(23-24)',
    img: './img/Lukman Hossain.jpg',
    facebook: 'https://www.facebook.com/lukmanhossain01',
    linkedin: 'https://www.linkedin.com/in/lukmanofficial/',

  },
  {
    name: 'Iftekhar Ahmed',
    role: 'Web Master(23-24)',
    img: './img/iftekhar.jpg',
    facebook: 'https://www.facebook.com/Lord.Madara.007',
    linkedin: 'https://www.linkedin.com/in/iftekhar-ifat/',
  },
  {
    name: 'Mahfuz Alam Chowdhury',
    role: 'Web Master(24-25)',
    img: './img/mahfuzzzzzzzz.jpg',
    facebook: 'https://www.facebook.com/mahfuz.mahfuz.5688',
    linkedin: 'https://www.linkedin.com/in/md-mahfuz-alam-chowdhury-b25023235',


  },
  {
    name: 'Sourav Das Gupta',
    role: 'Webmaster(25-26)',
    img: './img/sourav - sourav das.jpg',
    facebook: 'https://www.facebook.com/sourav.das.gupta.967085',
    linkedin: 'https://www.linkedin.com/in/sourav-das-gupta-14a8a1263',


  },
  {
    name: 'Nazmul Hasan Tahsin',
    role: 'Webmaster(25-26)',
    img: './img/Tahsin.jpg',
    facebook: '',
    linkedin: 'https://www.linkedin.com/in/nazmul-hasan-tahsin-nht5445',


  },
  {
    name: 'Bishal Chandro Modak',
    role: 'Webmaster(25-26)',
    img: '/img/bishal.jpg',
    facebook: 'https://www.facebook.com/bishal.modak.7798',
    linkedin: 'https://www.linkedin.com/in/bishal-chandro-modak/',


  },
]
const GuestDevelopers = [
  {
    name: 'Badar Hossain',
    role: 'Front-end Developer',
    img: 'https://i.ibb.co/LX5k1DQf/Gala-Night-2025.jpg',
    facebook: 'https://www.facebook.com/badar.hossain.92',
    linkedin:'https://www.linkedin.com/in/badar-hossain1/',
  
  }
]
const GuestUIUX = [
  {
    name: 'Pulock Deb Roy',
    role: 'UI/UX Designer',
    img: '/img/pulok[1].jpg',
    facebook: 'https://www.facebook.com/pulockdebroy.dip.9',
    linkedin:'https://www.linkedin.com/in/pulock-deb-roy-833584218',
  }
]


const phases = [
  {
    phase: 'Phase 1',
    title: 'Planning & Design',
    description: 'Initial project planning, requirement gathering, and UI/UX design'
  },
  {
    phase: 'Phase 2',
    title: 'Development',
    description: 'Implementation of frontend and backend functionality'
  },
  {
    phase: 'Phase 3',
    title: 'Testing & Deployment',
    description: 'Testing, bug fixes, and final deployment'
  }
];

const Developers = () => {
  return (
    <section className="px-6 py-10 bg-white text-gray-800 font-['Roboto']">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black">Meet Our</h1>
        <h2 className="text-5xl font-extrabold text-[#045C99] mt-6  ">Development Team</h2>
        <p className="text-lg text-gray-600 mt-6  font-medium">Passionate developers building innovative solutions for IEEE CS LU SB Chapter</p>
      </div>



      {/* current web master Cards */}
      <div className="text-center mt-6   mb-6">

        <p className="text-4xl font-extrabold text-[#045C99] mt-6   ">Web Masters</p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WebMasters.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md  py-12 flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-40 object-cover rounded-full border-4 border-[#19376D] mb-4"
            />
            <h2 className="text-2xl flex items-center justify-center text-center font-bold text-black text-nowrap">{member.name}</h2>
            <h3 className="text-lg font-medium" style={{ color: '#045C99' }}>{member.role}</h3>
            <div className="flex gap-4 mt-6  text-2xl text-[#045C99]">
              {member.facebook && <a className='cursor-pointer' target='_blank' href={member.facebook}><FaFacebook /></a>}
              <a className='cursor-pointer' target='_blank' href={member.linkedin}><FaLinkedin /></a>

            </div>
          </div>
        ))}
      </div>
      {/* Guest developers Cards */}
      <div className="text-center mt-6   ">

        <p className="text-4xl font-extrabold text-[#045C99] mt-14   ">Guest Developer</p>

      </div>
      <div className="flex flex-row items-center justify-center mb-12 mt-5" >
        {GuestDevelopers.map((member, index) => (
          <div
            key={index}
            className="bg-white w-[470px] rounded-2xl shadow-md py-12 flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-40 object-cover rounded-full border-4 border-[#19376D] mb-4"
            />
            <h2 className="text-2xl font-bold text-black">{member.name}</h2>
            <h3 className="text-lg font-medium" style={{ color: '#045C99' }}>{member.role}</h3>
            <div className="flex gap-4 mt-6  text-2xl text-[#045C99]">
              {member.facebook && <a className='cursor-pointer' target='_blank' href={member.facebook}><FaFacebook /></a>}
              <a className='cursor-pointer' target='_blank' href={member.linkedin}><FaLinkedin /></a>

            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6   ">



        {/* Guest graphic designer */}
        <p className="text-4xl font-extrabold text-[#045C99] mt-14   ">Guest UI/UX Designer</p>

      </div>
      <div className="flex flex-row items-center justify-center mb-12 mt-5" >
        {GuestUIUX.map((member, index) => (
          <div
            key={index}
            className="bg-white w-[470px] rounded-2xl shadow-md py-12 flex flex-col items-center transition-transform hover:scale-105"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-40 object-cover rounded-full border-4 border-[#19376D] mb-4"
            />
            <h2 className="text-2xl font-bold text-black">{member.name}</h2>
            <h3 className="text-lg font-medium" style={{ color: '#045C99' }}>{member.role}</h3>
            <div className="flex gap-4 mt-6  text-2xl text-[#045C99]">
              <a className='cursor-pointer' target='_blank' href={member.facebook}><FaFacebook /></a>
              <a className='cursor-pointer' target='_blank' href={member.linkedin}><FaLinkedin /></a>

            </div>
          </div>
        ))}
      </div>

      {/* Timeline Heading */}
      <div className="text-center mt-12  0 mb-10">
        <h2 className="text-4xl font-bold text-black">Development Timeline</h2>
        <p className="text-lg text-gray-600 mt-6  ">Our journey in building the IEEE CS LU SB Chapter Portal</p>
      </div>

      {/* Timeline Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="bg-[#f5f5f5] p-6 rounded-xl shadow-md text-center"
          >
            <h4 className="text-xl font-bold text-[#045C99]">{phase.phase}</h4>
            <h3 className="text-2xl text-[#0B2447] font-semibold mt-6  ">{phase.title}</h3>
            <p className="text-gray-700 mt-6  ">{phase.description}</p>
          </div>
        ))}
      </div>

      {/* Technologies Used */}
      <div className="text-center mt-12 mb-10  0">
        <h2 className="text-4xl font-bold text-black">Technologies Used</h2>
        <p className="text-lg text-gray-600 mt-6  ">Built with modern and reliable technologies</p>
        <div className="flex flex-wrap justify-evenly gap-8 mt-6">
          <img src="/img/react.png" alt="React" className="h-16" />
          <img src="/img/html.png" alt="HTML" className="h-16" />
          <img src="/img/css.png" alt="CSS" className="h-16" />
          <img src="/img/js.png" alt="JavaScript" className="h-16" />
          <img src="/img/dbms.png" alt="DBMS" className="h-16" />
        </div>
      </div>
    </section>
  );
};

export default Developers;
