import {v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () =>{
cloudinary.config(({
    cloud_name:process.env.CLOUDINARARY_NAME,
    api_key:process.env.CLOUDINARARY_API_KEY ,
    api_secret:process.env.CLOUDINARAY_SECRET_KEY
}))
}

export default connectCloudinary