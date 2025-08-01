import { use, useEffect, useState } from 'react';
import userImage from '../../public/img/user.png';
import { BASE_URL } from '../../constants';
import { useResearch } from '../../hooks/useResearch';
import { researchCategories, TimeCategories } from '../../data/categories';


const ResearchPapers = () => {

  const {getAllResearches,research,topAuthor,topcategories,totalAuthor,totalPaper,setResearch,loading} = useResearch()

  const [filteredPaper,setFilteredPaper] = useState()
  const [input, setInput] = useState('');




  const handleDateFilter = async(e) =>{
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/research/time/${e.target.value}`)
      const data = await response.json()
      if (!response.ok) {
        return
      }
      setResearch(data?.research)
    } catch (error) {
      console.log(error)
    }
  }



  const handleCategoryFilter = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`${BASE_URL}/research/category/${e.target.value}`)
        const data = await response.json()
        if (!response.ok) {
            return
        }
        setResearch(data?.research)
    } catch (error) {
        console.log(error)
    }
}
  
  useEffect(() => {
    getAllResearches()
  }, [])

  useEffect(()=>{
    setFilteredPaper(research?.filter((paper) => paper.title.toLowerCase().includes(input.toLowerCase())))
  },[input])


  if(loading){
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
        </div>
    )
}


  return (
    <div className="font-sans bg-gray-50 w-[95%] mx-auto" >
      {/* Navbar */}


      {/* Research Papers Section */}
      <section className="lg:max-w-7xl mx-auto py-12 px-4">
        <div className="lg:flex lg:space-x-16">
          {/* Left Section */}
          <div className="lg:w-2/3">
            <section className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Research Papers</h1>
              <p className="text-gray-600 mt-4">Explore our collection of cutting-edge research papers from IEEE CS LU SB Chapter members. Our publications cover various fields including AI, robotics, communications, and more.</p>
            </section>
            <div className="flex space-x-4 mb-8">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e)=>{
                  setInput(e.target.value)

                }}
              />
              <div className="flex space-x-2">
                <select name="options" id="options" onChange={handleDateFilter} className="px-4 py-2 border rounded-md">
                  <option>Sort by Date</option>
                  {TimeCategories.map((category, i) => (
                    <option key={i} value={category.name}>{category.name}</option>
                  ))}
                </select>
                <select name="options" id="options" onChange={handleCategoryFilter} className="px-4 py-2 border rounded-md">
                  <option>Sort by Category</option>
                  {researchCategories.map((category, i) => (
                    <option key={i} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Research Papers List */}
            {research?.length > 0 ? <div className="space-y-6">
              {research?.map((paper, i) => (
                paper?.title.toLowerCase().includes(input.toLowerCase()) && <div key={i} className="border-b pb-6">
                  <div className="flex justify-between items-center ">
                    <h2 className="text-2xl font-semibold">{paper?.title}</h2>
                    <a href={`/paper/${paper._id}`} className="bg-[#045C99] text-white px-4 py-2 rounded-md hover:bg-blue-300 ">Read More</a>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <p><i className="fa-solid fa-calendar-days"></i> {paper?.createdAt?.split("T")[0]}</p>
                    <p><i className="fa-solid fa-user"></i> {paper?.author}</p>
                  </div>
                  <p className="mt-2 line-clamp-4">{paper?.abstract}</p>
                
                </div>

              ))}

            </div> : <p className="text-center font-bold text-3xl">No paper found</p>}
            {filteredPaper?.length === 0 && input !== '' && <div className="text-center font-bold  py-12 text-2xl">No paper found</div>}
            
          </div>
             

          <div className="lg:w-1/3 mt-12 lg:mt-0">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>Total Papers</p>
                  <h4 className="font-semibold">{totalPaper}</h4>
                </div>
                <div className="flex justify-between">
                  <p>Published This Year</p>
                  <h4 className="font-semibold">{totalPaper}</h4>
                </div>
                <div className="flex justify-between">
                  <p>Active Authors</p>
                  <h4 className="font-semibold">{totalAuthor}</h4>
                </div>
              </div>
            </div>
            {research?.length > 0 && <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>{topcategories && topcategories[0]?._id}</p>
                  <h4 className="font-semibold">{topcategories && topcategories[0]?.count}</h4>
                </div>
                <div className="flex justify-between">
                  <p>{topcategories && topcategories[1]?._id}</p>
                  <h4 className="font-semibold">{topcategories && topcategories[1]?.count}</h4>
                </div>
                <div className="flex justify-between">
                  <p>{topcategories && topcategories?.length > 2 && topcategories[2]?._id}</p>
                  <h4 className="font-semibold">{topcategories && topcategories?.length > 2 && topcategories[2]?.count}</h4>
                </div>
              </div>
            </div>}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Top Authors</h3>

              {topAuthor?.map((author, i) => (
                <div key={i} className="flex items-center space-x-4 mb-6">
                  <img src={userImage} alt="Author" className="w-12 h-12 rounded-full" />
                  <div>
                    <h4 className="font-semibold">{author._id}</h4>
                    <p>{author.count} {author.count > 1 ? "papers" : "paper"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div >
  );
};

export default ResearchPapers;