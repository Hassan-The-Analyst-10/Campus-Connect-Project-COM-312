import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

function Home() {
  const heroImages = [
    "https://images.pexels.com/photos/7651836/pexels-photo-7651836.jpeg",
    "https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg",
    "https://gau.ac.ke/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-18.56.18-480x298.jpeg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Image Carousel */}
      <div className="relative w-full h-[80vh] overflow-hidden bg-gradient-to-br from-gray-900 to-green-900">
        {/* Background container with image carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              }`}
            >
              <img 
                src={image}
                alt={`University Campus ${index + 1} - CampusConnect`}
                className="w-full h-full object-cover object-center"
                style={{
                  filter: "brightness(1.05) contrast(1.1) saturate(1.1)",
                  WebkitFilter: "brightness(1.05) contrast(1.1) saturate(1.1)",
                }}
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Subtle gradient overlays for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
            </div>
          ))}
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="text-center max-w-2xl  py-12 px-8 rounded-2xl border">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Campus<span className="text-green-400">Connect</span>
            </h1>
          
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Campus
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-lg border border-white/30 transition-all duration-300">
                Join Community
              </button>
            </div>
          </div>
        </div>
        
        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Previous/Next buttons for manual control */}
        <button
          onClick={() => goToImage(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 hover:opacity-100 group"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        
        <button
          onClick={() => goToImage(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 opacity-0 hover:opacity-100 group"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        
        {/* Scroll indicator (moved up a bit) */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-green-600">CampusConnect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform designed to enhance your university experience through seamless connectivity and engaging campus activities.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Community</h3>
              <p className="text-gray-600">Connect with peers, join clubs, and participate in campus events.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Academic Resources</h3>
              <p className="text-gray-600">Access study materials, schedule meetings, and collaborate on projects.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Campus Updates</h3>
              <p className="">Stay informed about campus news, events, and important announcements.</p>
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
}

export default Home;