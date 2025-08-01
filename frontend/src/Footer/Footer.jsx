import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Footer = () => {
    
    return (
        <footer className="bg-gray-900 text-gray-400">
            {/* Footer Images */}
            <div className="flex justify-between items-center px-10 py-10 -mb-10">
                <img src="https://imgs.search.brave.com/q8xEa-YEzb3ySGKnwjqrL80oa9QLVVCx_r3DKr4OO4U/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3Jzcy1pZWVlLm9y/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8xMS9mb290ZXIt/aWVlZS1sb2dvLTMw/MHgxMDUucG5n" alt="IEEE Footer Logo" className="h-10 bg-black sm:h-12" />
                <img src="https://i.ibb.co/Kxt1VLrP/ieeelogo.png" alt="IEEE Second Footer Logo" className="h-18 sm:h-14" />
            </div>

            {/* Footer as */}
            <div className="flex flex-wrap justify-between gap-4 px-10 py-14">
                <div className="bg-white text-gray-700 rounded-xl shadow-lg p-6 w-full sm:w-[30%]">
                    <h2 className="text-xl font-semibold text-black mb-4">Quick Access</h2>
                    <ul className="space-y-3">
                        <li><a target='_blank' href={"https://www.ieee.org"}className="hover:text-blue-600">About IEEE</a></li>
                        <li><a href={"/IEEE-LU-BRANCH"}className="hover:text-blue-600">About IEEE CS LU SB Chapter</a></li>
                        <li><a href={"/faq"}className="hover:text-blue-600">Frequently Asked Questions</a></li>
                    </ul>
                </div>

                <div className="bg-white text-gray-700 rounded-xl shadow-lg p-6 w-full sm:w-[30%]">
                    <h2 className="text-xl font-semibold text-black mb-4">Resources</h2>
                    <ul className="space-y-3">
                        <li><i className="fa-solid fa-newspaper mr-2"></i><a href={"/news"}className="hover:text-blue-600">News</a></li>
                        <li><i className="fa-solid fa-calendar-days mr-2"></i><a href={"/event"}className="hover:text-blue-600">Upcoming Events</a></li>
                        <li><i className="fa-solid fa-screwdriver-wrench mr-2"></i><a href={"/toolkit"}className="hover:text-blue-600">Toolkit</a></li>
                        <li><i className="fa-solid fa-photo-film mr-2"></i><a href={"/gallery"}className="hover:text-blue-600">Gallery</a></li>
                        <li><i className="fa-solid fa-book mr-2"></i><a href={"/megazine"}className="hover:text-blue-600">Magazines</a></li>
                        <li><i className="fa-solid fa-file-lines mr-2"></i><a href={"/researchPapers"}className="hover:text-blue-600">Research Papers</a></li>
                    </ul>
                </div>

                <div className="bg-white text-gray-700 rounded-xl shadow-lg p-6 w-full sm:w-[30%]">
                    <h2 className="text-xl font-semibold text-black mb-4">Member Area</h2>
                    <ul className="space-y-3">
                        {/* <li><i className="fa-solid fa-user-plus mr-2"></i><a href={"/joinIEEE"}className="hover:text-blue-600">Join IEEE CS LU SB Chapter</a></li> */}
                        <li><i className="fa-solid fa-pen mr-2"></i><a href={"/write"}className="hover:text-blue-600">Write a Blog</a></li>
                        <li><i className="fa-solid fa-blog mr-2"></i><a href={"/blog"}className="hover:text-blue-600">Blogs</a></li>
                        <li><i className="fa-solid fa-trophy mr-2"></i><a href={"/achievement"}className="hover:text-blue-600">Achievements</a></li>
                        <li><i className="fa-solid fa-users-gear mr-2"></i><a href={"/members/excom"}className="hover:text-blue-600">Current Executive Body</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Info Bothrefm Section */}
            <div className="flex flex-wrap justify-between items-start gap-6 px-10 py-12 border-t border-gray-700 mt-[-2rem]">
                <div>
                    <h2 className="text-white text-lg mb-2">Follow Us</h2>
                    <div className="flex gap-4 text-[#045C99] text-xl">
                        <a target="_blank" href="https://www.aedin.com/company/ieeecslu/posts/?feedView=all"><i className="fa-brands fa-aedin"></i></a>
                        <a target="_blank" href="https://www.facebook.com/ieeecslu"><i className="fa-brands fa-facebook"></i></a>
                        <a target="_blank" href='https://www.linkedin.com/company/80228710/'><i className='fa-brands fa-linkedin'></i></a>
                    </div>
                </div>

                <div>
                    <h2 className="text-white text-lg mb-2">Contact</h2>
                    <p className="text-gray-400">ieeecs@lus.ac.bd</p>
                    {/* <p className="text-gray-400">contact@ieeelusb.org</p> */}
                </div>

                <div>
                    <h2 className="text-white text-lg mb-2">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href={"/"} className="hover:text-blue-600">Home</a></li>
                        <li><a href={"/contact"} className="hover:text-blue-600">Contact</a></li>
                        <li><a href={"/faq"} className="hover:text-blue-600">FAQ</a></li>
                    </ul>
                </div>

                <div className="text-sm text-gray-400">
                    <p>Last Update: 15 January, 2025</p>
                    <p className='mb-2'>&copy; 2025 IEEE CS LU SBC - All rights reserved</p>
                    <div className='flex items-center gap-1 flex-wrap'>
                        <p>    
                        Developed By 
                        </p>
                        <a href="/developers" className="text-[#0471be] border p-2 rounded-md">IEEE CS LU SBC Web Developer Team
                        </a></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;