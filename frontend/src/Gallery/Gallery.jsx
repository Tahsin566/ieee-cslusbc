import React, { useEffect, useState } from "react";
import { useGallery } from "../../hooks/useGallery";
import { BASE_URL } from "../../constants";


const galleryImages = [
  "gellary1.jpg", "gellary2.jpg", "gellary3.jpg",
  "gellary4.jpg", "gellary5.jpg", "gellary6.jpg",
  "gellary7.jpg", "gellary8.jpg", "gellary9.jpg"
];

const Gallery = () => {

  const {gallery,getAllGalleryPhoto} = useGallery()

  useEffect(() => {
    getAllGalleryPhoto()
  }, [])

  return (
    <section className="container mx-auto px-4 py-10 font-roboto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#045C99]">Gallery</h1>
        <p className="text-gray-600">Explore our memorable moments and achievements through pictures</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((img, index) => (
          <div
            key={index}
            className="rounded-[10px_0_10px_0] shadow-md overflow-hidden bg-white group transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src={`${img.image}`}
              alt={`Gallery ${index + 1}`}
              className="w-full h-[250px] object-cover p-2 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;