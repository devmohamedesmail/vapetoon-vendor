import { api } from "../config/api";
import axios from 'axios';

export const uploadImagesToStrapi = async (images) => {
    const uploadedImageIds = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append('files', {
        uri: image.uri,
        name: 'image.jpeg',
        type: 'image/jpeg',
      });

      const res = await axios.post(
        `https://ecommerce-strapi-ex18.onrender.com/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${api.token} `, 
          },
        }
      );

      uploadedImageIds.push(res.data[0].id); 
    }

    return uploadedImageIds;
  };