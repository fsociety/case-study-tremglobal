import React,{useRef, useEffect, useState} from 'react'
import intlTelInput from 'intl-tel-input';
import { IMaskInput } from 'react-imask';
import 'intl-tel-input/build/css/intlTelInput.css';
import Lottie from "lottie-react";
import axios from 'axios';
import successAnimation from '../assets/success_animation.json';

export default function App() {
    const PhoneInput = useRef(null);
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [modal, setModal] = useState(false);
    const [fullname, setFullname] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const intl = intlTelInput(PhoneInput.current,{
            formatOnDisplay: true,
            placeholderNumberType:'MOBILE',
            initialCountry:'tr',
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
        });
        setPhone(intl);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({...errors, phone: !phone.isValidNumber() && 'Phone number is invalid!' })
        if(!phone.isValidNumber()) return;

        axios.post('/api/form/save',{
            fullname,
            email,
            phone: phone.getNumber(),
            address
        }).then(({data}) => {
            setModal(true);
        }).catch(({response}) => {
            setServerErrors(response.data.errors);
        });
    }

    return (
        <div className='bg-slate-800 w-full h-screen flex justify-center items-center'>
            <form
            onSubmit={handleSubmit}
            method="post"
            className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className='text-red-600 w-full'>
                {serverErrors ? Object.entries(serverErrors).map((val,i) => {
                    return <small className='block mb-2' key={i}> { val[1] } </small>
                }) : <small>Something went wrong</small>}
            </div>
            <div className="w-full mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Fullname
                </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="fullname"
                required
                name='fullname'
                onChange={e => setFullname(e.target.value)}
                type="text"
                placeholder="Fullname" />
            </div>
            <div className="flex flex-wrap mb-6">
                <div className="w-1/2 pr-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                    E-mail
                </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                required
                name='email'
                placeholder="E-mail" />
                </div>
                <div className="w-1/2 md:mb-0 pl-2">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                    Phone Number
                </label>
                <IMaskInput
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                mask={'000 000 0000'}
                id="phone"
                required
                unmask="typed"
                name="name"
                inputRef={PhoneInput}
                placeholder='000 000 00 00'
                />
                <small className='text-red-600'>
                    {errors?.phone}
                </small>
                </div>
            </div>
            <div className="w-full mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                Address
            </label>
            <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="address"
                required
                name='address'
                onChange={e => setAddress(e.target.value)}
                placeholder="Address"></textarea>
            </div>
            <div className='w-full text-left'>
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                    SEND
                </button>
            </div>
            </form>

            <div className={`fixed top-0 left-0 w-screen h-screen bg-slate-900/[.5] z-50 flex justify-center items-center ${modal ? 'block' : 'hidden'}`}>
                <div className='bg-white rounded-lg p-6 w-full max-w-xl'>
                    <div className='text-green-500 text-center text-lg'>successfully sent</div>
                    <Lottie animationData={successAnimation} loop={true} autoplay={true} />
                    <div className='text-right'>
                    <button
                    onClick={() => setModal(false)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                        OK
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
