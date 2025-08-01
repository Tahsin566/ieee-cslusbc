import React, { useEffect, useState } from "react";
import { FaCalendarDays, FaUser } from "react-icons/fa6";
import { BASE_URL } from "../../constants";
import { categories, TimeCategories } from "../../data/categories";
import { useMagazine } from "../../hooks/useMagazine";


const Megazine = () => {

  const {magazineData,getMagazine,setMagazineData,loading} = useMagazine()

const handleDateFilter = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/magazine/time/${e.target.value}`)
      const data = await response.json()
      if (!response.ok) {
        return
      }
      setMagazineData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoryFilter = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/magazine/category/${e.target.value}`)
      const data = await response.json()
      if (!response.ok) {
        return
      }
      setMagazineData(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getMagazine();
  }, []);


  if(loading){
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
        </div>
    )
}

  return (
    <section className="py-10 bg-white">

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#045C99]">IEEE CS LU SB Chapter Magazines</h1>
          <p className="mt-4 mx-auto max-w-2xl text-gray-600">
            Discover our collection of technical magazines featuring cutting-edge research, student achievements,
            and innovative ideas from the IEEE CS LU SB Chapter community.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          <select onChange={handleDateFilter} className="border px-4 py-2 rounded shadow w-1/2 md:w-1/4">
            <option>Select</option>
            {TimeCategories.map((category, i) => (
                <option key={i} value={category.name}>{category.name}</option>
            ))}
          </select>
          <select onChange={handleCategoryFilter} className="border px-4 py-2 rounded shadow w-1/2 md:w-1/4">
            <option>Select</option>
            {categories.map((category, i) => (
                <option key={i} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>

        {magazineData?.magazine?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Magazine 1 */}
          {magazineData.magazine && magazineData.magazine.map((megazine, i) => (
            <div key={i} className="shadow-md rounded-lg pb-4 overflow-hidden h-[350px] flex flex-col justify-between">
              <img src={`${megazine?.magazineImage}`} alt={megazine.title} className="h-55 w-full object-fit" />
              <div className="flex gap-6 p-3 text-sm text-gray-500">
                <p><FaCalendarDays className="inline mr-1" /> {new Date(megazine.publicationDate).toDateString()}</p>
                <p><FaUser className="inline mr-1" /> {megazine.author}</p>

              </div>
              <h3 className="text-xl font-semibold px-4">{megazine.title}</h3>
              <p className="px-4 text-gray-700 line-clamp-4">{megazine.description}</p>
              <a href={`/megazine/${megazine._id}`} className="text-[#045C99] px-4 hover:underline">Read More</a>
            </div>
          ))}

        </div> : <p className="text-center font-bold text-2xl">No magazine found</p>}
      </div>
    </section>
  );
};

export default Megazine;