import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'videos', 
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv'], 
    resource_type: 'video'
  },
});

export const uploadVideo = multer({ storage: videoStorage });



const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: 'Images',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      resource_type: 'image', // Optional, Cloudinary handles images by default
    },
  });
  
 export const uploadImage = multer({ storage: imageStorage });
  
  
