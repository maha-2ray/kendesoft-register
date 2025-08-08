import React from 'react'
import WebcamCapture from '../../pages/Scanner/scanner'
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const RegisterNewUser: React.FC = () => {
    const nameRef = React.useRef<HTMLInputElement>(null)
    const emailRef = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const newMemberMessages = [
        "Welcome, new member! We're excited to have you on board!",
        "Hello, new member! Get ready for an amazing journey with us!",
        "Greetings, new member! Your adventure starts here!",
        "Hi there, new member! Let's make great memories together!",
        "Welcome aboard, new member! The best is yet to come!",
        "Hey, new member! We're thrilled to have you join our community!",
        "Welcome, new member! Together, we'll achieve great things!",
        "Hello, new member! Your presence makes us stronger!",
        "Greetings, new member! Let's create something extraordinary together!",
        "Hi, new member! Your journey with us is just beginning!",
        "Welcome, new member! We're here to support you every step of the way!",
        "Hello, new member! Get ready to shine with us!",
        "Greetings, new member! Your potential is limitless!",
        "Hi there, new member! Let's embark on this exciting journey together!",
        "Welcome, new member! Your contributions will make a difference!",
    ];
    const handleCapture = (imageSrc: string | null | undefined) => {
        try {
            if (!nameRef.current?.value || !emailRef.current?.value) {
                throw new Error("Name and Email are required");
            }
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const newUser = {
                name: name,
                email: email,
                image: imageSrc
            }
            fetch('https://kendesoft-register-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to register new user");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("New user registered successfully:", data);
                    nameRef.current!.value = '';
                    emailRef.current!.value = '';
                })
            }
            catch (error) {
                console.error("Error registering new user:", error);
            }
            navigate("/");
        };
        
        // Redirect to clock-in page after registration
    return (
        <div>
            <h1 className='text-2xl font-bold text-center text-[#7EB800]'>{newMemberMessages[Math.floor(Math.random() * newMemberMessages.length)]}</h1>
            {/* Add your clock-in functionality here */}
            <WebcamCapture onCapture={handleCapture} />
            <form action="" className='flex flex-col items-center mt-4 bg-[#f0f0f0] p-4 rounded-lg shadow-md'>
                <input type="text" ref={nameRef} placeholder="Name" />
                <input type="email" ref={emailRef} placeholder="Email" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default RegisterNewUser