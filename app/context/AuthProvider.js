
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config/api';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();





    // Load user from AsyncStorage on app start
    useEffect(() => {
        const loadUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setAuth(JSON.parse(userData));
            }
        };
        loadUser();
    }, []);


    const handle_login = async (identifier, password) => {
        try {
            const response = await axios.post(`https://ecommerce-strapi-ex18.onrender.com/api/auth/local`,
                {
                    identifier: identifier,
                    password: password
                },
                {
                    Headers: {
                        Authorization: `Bearer ${api.token}`,
                    }
                })
            const user = response.data
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user)
            return user;
        } catch (error) {
            console.log('Error logging in', error.response?.data || error.message);
        }
    }




    // handle register user
    const handle_register = async (username, email, password) => {
        try {
            const response = await axios.post(`https://ecommerce-strapi-ex18.onrender.com/api/auth/local/register`,
                {
                    username: username,
                    email: email,
                    password: password
                },
                {
                    Headers: {
                        Authorization: `Bearer ${api.token}`,
                    }
                })
            const user = response.data;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setAuth(user);
            return user;
        } catch (error) {
            console.log('Error registering', error.response?.data || error.message);
        }
    }



    // logout user
    const handle_logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setAuth(null);
            navigation.navigate('Login');
        } catch (error) {
            console.log('Error logging out', error.message);
        }
    };



    return (
        <AuthContext.Provider value={{ auth, handle_login, handle_register , handle_logout }}>
            {children}
        </AuthContext.Provider>


    )
}

export default AuthProvider