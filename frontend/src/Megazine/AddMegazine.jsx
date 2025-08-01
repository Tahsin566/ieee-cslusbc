import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { categories } from '../../data/categories';

const AddMegazine = () => {

    const {user,getUser,loading} = useUser();
    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [megazineData, setMegazineData] = useState({
        title: "",
        description: "",
        publicationDate: "",
        issueNumber: "",
        volumeNumber:"",
        category:"",
        author:"",
        magazineImage:"",
        magazinePdf:""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!(megazineData.title && megazineData.author && megazineData.category && megazineData.description && megazineData.magazineImage && megazineData.magazinePdf && megazineData.issueNumber && megazineData.volumeNumber)){
            toast.error("Please fill all the fields");
            return
        }

        const formData = new FormData();
        formData.append("title", megazineData.title);
        formData.append("description", megazineData.description);
        formData.append("publicationDate", megazineData.publicationDate);
        formData.append("issueNumber", megazineData.issueNumber);
        formData.append("volumeNumber", megazineData.volumeNumber);
        formData.append("category", megazineData.category?.trim());
        formData.append("author", megazineData.author);
        formData.append("magazineImage", megazineData.magazineImage);
        formData.append("magazinePdf", megazineData.magazinePdf);


        try {
            const response = await fetch(`${BASE_URL}/magazine`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });
            const data = await response.json();
            if(!data.success){
                toast.error("Failed to add magazine");
                return
            }
            toast.success("Magazine added successfully!");
            setTimeout(() => {
                navigate('/dashboard')
            }, 500);
        
        } catch (error) {
            console.error("Error adding magazine:", error);
            toast.error("Failed to add magazine");
        }

        
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setMegazineData({ ...megazineData, magazineImage: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(()=>{
        getUser();
    },[])

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        setMegazineData({ ...megazineData, magazinePdf: file });
        if (file) {
            setPdfFile(file);
        }
    };

    if(loading){
        return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>  
    }

    return (
        user?.role === 'admin'? <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-[#045C99]     -600 mb-2">Add Magazine</h1>
                <p className="text-center text-gray-600 mb-10">Submit a new magazine to our platform. Please fill in all required information carefully.</p>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Magazine Information</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Magazine Title */}
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Magazine Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter magazine title"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={megazineData.title}
                                onChange={(e) => setMegazineData({ ...megazineData, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                placeholder="Enter author name"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={megazineData.author}
                                onChange={(e) => setMegazineData({ ...megazineData, author: e.target.value })}
                            />
                        </div>

                        {/* Publication Date */}
                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Publication Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={megazineData.publicationDate}
                                onChange={(e) => setMegazineData({ ...megazineData, publicationDate: e.target.value })}
                            />
                        </div>

                        {/* Magazine Description */}
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Magazine Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Enter a description of the magazine content..."
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={megazineData.description}
                                onChange={(e) => setMegazineData({ ...megazineData, description: e.target.value })}
                            ></textarea>
                        </div>

                        {/* Cover Image Upload */}
                        <div>
                            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Magazine Cover Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-[#045C99]
                                hover:file:bg-blue-100"
                                onChange={handleImageChange}
                                required
                            />

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">Cover Image Preview:</p>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full max-h-72 object-contain border rounded-md shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        {/* PDF Upload */}
                        <div>
                            <label htmlFor="pdf" className="block text-gray-700 font-medium mb-2">Magazine PDF</label>
                            <input
                                type="file"
                                id="pdf"
                                name="pdf"
                                accept="application/pdf"
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-[#045C99]
                                hover:file:bg-blue-100"
                                onChange={handlePdfChange}
                                required
                            />

                            {/* PDF Preview/Info */}
                            {pdfFile && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <p className="font-medium">{pdfFile.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Extra Magazine Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6 mt-6">
                            <div>
                                <label htmlFor="volume" className="block text-gray-700 font-medium mb-2">Volume Number</label>
                                <input
                                    type="number"
                                    id="volume"
                                    name="volume"
                                    min="1"
                                    placeholder="Volume #"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={megazineData.volumeNumber}
                                    onChange={(e) => setMegazineData({ ...megazineData, volumeNumber: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="issue" className="block text-gray-700 font-medium mb-2">Issue Number</label>
                                <input
                                    type="number"
                                    id="issue"
                                    name="issue"
                                    min="1"
                                    placeholder="Issue #"
                                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={megazineData.issueNumber}
                                    onChange={(e) => setMegazineData({ ...megazineData, issueNumber: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Magazine Category */}
                        <div>
                            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={megazineData.category}
                                onChange={(e) => setMegazineData({ ...megazineData, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories?.map((category,index)=>(
                                    <option key={index}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#045C99] text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-300"
                            >
                                Submit Magazine
                            </button>
                        </div>
                    </form>
                </div>

                {/* Additional Information */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-[#045C99]     -800 mb-2">Submission Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Magazine cover image should be high quality (recommended size: 800x1200 pixels)</li>
                        <li>PDF file should be properly formatted and optimized (max size: 20MB)</li>
                        <li>Ensure all content follows IEEE CS LU SB Chapter content guidelines</li>
                        <li>Include relevant references and citations for all technical content</li>
                        <li>All submissions will be reviewed by the editorial team before publication</li>
                    </ul>
                </div>
            </div>
        </div>: <div className="min-h-screen"></div>
    );
};

export default AddMegazine;