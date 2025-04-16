import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t' >
<Title text1={'ABOUT'} text2={'US'}/>
      </div>
<div className='my-10 flex flex-col md:flex-row gap-16 ' >
<img className='w-full md:max-w-[450px]'  src={assets.about_img} alt="about-img" />
<div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600' >
<p  >Welcome to wearHaus — your ultimate destination for stylish, high-quality clothing that fits every occasion. We are more than just a clothing brand; we are a movement dedicated to empowering you to express your unique style.</p>
<p> Founded in 2025, wearHaus started with a simple idea: to offer fashion-forward, comfortable, and affordable clothing that doesn't compromise on quality. What began as a passion project has since blossomed into a global brand known for its attention to detail, customer-first approach, and bold designs. </p>
<b className='text-gray-800' >Our Mission</b>
<p>We believe that fashion should be accessible, diverse, and sustainable. Our mission is to bring you timeless, trend-inspired clothing that fits into your lifestyle while reducing our environmental impact. From sourcing materials responsibly to partnering with ethical manufacturers, we are committed to making fashion a force for good.</p>
</div>
</div>
<div className='text-xl py-4' >
<Title text1={'WHY'} text2={'CHOOSE US'}/>
</div>

<div className='flex flex-col md:flex-row text-sm mb-20' >
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
  <b>Quality Assurance</b>
<p className='text-gray-600' >At wearHaus, we stand behind every product we make. Quality is at the core of everything we do, and we go above and beyond to ensure that you receive only the best.</p>
</div>

<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
  <b>Convenience:</b>
<p className= 'text-gray-600'>We understand that shopping should be a hassle-free experience, which is why we’ve designed our process to be as convenient as possible. Shopping with wearHaus.</p>
</div>

<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5' >
  <b>Exceptional Customer Service:</b>
<p className='text-gray-600' >We understand that shopping should be a hassle-free experience, which is why we’ve designed our process to be as convenient as possible. Shopping with wearHaus is easy and enjoyable, from the moment you visit our website to when your order arrives at your door..</p>
</div>




</div>
<NewsLetterBox/>
    </div>
  )
}

export default About
