import React, { useState, useRef, useEffect } from 'react'
import { ref, push, get } from 'firebase/database'
import { db } from '../../firebase'; // Adjust the import based on your firebase configuration
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js'
import { useNavigate } from 'react-router';
import { Button } from '../ui/button';
// import WebcamCapture from '../../pages/Scanner/scanner'

const ClockOut: React.FC = () => {
    const byeMessages = [
        "Goodbye, have a great day!",
        "See you later, take care!",
        "Farewell, until next time!",
        "Goodbye, stay awesome!",
        "See you soon, keep shining!",
        "Take care, see you next time!",
        "Goodbye, keep up the great work!",
        "Farewell, you're doing amazing!",
        "See you later, keep smiling!",
        "Goodbye, you're a star!"
    ];
    const webcamRef = useRef<Webcam>(null)
    const [status, setStatus] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadModels() {
            await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        }
        loadModels();
    }, []);
    const handleClockOut = async () => {
        setStatus("Processing...");
        if (!webcamRef.current) {
            setStatus("Webcam not available");
            return;
        }
        const screenshot = webcamRef.current.getScreenshot();
        if (!screenshot) {
            setStatus("Failed to capture image");
            return;
        }
        const image = await faceapi.fetchImage(screenshot);
        const detection = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
        if (!detection) {
            setStatus("❌ No face detected.");
            return;
        }
        const snapshot = await get(ref(db, 'users'));
        if (!snapshot.exists()) {
            setStatus("❌ No users found. Please register first.");
            return;
        }
        const users = snapshot.val();
        let matchedUser: { name: string } | null = null;

        for (const userId in users) {
            const storedEmbedding = new Float32Array(users[userId].embedding);
            if (storedEmbedding.length !== detection.descriptor.length) {
                const distance = faceapi.euclideanDistance(detection.descriptor, storedEmbedding);
                if (distance < 0.6) { // Adjust threshold as needed
                    matchedUser = users[userId];
                    break;
                }
            } else {
                console.warn(`embedding length mismatch for user ${userId}: expected ${storedEmbedding.length}, got ${detection.descriptor.length}`);
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
            setStatus(`✅ Clocked out successfully! Goodbye, ${matchedUser.name}!`);
            setLoading(false);
        }
        else {
            setStatus("❌ No matching user found. Please register first.");
            navigate("/register");
        }
    };
    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <h1 className='text-2xl font-bold text-center text-[#7EB800]'>{byeMessages[Math.floor(Math.random() * byeMessages.length)]}</h1>
            {/* Add your clock-in functionality here */}

            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" audio={false} width={300} height={200}
                videoConstraints={{ facingMode: "user" }} className='rounded-full'
            />
            <Button onClick={handleClockOut} className='w-[200px] bg-[#00A3EE] text-white mt-2'>
                {loading ? "Processing..." : "Clock Out"}
            </Button>
            {status && <p className='mt-2 text-center'>{status}</p>}
            {/* <WebcamCapture onCapture={handleClockOut} /> */}

        </div>
    )
}

export default ClockOut