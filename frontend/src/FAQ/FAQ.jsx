import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";

const FAQ = () => {

  const {user,getUser} = useUser()

  const [selectedCategory,setSelectedCategory] = useState("")

  const [query,setQuery] = useState({
    email:"",
    question:""
  })

  const [faq, setFaq] = useState([])

  const [allFaq,setAllFaq] = useState([])

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaq,setFilteredFaq] = useState([])

  const [loading,setLoading] = useState(false)

  const getFaq = async()=>{
    setLoading(true)
    try{
      const response = await fetch(`${BASE_URL}/faq`, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json();

      if(!response.ok){
        setLoading(false)
        return
      }
      setFaq(data.faq)
      setAllFaq(data.faq)
      setLoading(false)
      setFilteredFaq(data.faq)
    }catch(error){
      console.log(error);
      setLoading(false)
    }
  }
  
  
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
      
      try {
      const response = await fetch(`${BASE_URL}/contact/faq-query`, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message)
      }
      toast.success('Your query added successfully!',{toastId:"query-success"})
      e.target.reset()
    } catch (error) {
      console.log(error)
      toast.error('Failed to add your question: ' + error.message,{toastId:"query-error"})
    }
  }
  
  useEffect(()=>{
    getFaq()
    getUser()
  },[])
  
  useEffect(()=>{
    const filtered = faq?.filter((item)=>item.question.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredFaq(filtered)
  },[searchQuery])
  
  if(loading){
    return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
  }
  

  return (
    <div className="font-['Roboto']">
      {/* FAQ Title Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-[#045C99]">Frequently Asked Questions</h1>
        <p className="mt-4 text-gray-600">
          Find answers to common questions about IEEE CS LU SB Chapter membership, events, technical
          resources, and more. <br /> Can't find what you're looking for? Contact our
          support team.
        </p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Frequently Asked Questions"
            className="w-1/2 px-4 py-3 rounded-lg border border-gray-300"
            onChange={(e)=>setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 lg:px-20">


        <div className="lg:col-span-1">
          <div className="shadow-md p-6 rounded-lg leading-8">
            <h3 className="text-xl font-semibold">Popular Post</h3>

            {new Array(...new Set(faq?.map((item,index)=> item.category))).map((item,index)=>(
              <div key={index}>
              <button onClick={()=>{
                setSelectedCategory(item)
                }} className={`mt-2 ${item === selectedCategory ? "text-[#045C99]" : "text-gray-600"} cursor-pointer`}>{item}</button>
              </div>
            ))}
          </div>
        </div>

        {filteredFaq?.length > 0 ? <div className="lg:col-span-2">

        {(!selectedCategory && <div className="lg:col-span-2">
          {allFaq?.map((item,index)=>(
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) && <div key={index}>
              {<div className="bg-white shadow-md p-6 mb-6 rounded-lg">
              <div className="text-gray-400 text-sm font-bold">{item.category}</div>
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p>
                  {item.answer}
                </p>
              </div>}
            </div>
          ))}
        </div>)}

       {selectedCategory && <div className="lg:col-span-2">
          {faq?.map((item,index)=>(
            item.category === selectedCategory && item.question.toLowerCase().includes(searchQuery.toLowerCase()) && <div key={index}>
              {<div className="bg-white shadow-md p-6 mb-6 rounded-lg">
              <div className="text-gray-400 text-sm font-bold">{item.category}</div>
                <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                <p>
                  {item.answer}
                </p>
              </div>}
            </div>
          ))}
          </div>}

          </div>:<div className="lg:col-span-2">
          <p className=" text-gray-600 font-semibold">No FAQ found</p>
          </div>}
        
      </section>

      {/* Ask Question Form */}
      {/* {!user && <section className="bg-white w-4/5 mx-auto my-10 p-6 rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Couldn't find what you're looking for?
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <label htmlFor="email" className="w-3/4 text-left">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg"
            value={query.email}
            onChange={(e)=>setQuery({...query,email:e.target.value})}
          />

          <label htmlFor="qus_form" className="w-3/4 text-left">Your Question</label>
          <textarea
            id="qus_form"
            placeholder="Write your question here..."
            className="w-3/4 h-28 px-4 py-2 border border-gray-300 rounded-lg resize-none"
            value={query.question}
            onChange={(e)=>setQuery({...query,question:e.target.value})}
          ></textarea>
          <button className="bg-[#045C99] text-white px-6 py-2 rounded-lg hover:bg-blue-300 transition-colors duration-300 mt-6">
            Submit
          </button>
        </form>
      </section>} */}

      {/* Feedback Section */}
      <section className="bg-white w-2/5 mx-auto my-10 p-6 rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-6">Was this FAQ Helpful?</h3>
        <div className="grid grid-cols-2 gap-6">
          <button onClick={()=>toast.info('Thank you for the feedback',{toastId:"feedback-yes"})} className="bg-white px-4 py-2 rounded-lg hover:bg-black hover:text-white cursor-pointer">
            <i className="fa-solid fa-thumbs-up mr-2 text-green-600"></i>Yes
          </button>
          <button onClick={()=>toast.info('Thank you for the feedback',{toastId:"feedback-no"})} className="bg-white px-4 py-2 rounded-lg hover:bg-black hover:text-white cursor-pointer">
            <i className="fa-solid fa-thumbs-down mr-2 text-red-600"></i>No
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
