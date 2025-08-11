import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { ref, get, push } from 'firebase/database'
import { db } from '../../firebase'; // Adjust the import based on your firebase configuration
import { useNavigate } from 'react-router'
// import { v4 as uuidv4 } from 'uuid'
import { Button } from '../ui/button'
import * as faceapi from 'face-api.js'
// import WebcamCapture from '../../pages/Scanner/scanner'
// Removed incorrect import of 'get' from 'http'

const ClockIn: React.FC = () => {

    const welcomeMessages = [
        "Welcome, you looking great today!",
        "Welcome, you are doing amazing!",
        "Welcome, you are awesome!",
        "Welcome, you are a star!",
        "Welcome, you are a superstar!",
        "Welcome, you are a rockstar!",
        "Welcome, you are a legend!",
        "Give your best today!",
        "Welcome, you are a champion!",
        "Welcome, you are unstoppable!",
        "Welcome, you are a warrior!",
        "Welcome, you are a hero!",
        "Welcome, you are a genius!",
        "Welcome, you are a mastermind!",
        "Welcome, you are a visionary!",
        "Welcome, you are a trailblazer!",
        "Welcome, you are a game-changer!",
        "Welcome, you are a pioneer!",
        "Welcome, you are a leader!",
        "Welcome, you are a legend in the making!"
    ]
    const webcamRef = useRef<Webcam>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadModels() {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        }
        loadModels()
    }, []);


    const handleClockIn = async () => {
        setStatus("Processing...")

        if (!webcamRef.current) {
            setStatus("Webcam not available")
            return
        }
        const screenshot = webcamRef.current.getScreenshot();
        if (!screenshot) {
            setStatus("Failed to capture image")
            return
        }
        const image = await faceapi.fetchImage(screenshot);
        const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
        if (!detection) {
            setStatus("❌ No face detected.");
            return;
        }
        const snapshot = await get(ref(db, 'users'));
        if (!snapshot.exists()) {
            setStatus("❌ No users registered. Please register first.");
            return;
        }
        const users = snapshot.val();
        type User = { name: string; embedding: number[] };
        let matchedUser: User | null = null;
        for (const userId in users) {
            const storedEmbedding = new Float32Array(users[userId].embedding);
            if (storedEmbedding.length === detection.descriptor.length) {
                const distance = faceapi.euclideanDistance(detection.descriptor, storedEmbedding);
                if (distance < 0.6) { // Adjust threshold as needed
                    matchedUser = users[userId] as User;
                    break;
                } else {
                    console.warn(`embedding length mismatch for user ${userId}: expected ${storedEmbedding.length}, got ${detection.descriptor.length}`);
                }
            }
        }
        if (matchedUser) {
            setLoading(true);
            const timeNow = new Date().toLocaleTimeString();
            await push(ref(db, 'attendance/'), {
                user: matchedUser.name,
                time: timeNow,
                date: new Date().toLocaleDateString()
            });
            setStatus(`✅ Clocked in successfully! Welcome back, ${matchedUser.name}!`);
        } else {
            setStatus("❌ No matching user found. Please register first.");
            navigate("/register");
        }
    }

    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-2xl font-bold text-center text-[#7EB800]'>{welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}</h1>
            {/* Add your clock-in functionality here */}
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" audio={false} width={300} height={200}
                videoConstraints={{ facingMode: "user" }} className='rounded-full'
            />
            <Button onClick={() => handleClockIn()} className='w-[200px] bg-[#00A3EE] text-white mt-2'>
                {loading ? "Processing..." : "Clock In"}
            </Button>
            {status && <p className='mt-2 text-center'>{status}</p>}
            <Button onClick={() => navigate('/')} className='mt-4 bg-gray-500 text-white'>
                Back to Home
            </Button>
        </div>
    )
}

export default ClockIn