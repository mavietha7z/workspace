import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: 'dwld3bqia',
    api_key: '523166679214296',
    api_secret: 'BlTkux63P5OHdlyQrSodTboJCQM',
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'Post',
    },
});

const uploadPost = multer({ storage });

export default uploadPost;
