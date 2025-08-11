import React from 'react'
// import WebcamCapture from '../../pages/Scanner/scanner'
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js'
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase'; // Adjust the import based on your firebase configuration
import { Button } from '../ui/button';
// import { useQuery } from '@tanstack/react-query';

const RegisterNewUser: React.FC = () => {
    const webcamRef = React.useRef<Webcam>(null);
    const nameRef = React.useRef<HTMLInputElement>(null)
    const emailRef = React.useRef<HTMLInputElement>(null);
    const [status, setStatus] = React.useState<string | null>("");
    const [loading, setLoading] = React.useState<boolean>(false);
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
    React.useEffect(() => {
        async function loadModels() {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        }
        loadModels();

    }, [])
    const handleCapture = async (imageSrc: string | null | undefined) => {
        if (!nameRef.current?.value || !emailRef.current?.value) {
            setStatus("Name and Email are required");
            return;
        }
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const image = await faceapi.fetchImage(imageSrc || '');
        const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
        if (!detection) {
            setStatus("No face detected. Please try again.");
            return;
        }
        setLoading(true);
        const descriptorAray = Array.from(detection.descriptor);

        const userId = uuidv4();

        await set(ref(db, `users/${userId}`), {
            name: name,
            email: email,
            image: imageSrc,
            embedding: descriptorAray
        });
        setStatus(`✅ Registered ${name} successfully!`);
        setLoading(false);
        nameRef.current!.value = '';
        emailRef.current!.value = '';
        navigate("/");
    }

    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-2xl font-bold text-center text-[#7EB800]'>{newMemberMessages[Math.floor(Math.random() * newMemberMessages.length)]}</h1>
            <p>{status}</p>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                height={200}
                videoConstraints={{
                    facingMode: 'user',
                }}
                className='rounded-full'
            />
            <div className='flex flex-col items-center mt-2'>
                <input type="text" ref={nameRef} placeholder="Name" className='border border-gray-300 p-2 rounded-md w-full mb-2' />
                <input type="email" ref={emailRef} placeholder="Email" className='border border-gray-300 p-2 rounded-md w-full mb-2' />
                <Button
                    onClick={async () => {
                        const imageSrc = webcamRef.current?.getScreenshot();
                        await handleCapture(imageSrc);
                    }}
                    className='bg-[#7EB800] text-white p-2 rounded-md w-full'
                >
                    {loading ? "Registering..." : "Register"}
                </Button>
                <Button onClick={() => navigate("/")} className='w-[200px] bg-[#FF5733] text-white mt-2'>
                    Go Back
                </Button>
            </div>
        </div>
    )
}

export default RegisterNewUser