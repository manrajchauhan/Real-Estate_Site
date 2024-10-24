import React from 'react'
import NavBar from './NavBar'
import HeroBottom from './HeroBottom'

const HomeHeader = () => {
  return (
      <div className='relative h-[95vh] flex flex-col justify-between'>
        <NavBar />
        <HeroBottom />
        <div className="bg-black/40 h-full w-full absolute top-0 left-0 -z-10"></div>
        <video
          src="/loop-1.mp4"
          autoPlay
          muted
          loop
          className='w-full h-full object-cover -z-20 absolute top-0 left-0'></video>
      </div>
  )
}



export default HomeHeader
