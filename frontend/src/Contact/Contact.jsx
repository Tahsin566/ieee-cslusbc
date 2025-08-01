import React, { useState } from 'react';
import { FaEnvelope, FaLocationDot, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { BASE_URL } from '../../constants';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Contact = () => {

    const navigate = useNavigate()

    const [contact,setContact]=useState({
        name:"",
        email:"",
        subject:"",
        message:""
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(contact)

        if(!contact.name || !contact.email || !contact.subject || !contact.message){
            toast.error("All fields are required!", {toastId:"contact-error"});
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/contact`, {
                method: "POST",
                body: JSON.stringify(contact),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to add contact");
            }
            toast.success("message sent successfully!", {toastId:"contact-success"});
            e.target.reset();
            setContact({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
            setTimeout(() => {
                navigate('/')
            }, 500);
        } catch (error) {
            toast.error("Failed to add contact: " + error.message, {toastId:"contact-error"});
        }
    }

    return (
        <section className="bg-white px-6 py-10 text-center">
            <h2 className="text-3xl font-bold text-[#045C99] mb-2">Contact Us</h2>
            <p className="text-gray-600 text-lg">Get in touch with IEEE CS LU SB Chapter. We'd love to hear from you!</p>

            <div className="flex flex-col lg:flex-row gap-10 mt-10 max-w-screen-xl mx-auto">
                {/* Contact Form */}
                <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
                    <form className="text-left space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block font-semibold text-sm">Name</label>
                            <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" value={contact.name} onChange={(e)=>setContact({...contact,name:e.target.value})} />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-semibold text-sm">Email</label>
                            <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" value={contact.email} onChange={(e)=>setContact({...contact,email:e.target.value})} />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block font-semibold text-sm">Subject</label>
                            <input type="text" id="subject" className="w-full p-2 border border-gray-300 rounded" value={contact.subject} onChange={(e)=>setContact({...contact,subject:e.target.value})} />
                        </div>

                        <div>
                            <label htmlFor="message" className="block font-semibold text-sm">Message</label>
                            <textarea id="message" rows="4" className="w-full p-2 border border-gray-300 rounded resize-none" value={contact.message} onChange={(e)=>setContact({...contact,message:e.target.value})} />
                        </div>

                        <button type="submit" className="w-full bg-[#045C99] hover:bg-blue-300 text-white font-medium py-2 px-4 rounded transition">Send Message</button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="flex-1 text-left">
                    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                        <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                            <FaEnvelope className="text-[#045C99]" /> ieeecs@lus.ac.bd
                        </p>
                        <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                            <FaLocationDot className="text-[#045C99]" /> Kamal Bazar, Sylhet
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                            <Link target='_blank' to={'https://www.facebook.com/ieeecslu'}>
                            <FaFacebook className="text-gray-400 text-xl hover:text-orange-400 cursor-pointer" />
                            </Link>
                            <Link target='_blank' to={'https://www.linkedin.com/company/80228710/'}>
                            <FaLinkedin className="text-gray-400 text-xl hover:text-orange-400 cursor-pointer" />
                            </Link>
                        </div>
                    </div>

                    {/* Google Map */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7239.096289403768!2d91.80478344191756!3d24.879277761667627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751003d1d5b4aeb%3A0x97605bd36d61e82f!2sKamal%20Bazar!5e0!3m2!1sen!2sbd!4v1740845151106!5m2!1sen!2sbd"
                        className="w-full h-64 rounded-md border-0"
                        loading="lazy"
                        allowFullScreen=""
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;