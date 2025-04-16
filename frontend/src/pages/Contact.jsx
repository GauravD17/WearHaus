import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-1
      0 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:w-1/2" src={assets.contact_img} alt="contact-image" />

        <div className="flex flex-col justify-center items-start gap-6 w-full md:w-1/2">
          <p  className="font-semibold text-xl text-gray-600">Our Store</p>
          <p  className="text-gray-500">
            1234 Maple Street <br />
            Apt 56B, Springfield, IL 62701, USA
          </p>
          <p  className="text-gray-500">
            Phone: +1 (555) 123-4567 <br />
            Email: admin@wearhaus.com
          </p>

          <p  className="font-semibold text-xl text-gray-600">Careers at Wearhaus</p>
          <p  className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 mt-4">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
