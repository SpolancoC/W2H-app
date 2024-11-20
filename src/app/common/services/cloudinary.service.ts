import { v2 as cloudinary } from 'cloudinary';

(async function () {
    // Configuration
    cloudinary.config({
        cloud_name: 'dcburqy6x',
        api_key: '424611432739476',
        api_secret: 'xXc3SayqPk-uCXuMXneeIboUZuM', 
    });

    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
            {
                public_id: 'shoes',
            }
        );

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto',
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);
    } catch (error) {
        console.error('Error uploading or transforming image:', error);
    }
})();
