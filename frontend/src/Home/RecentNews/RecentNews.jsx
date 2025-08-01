import React from 'react';
import rn1 from '../../../public/img/rn1.jpg';
import rn2 from '../../../public/img/rn2.jpg';
import rn3 from '../../../public/img/rn3.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../../constants';


const RecentNews = () => {

  const [newsData, setNewsData] = useState([]);
   
      const getNews = async()=>{
              try {
                  const response = await fetch(`${BASE_URL}/news/get-news`,{
                      method: "GET",
                      credentials: "include",
                  });
                  const data = await response.json();
                  setNewsData(data);
              } catch (error) {
                  console.log(error);
              }
          }
      
          useEffect(() => {
              getNews();
          }, [])
      

      
    return (
        <section className="w-[80%] mx-auto my-24 font-sans text-gray-800">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-3xl font-bold text-gray-900">Recent News</h3>
          <a href='/news' className="text-[#045C99] font-bold hover:text-gray-600 transition-colors duration-300">
            Read All News
          </a>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {newsData?.news?.length > 0 ? newsData?.news?.map((news, index) => (
            index < 3 && <article
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-[200px] overflow-hidden bg-gray-100">
                <img
                  src={`${news?.newsImage}`}
                  alt={`News ${index + 1}`}
                  className="w-full h-full object-fit transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h5 className="text-sm uppercase text-gray-500 mb-2">{new Date(news.publicationDate).toDateString()}</h5>
                <h3 className="text-xl font-bold mb-2">
                  <a
                    href={`/news/${news._id}`}
                    className="text-gray-900 hover:text-blue-500 transition-colors duration-300"
                  >
                    {news.title}
                  </a>
                </h3>
                <p className="text-base text-gray-600 leading-relaxed line-clamp-3">{news?.markdown}</p>
              </div>
            </article>
          )) 
          : <p className="font-bold w-full">No News Found</p>
          }
        </div>
      </section>
  
    );
};

export default RecentNews;