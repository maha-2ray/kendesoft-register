import React from 'react'
import WebcamCapture from '../../pages/Scanner/scanner'

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
    const handleCapture = (imageSrc: string | null | undefined) => {
        try {
            if (!imageSrc) {
                throw new Error("Image capture failed");
            }
            // Here you can handle the captured image, e.g., send it to a server
            console.log("Captured image:", imageSrc);
            // You can also reset the webcam or perform other actions as needed
        } catch (error) {
            console.error("Error capturing image:", error);
        }
    };  
  return (
    <div>
        <h1 className='text-2xl font-bold text-center text-[#7EB800]'>{welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}</h1>
        {/* Add your clock-in functionality here */}
        <WebcamCapture onCapture={handleCapture} />
    </div>
  )
}

export default ClockIn