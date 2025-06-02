import React, { useState } from 'react'
import { Div, Button, Image } from 'react-native-magnus'
import Custom_input from '../../custom/Custom_input'
import { Alert } from 'react-native'
import axios from 'axios'

import * as ImagePicker from 'expo-image-picker'
import Custom_button from '../../custom/Custom_button'
import Custom_image_picker from '../../custom/Custom_image_picker'

export default function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

  








    const handle_register_vendor = async () => {
        console.log(image)

        formData.append('data', JSON.stringify({
            name,
            email,
            password,
        }));

        // if (image) {
        //     formData.append('files.image', {
        //         uri: image.uri,
        //         name: image.fileName || 'vendor.jpg',
        //         type: image.type || 'image/jpeg',
        //     });
        // }

        console.log('Form data:', formData);
        try {
            const response = await axios.post(
                'https://ecommerce-strapi-ex18.onrender.com/api/vendors',
                formData,
                {
                    headers: {
                        Authorization: 'Bearer d65429e4b5696461b79b14e115a69985751d5c3134411919e3db6e39765a29c4011c530939ef736545635e399382ed37db98669bdd0af45e1cb5faccb1f0f20fc6a303966b72d28c0a92c2e759aab3787191b126ad47be0ca08015036eeea2ee2e0c5c3f047eb6f267e11eb85cae4c9325f22b5d79b30f7c179dcd41858ed2f1',
                        // Don't set Content-Type
                        // 'Content-Type': 'multipart/form-data',
                    }
                }
            );

            console.log('Vendor created:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            } else {
                console.error('Request error:', error.message);
            }
        }
    }


    return (
        <Div pt={100} px={20} flex={1} bg="white">
            <Custom_input
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <Custom_input
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}

            />
            <Custom_input
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}

            />
         
            <Custom_image_picker  />
            <Custom_button title={"create store"} w="100%" onPress={handle_register_vendor} />
           
         
        </Div>
    )
}