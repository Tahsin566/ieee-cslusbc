import React, { useEffect, useState } from 'react';
import { FaCloudArrowUp } from "react-icons/fa6";
import { BASE_URL } from "../../constants";
import { useUser } from '../../hooks/useUser';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { researchCategories } from '../../data/categories';

const AddResearch = () => {
    
    const {user} = useUser();

    const navigate = useNavigate()
    const [research,setResearch] = useState({
        title: '',
        author: '',
        department: '',
        category: 'General Science',
        publicationDate:'',
        abstract: '',
        keywords: '',
        methodology: '',
        status: 'ongoing',
        fundingInfo: '',
        paperFile: null,
        supportingDocImage: null,
        email: '',
        phonenumber: '',
        instituteAddress: ''
    })

    
    const [loadingResearch, setLoadingResearch] = useState(false);
    

    
    

    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoadingResearch(true);

        if(!(research.title && research.author && research.department && research.category && research.abstract && research.keywords && research.methodology && research.status && research.fundingInfo && research.paperFile && research.supportingDocImage && research.email && research.phonenumber && research.instituteAddress)){
            toast.error("Please fill all the fields");
            setLoadingResearch(false);
            return
        }

        const formData = new FormData();
        formData.append('title',research.title);
        formData.append('author',research.author);
        formData.append('department',research.department);
        formData.append('category',research.category?.trim());
        formData.append('publicationDate',research.publicationDate);
        formData.append('abstract',research.abstract);
        formData.append('keywords',research.keywords);
        formData.append('methodology',research.methodology);
        formData.append('status',research.status);
        formData.append('fundingInfo',research.fundingInfo);
        formData.append('paperFile',research.paperFile);
        formData.append('supportingDocImage',research.supportingDocImage);
        formData.append('email',research.email);
        formData.append('phonenumber',research.phonenumber);
        formData.append('instituteAddress',research.instituteAddress);
        

        try{
            const response = await fetch(`${BASE_URL}/research/add-paper`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            
            if(!response.ok){
                toast.error("Failed to add research paper");
                setLoadingResearch(false);
                return
            }
            toast.success(user && user?.role === "admin" ? "Paper added successfully": "research paper submitted for review");
            setLoadingResearch(false);
            setTimeout(() => {
                if(user?.role === "admin"){
                    navigate('/dashboard')
                }
                else{
                    navigate('/')
                }
            }, 500);

        }catch(error){
            console.log(error);
            setLoadingResearch(false);
            toast.error("Failed to add research paper");
        }
    }
    
    return (
        <section className=" flex flex-col items-center">
            <div className="w-[90%] lg:w-[60%] mx-auto  text-center">
                <h2 className="text-[#045C99] text-4xl font-bold leading-10 py-5">
                    Add Research
                </h2>
                <p className="text-gray-600 text-lg leading-7 mb-12">
                    Submit your research work to our platform. Please fill in all required information carefully.
                </p>

                <div className="w-[100%] flex flex-col gap-5 ">

                    {/* Research Information */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto ">
                        <h3 className="text-3xl font-bold text-gray-900 pb-5 my-2 ">Research Information</h3>
                        <label className="block text-gray-700 font-medium py-2">Research Title</label>
                        <input type="text" placeholder="Enter research title" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,title:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Author(s) Name</label>
                        <input type="text" placeholder="Enter author name" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,author:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Department/Institution</label>
                        <input type="text" placeholder="Enter department" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,department:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Research Category</label>
                        <select className="w-full p-2 mb-2 border rounded" value={research.category} onChange={(e)=>setResearch({...research,category:e.target.value})}>
                            <option value="">Select Category</option>
                            {researchCategories?.map((category,index)=>(
                                <option key={index}>{category.name}</option>
                            ))}
                        </select>

                        <label className="block text-gray-700 font-medium py-2">Publication Date</label>
                        <input type="date" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,publicationDate:e.target.value || Date.now})}/>

                        <label className="block text-gray-700 font-medium py-2">Abstract/Summary</label>
                        <textarea placeholder="Enter abstract summary" className="w-full h-28 p-2 border rounded resize-none" onChange={(e)=>setResearch({...research,abstract:e.target.value})}></textarea>
                    </div>

                    {/* Research Details */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 pb-5 -mt-5">Research Details</h3>

                        <label className="block text-gray-700 font-medium py-2">Keywords/Tags</label>
                        <input type="text" placeholder="Enter keywords" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,keywords:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Research Methodology</label>
                        <input type="text" placeholder="Enter methodology" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,methodology:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Research Status</label>
                        <select className="w-full p-2 mb-2 border rounded" value={research.status} onChange={(e)=>setResearch({...research,status:e.target.value})}>
                            <option>completed</option>
                            <option>ongoing</option>
                        </select>

                        <label className="block text-gray-700 font-medium py-2">Funding Information</label>
                        <input type="text" placeholder="Enter funding source" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,fundingInfo:e.target.value})}/>
                    </div>

                    {/* File Upload */}
                    {/* <form action="/add-paper" method="post">/ */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 pb-5 -mt-5">File Upload</h3>

                        <label className="block text-gray-700 font-medium py-5">Research Paper (PDF)</label>
                        <label htmlFor="file_upload_1" className="cursor-pointer ">
                            <div className='mb-2 border-2 border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center'>
                                <div className="text-2xl  text-blue-500 flex justify-center"><FaCloudArrowUp /></div>
                                <p><span className="text-[#045C99] font-bold">Upload a file</span> or drag and drop</p>
                                <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                <input type="file" required accept='application/pdf' id="file_upload_1" hidden onChange={(e)=>setResearch({...research,paperFile:e.target.files[0]})}/>
                            </div>
                        </label>

                        <label className="block text-gray-700 font-medium py-2">Supporting Documents</label>
                        <label htmlFor="file_upload_2" className="cursor-pointer">
                            <div className='mb-2 border-2 border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center'>

                                <div className="text-2xl mb-2 text-blue-500 flex justify-center"><FaCloudArrowUp /></div>
                                <p>Upload a <span className="text-[#045C99] font-bold">file</span> or drag and drop</p>
                                <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                <input type="file" id="file_upload_2" accept='image/*' required hidden onChange={(e)=>setResearch({...research,supportingDocImage:e.target.files[0]})}/>
                            </div>
                        </label>
                    </div>
                    {/* Contact Info */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 pb-5 -mt-5">Contact Information</h3>

                        <label className="block text-gray-700 font-medium py-2">Principal Researcher's Email</label>
                        <input type="email" placeholder="Enter email" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,email:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Contact Phone Number</label>
                        <input type="tel" placeholder="Enter phone number" className="w-full p-2 mb-2 border rounded" onChange={(e)=>setResearch({...research,phonenumber:e.target.value})}/>

                        <label className="block text-gray-700 font-medium py-2">Institution Address</label>
                        <input type="text" placeholder="Enter address" className="w-full h-24 p-2 border rounded" onChange={(e)=>setResearch({...research,instituteAddress:e.target.value})}/>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-5 space-x-1">
                        <button type='submit' className="bg-blue-500 text-white px-6 py-2 mb-4 rounded hover:bg-blue-700 transition" onClick={handleSubmit} disabled={loadingResearch}>{loadingResearch ? "Submitting..." : "Submit"}</button>
                    </div>
                    {user?.role === "admin" ? <Link to={'/dashboard'} className="bg-blue-500 w-45 mx-auto text-white px-6 py-2 mb-4 rounded hover:bg-blue-700 transition">Go to dashboard</Link>:
                    <Link to={'/'} className="bg-blue-500 w-40 mx-auto text-white px-6 py-2 mb-4 rounded hover:bg-blue-700 transition">Go to home</Link>}

                </div>
            </div>
        </section>
    );
};

export default AddResearch;