import React, { useEffect, useState } from 'react';
import { FaCloudArrowUp } from "react-icons/fa6";
import { useUser } from '../../hooks/useUser';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from "../../constants";
import { toast } from 'react-toastify';
import { researchCategories } from '../../data/categories';

const UpdateResearch = () => {

    const { user, getUser,loading } = useUser();

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    
    const [researchCategory, setResearchCategory] = useState([]);
    const [research, setResearch] = useState({
        title: '',
        author: '',
        department: '',
        category: 'General Science',
        publicationDate: '',
        abstract: '',
        keywords: '',
        methodology: '',
        status: 'ongoing',
        fundingInfo: '',
        paperFile: '',
        supportingDocImage: '',
        email: '',
        phonenumber: '',
        instituteAddress: ''
    })



    const getsingleResearch = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/research/${id}`, {
                method: 'GET',
                credentials: 'include'
            })

            const data = await response.json();
            
            if (!response.ok) {
                return
            }
            setResearch({
                title: data.research.title,
                author: data.research.author,
                department: data.research.department,
                category: data.research.category,
                publicationDate: data.research.publicationDate,
                abstract: data.research.abstract,
                keywords: data.research.keywords,
                methodology: data.research.methodology,
                status: data.research.status,
                fundingInfo: data.research.fundingInfo,
                paperFile: data.research.paperFile,
                supportingDocImage: data.research.supportingDocImage,
                email: data.research.email,
                phonenumber: data.research.phonenumber,
                instituteAddress: data.research.instituteAddress
            })
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    

    



    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', research.title);
        formData.append('author', research.author);
        formData.append('department', research.department);
        formData.append('category', research.category?.trim());
        formData.append('publicationDate', research.publicationDate || '');
        formData.append('abstract', research.abstract);
        formData.append('keywords', research.keywords);
        formData.append('methodology', research.methodology);
        formData.append('status', research.status);
        formData.append('fundingInfo', research.fundingInfo);
        formData.append('paperFile', research.paperFile);
        formData.append('supportingDocImage', research.supportingDocImage);
        formData.append('email', research.email);
        formData.append('phonenumber', research.phonenumber);
        formData.append('instituteAddress', research.instituteAddress);


        try {

            if(!(research.title && research.author && research.department && research.category && research.abstract && research.keywords && research.methodology && research.status && research.fundingInfo && research.paperFile && research.supportingDocImage && research.email && research.phonenumber && research.instituteAddress)){
                toast.error("Please fill all the fields");
                return
            }

            const response = await fetch(`${BASE_URL}/research/update-research`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            if (!response.ok) {
                toast.error("Failed to update research paper");
                return
            }
            toast.success("Research paper updated successfully");
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);

        } catch (error) {
            console.log(error);
            toast.error("Failed to update research paper");
        }
    }

    useEffect(() => {
        getUser();
        getsingleResearch(id);
    }, [])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
            </div>
        )
    }

    return (
        user?.role === 'admin' ? <section className=" flex flex-col items-center">
            <div className="w-[90%] lg:w-[60%] mx-auto  text-center">
                <h2 className="text-[#045C99] text-4xl font-bold leading-10 py-5">
                    Update Research
                </h2>
                <p className="text-gray-600 text-lg leading-7 mb-12">
                    Submit your research work to our platform. Please fill in all required information carefully.
                </p>

                <div className="w-[100%] flex flex-col gap-5 ">

                    {/* Research Information */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto ">
                        
                        <h3 className="text-3xl font-bold text-gray-900 pb-5 my-2 ">Research Information</h3>
                        <label className="block text-gray-700 font-medium py-2">Research Title</label>
                        <input type="text" placeholder="Enter research title" className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, title: e.target.value })} value={research.title} />

                        <label className="block text-gray-700 font-medium py-2">Author(s) Name</label>
                        <input type="text" placeholder="Enter author name" className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, author: e.target.value })}  value={research.author}/>

                        <label className="block text-gray-700 font-medium py-2">Department/Institution</label>
                        <input type="text" placeholder="Enter department" className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, department: e.target.value })} value={research.department}/>

                        <label className="block text-gray-700 font-medium py-2">Research Category</label>
                        <select className="w-full p-2 mb-2 border rounded" value={research.category} onChange={(e) => setResearch({ ...research, category: e.target.value })}>
                            <option value="">Select Category</option>
                            {researchCategories?.map((category, index) => (
                                <option key={index}>{category.name}</option>
                            ))}
                        </select>

                        <label className="block text-gray-700 font-medium py-2">Publication Date</label>
                        <input type="date" className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, publicationDate: e.target.value })} />

                        <label className="block text-gray-700 font-medium py-2">Abstract/Summary</label>
                        <textarea placeholder="Enter abstract summary" className="w-full h-28 p-2 border rounded resize-none" onChange={(e) => setResearch({ ...research, abstract: e.target.value })} value={research.abstract}></textarea>
                    </div>

                    {/* Research Details */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 pb-5 -mt-5">Research Details</h3>

                        <label className="block text-gray-700 font-medium py-2">Keywords/Tags</label>
                        <input type="text" placeholder="Enter keywords" value={research.keywords} className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, keywords: e.target.value })} />

                        <label className="block text-gray-700 font-medium py-2">Research Methodology</label>
                        <input type="text" placeholder="Enter methodology" className="w-full p-2 mb-2 border rounded" value={research.methodology} onChange={(e) => setResearch({ ...research, methodology: e.target.value })} />

                        <label className="block text-gray-700 font-medium py-2">Research Status</label>
                        <select className="w-full p-2 mb-2 border rounded" value={research.status} onChange={(e) => setResearch({ ...research, status: e.target.value })}>
                            <option>completed</option>
                            <option>ongoing</option>
                        </select>

                        <label className="block text-gray-700 font-medium py-2">Funding Information</label>
                        <input type="text" placeholder="Enter funding source" className="w-full p-2 mb-2 border rounded" value={research.fundingInfo} onChange={(e) => setResearch({ ...research, fundingInfo: e.target.value })} />
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
                                <input type="file" id="file_upload_1" required accept='application/pdf' hidden onChange={(e) => setResearch({ ...research, paperFile: e.target.files[0] })} />
                            </div>
                        </label>

                        <label className="block text-gray-700 font-medium py-2">Supporting Documents</label>
                        <label htmlFor="file_upload_2" className="cursor-pointer">
                            <div className='mb-2 border-2 border-dashed border-gray-300 rounded-lg p-5 flex flex-col items-center justify-center'>

                                <div className="text-2xl mb-2 text-blue-500 flex justify-center"><FaCloudArrowUp /></div>
                                <p>Upload a <span className="text-[#045C99] font-bold">file</span> or drag and drop</p>
                                <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                <input type="file" id="file_upload_2" required accept='image/*' hidden onChange={(e) => setResearch({ ...research, supportingDocImage: e.target.files[0] })} />
                            </div>
                        </label>
                    </div>
                    {/* Contact Info */}
                    <div className="w-[100%] bg-white p-8 rounded-lg shadow-lg text-left mx-auto">
                        <h3 className="text-xl font-semibold text-gray-900 pb-5 -mt-5">Contact Information</h3>

                        <label className="block text-gray-700 font-medium py-2">Principal Researcher's Email</label>
                        <input type="email" placeholder="Enter email" className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, email: e.target.value })} value={research.email}/>

                        <label className="block text-gray-700 font-medium py-2">Contact Phone Number</label>
                        <input type="tel" placeholder="Enter phone number" className="w-full p-2 mb-2 border rounded" onChange={(e) => setResearch({ ...research, phonenumber: e.target.value })} value={research.phonenumber} />

                        <label className="block text-gray-700 font-medium py-2">Institution Address</label>
                        <input type="text" placeholder="Enter address" className="w-full h-24 p-2 border rounded" onChange={(e) => setResearch({ ...research, instituteAddress: e.target.value })} value={research.instituteAddress} />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-5">
                        <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 mb-4 rounded hover:bg-blue-700 transition">Update Research</button>
                    </div>
                    <Link to={'/dashboard'} className="bg-blue-500 w-50 mx-auto text-white px-6 py-2 mb-4 rounded hover:bg-blue-700 transition">Go to Dashboard</Link>

                </div>
            </div>
        </section> : <div className="min-h-screen"></div>
    );
};

export default UpdateResearch;