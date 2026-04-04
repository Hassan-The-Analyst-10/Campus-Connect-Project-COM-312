import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const heroImages = [
    "https://images.pexels.com/photos/7651836/pexels-photo-7651836.jpeg",
    "https://images.pexels.com/photos/8199166/pexels-photo-8199166.jpeg",
    "https://gau.ac.ke/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-24-at-18.56.18-480x298.jpeg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [stats, setStats] = useState({
    students: 0,
    clubs: 0,
    events: 0,
    resources: 0,
    partnerships: 0,
    countries: 0
  });

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targets = {
      students: 25000,
      clubs: 150,
      events: 1250,
      resources: 5000,
      partnerships: 85,
      countries: 45
    };

    const duration = 2500;
    const stepTime = 20;
    const steps = duration / stepTime;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const increment = targets[key] / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepTime);
    });
  }, []);

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const upcomingEvents = [
    { id: 1, title: "International Tech Innovation Summit 2026", date: "April 15, 2026", time: "10:00 AM - 6:00 PM", location: "Main Auditorium", attendees: 1250, speakers: 25, image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", type: "Conference" },
    { id: 2, title: "Annual Career Fair & Networking Gala", date: "April 20, 2026", time: "9:00 AM - 8:00 PM", location: "Student Center & Convention Hall", attendees: 3450, speakers: 50, image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", type: "Career" },
    { id: 3, title: "Global Cultural Festival 2026", date: "April 25-27, 2026", time: "2:00 PM - 11:00 PM", location: "University Grounds", attendees: 5890, speakers: 100, image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg", type: "Cultural" },
    { id: 4, title: "Research Symposium & Innovation Expo", date: "May 5, 2026", time: "9:00 AM - 5:00 PM", location: "Science Complex", attendees: 890, speakers: 40, image: "https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg", type: "Academic" },
    { id: 5, title: "Leadership Summit with Industry Experts", date: "May 12, 2026", time: "10:00 AM - 4:00 PM", location: "Business School", attendees: 650, speakers: 15, image: "https://images.pexels.com/photos/267974/pexels-photo-267974.jpeg", type: "Leadership" }
  ];

  const popularClubs = [
    { id: 1, name: "Tech Innovators Club", members: 1250, category: "Technology", icon: "💻", color: "bg-blue-500", description: "AI, Web Dev, Cybersecurity" },
    { id: 2, name: "Entrepreneurship Hub", members: 980, category: "Business", icon: "🚀", color: "bg-green-500", description: "Startups, Pitch Competitions" },
    { id: 3, name: "Arts & Creative Collective", members: 750, category: "Arts", icon: "🎨", color: "bg-purple-500", description: "Design, Photography, Music" },
    { id: 4, name: "Sports & Wellness Council", members: 2100, category: "Sports", icon: "⚽", color: "bg-red-500", description: "Tournaments, Fitness" },
    { id: 5, name: "Debate & Public Speaking", members: 620, category: "Academics", icon: "🎙️", color: "bg-yellow-500", description: "MUN, Oratory Skills" },
    { id: 6, name: "Volunteer Corps", members: 850, category: "Social", icon: "🤝", color: "bg-pink-500", description: "Community Service" }
  ];

  const testimonials = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Dean of Students", content: "CampusConnect has revolutionized how our students engage with campus life. The platform has increased student participation by over 200% in extracurricular activities.", rating: 5, image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Prof. Michael Chen", role: "Department Chair, Computer Science", content: "The academic collaboration tools have transformed our department. Students are more engaged, and we've seen a significant improvement in project outcomes.", rating: 5, image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { id: 3, name: "Emily Rodriguez", role: "Student Body President", content: "As a student leader, CampusConnect has been invaluable for organizing events and communicating with the student body. It's become an essential part of our university experience.", rating: 5, image: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: 4, name: "James Wilson", role: "Career Services Director", content: "The career portal has connected our students with over 500 employers. The internship placement rate has doubled since implementing CampusConnect.", rating: 5, image: "https://randomuser.me/api/portraits/men/4.jpg" }
  ];

  const features = [
    {
      icon: "👥",
      title: "Smart Networking & Community",
      description: "Connect with students, alumni, and faculty based on shared interests, academic majors, and career aspirations using our AI-powered matching system.",
      color: "bg-green-100",
      textColor: "text-green-600",
      benefits: ["1,000+ daily connections", "Interest-based groups", "Mentorship matching"]
    },
    {
      icon: "📚",
      title: "Comprehensive Learning Hub",
      description: "Access an extensive library of study materials, past examination papers, video lectures, and collaborative study groups for every course in your curriculum.",
      color: "bg-blue-100",
      textColor: "text-blue-600",
      benefits: ["5,000+ resources", "24/7 study groups", "Expert tutoring"]
    },
    {
      icon: "🎯",
      title: "Career Development Portal",
      description: "Discover internships, job opportunities, and mentorship programs from top employers. Build your professional network and prepare for your dream career.",
      color: "bg-purple-100",
      textColor: "text-purple-600",
      benefits: ["500+ employers", "Interview preparation", "Resume building tools"]
    },
    {
      icon: "🏆",
      title: "Gamification & Rewards",
      description: "Earn badges, points, and recognition for academic excellence, event participation, and community contributions. Climb leaderboards and win exciting prizes.",
      color: "bg-yellow-100",
      textColor: "text-yellow-600",
      benefits: ["50+ achievement badges", "Monthly competitions", "Scholarship opportunities"]
    },
    {
      icon: "💬",
      title: "Real-time Communication",
      description: "Instant messaging, video calls, and group chats for seamless collaboration with peers, faculty, and staff. Never miss an important announcement.",
      color: "bg-pink-100",
      textColor: "text-pink-600",
      benefits: ["Unlimited messaging", "Group video calls", "Announcement boards"]
    },
    {
      icon: "📅",
      title: "Smart Calendar & Reminders",
      description: "Personalized schedules, deadline tracking, and smart reminders for classes, assignments, events, and exams. Sync across all your devices.",
      color: "bg-indigo-100",
      textColor: "text-indigo-600",
      benefits: ["Automatic scheduling", "Deadline alerts", "Cross-platform sync"]
    },
    {
      icon: "🎓",
      title: "Academic Advising",
      description: "Connect with academic advisors, plan your course schedule, track degree progress, and receive personalized recommendations for your academic journey.",
      color: "bg-teal-100",
      textColor: "text-teal-600",
      benefits: ["Degree audit tools", "Course recommendations", "Advisor chat"]
    },
    {
      icon: "🌍",
      title: "Global Learning Community",
      description: "Connect with students from partner universities worldwide. Participate in international events, cultural exchanges, and global study programs.",
      color: "bg-orange-100",
      textColor: "text-orange-600",
      benefits: ["45+ countries", "Exchange programs", "Global events"]
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description: "Track your engagement, academic performance, and skill development with detailed analytics and personalized recommendations for improvement.",
      color: "bg-cyan-100",
      textColor: "text-cyan-600",
      benefits: ["Performance tracking", "Skill assessment", "Personalized insights"]
    }
  ];

  // const partners = [
  //   { name: "Google", logo: "https://logo.clearbit.com/google.com", industry: "Technology" },
  //   { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", industry: "Technology" },
  //   { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", industry: "E-commerce" },
  //   { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com", industry: "Consulting" },
  //   { name: "UNESCO", logo: "https://logo.clearbit.com/unesco.org", industry: "Education" },
  //   { name: "World Bank", logo: "https://logo.clearbit.com/worldbank.org", industry: "Finance" }
  // ];

  const faqs = [
    { q: "Is CampusConnect free for students?", a: "Yes! CampusConnect is completely free for all enrolled students. We believe every student should have access to quality campus engagement tools." },
    { q: "How do I join a club?", a: "Simply browse the clubs section, find one that interests you, and click 'Join Club'. You'll be added automatically and receive notifications about upcoming events." },
    { q: "Can I create my own club?", a: "Absolutely! Any student can create a club. Just submit a proposal through our club creation form, and once approved, you'll have your own club page." },
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Image Carousel */}
      <div className="relative w-full h-[100vh] overflow-hidden bg-gradient-to-br from-gray-900 to-green-900">
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img 
                src={image}
                alt={`University Campus ${index + 1} - CampusConnect`}
                className="w-full h-full object-cover object-center"
                style={{
                  filter: "brightness(1.05) contrast(1.1) saturate(1.1)",
                }}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
            </div>
          ))}
        </div>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="animate-fadeInUp">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/30">
                🌟 Trusted by 25,000+ Students Worldwide
              </div>
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight animate-slideInLeft">
                Campus<span className="text-green-400">Connect</span>
              </h1>
              <p className="text-2xl md:text-3xl mb-4 text-gray-200 max-w-4xl mx-auto animate-slideInRight font-light">
                Your All-in-One Platform for
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
                <Link to="/user/register">
                  <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-lg">
                    Get Started Free
                  </button>
                </Link>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-lg border-2 border-white/30 transition-all duration-300 text-lg">
                  Watch Demo Video
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={() => goToImage(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => goToImage(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-green-100">Making a difference in campus communities worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats.students.toLocaleString()}+</div>
              <div className="text-green-100">Active Students</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats.clubs}+</div>
              <div className="text-green-100">Student Clubs</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats.events.toLocaleString()}+</div>
              <div className="text-green-100">Events Hosted</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats.resources.toLocaleString()}+</div>
              <div className="text-green-100">Resources Shared</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats.partnerships}+</div>
              <div className="text-green-100">Corporate Partners</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">{stats.countries}+</div>
              <div className="text-green-100">Countries</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Welcome Section */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 bg-green-100 text-green-600 rounded-full text-sm font-semibold mb-4">
              Why Choose CampusConnect
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Revolutionizing the <span className="text-green-600">Student Experience</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join the fastest-growing campus community platform that connects students, faculty, and alumni in a single, powerful ecosystem designed for the modern university experience.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Key Benefits:</p>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-green-600 font-semibold flex items-center">
                    Learn More 
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Events Section */}
          <div className="mb-32">
            <div className="flex justify-between items-center mb-12">
              <div>
                <div className="inline-block px-6 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  📅 Upcoming Events
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Don't Miss Out on These Opportunities</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Join thousands of students at our signature events designed to inspire, educate, and connect.</p>
              </div>
              <Link to="/events">
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors text-lg">
                  View All Events →
                </button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="h-56 overflow-hidden relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-sm">{event.attendees.toLocaleString()} attending • {event.speakers} speakers</span>
                      </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 font-semibold">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Clubs Section */}
          <div className="mb-32">
            <div className="flex justify-between items-center mb-12">
              <div>
                <div className="inline-block px-6 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
                  🎯 Find Your Community
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Discover Your Passion</h2>
                <p className="text-xl text-gray-600 max-w-3xl">Join 150+ student clubs and organizations. Connect with like-minded peers who share your interests.</p>
              </div>
              <Link to="/clubs">
                <button className="text-green-600 font-semibold hover:text-green-700 transition-colors text-lg">
                  Explore All Clubs →
                </button>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {popularClubs.map((club) => (
                <div key={club.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center group">
                  <div className={`w-24 h-24 ${club.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl">{club.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{club.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{club.category}</p>
                  <p className="text-xs text-gray-500 mb-3">{club.description}</p>
                  <p className="text-green-600 font-semibold text-sm mb-3">{club.members.toLocaleString()} members</p>
                  <button className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors group-hover:underline">
                    Join Club →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-yellow-100 text-yellow-600 rounded-full text-sm font-semibold mb-4">
                ⭐ What Our Community Says
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Trusted by Students & Faculty</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied users who have transformed their campus experience with CampusConnect
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-green-500" />
                    <div>
                      <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partners Section */}
          {/* <div className="mb-32">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">
                🤝 Our Partners
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Trusted by Leading Organizations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We collaborate with industry leaders to provide the best opportunities for our students
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                  <img src={partner.logo} alt={partner.name} className="h-12 object-contain mx-auto mb-3" />
                  <p className="text-sm font-semibold text-gray-800">{partner.name}</p>
                  <p className="text-xs text-gray-500">{partner.industry}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* FAQ Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4">
                ❓ Frequently Asked Questions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Got Questions? We've Got Answers</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about CampusConnect. Can't find what you're looking for? Feel free to contact our support team.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-6 list-none">
                      <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.q}</h3>
                      <div className="text-green-600 group-open:rotate-180 transition-transform duration-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Campus Experience?</h2>
            <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
              Join over 25,000 students who are already using CampusConnect to enhance their academic journey, build meaningful connections, and prepare for successful careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/user/register">
                <button className="bg-white text-green-600 font-semibold py-4 px-10 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg shadow-xl">
                  Get Started - It's Free
                </button>
              </Link>
              <Link to="/about">
                <button className="bg-green-700 text-white font-semibold py-4 px-10 rounded-lg hover:bg-green-800 transition-all duration-300 text-lg">
                  Schedule a Demo
                </button>
              </Link>
            </div>
            <p className="text-sm text-green-100 mt-6">No credit card required • Free forever for students • Cancel anytime</p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}

export default Home;