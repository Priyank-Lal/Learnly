import React from 'react'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/layout/Landing/Hero'

const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white
      to-purple-50">
      <Navbar />
      <Hero />
      </div>
    </>
  );
}

export default Landing