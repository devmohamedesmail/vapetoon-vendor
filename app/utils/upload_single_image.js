import { api } from "../config/api";
import axios from 'axios';

export const uploadSingleImageToStrapi = async (image) => {
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
        Authorization: `Bearer ${api.token}`,
      },
    }
  );

  return res.data[0]; 
};
