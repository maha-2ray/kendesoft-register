import React from 'react'
import WebcamCapture from '../../pages/Scanner/scanner'

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
          <h1 className='text-2xl font-bold text-center text-[#7EB800]'>{byeMessages[Math.floor(Math.random() * byeMessages.length)]}</h1>
        {/* Add your clock-in functionality here */}
        <WebcamCapture onCapture={handleCapture} />
    </div>
  )
}

export default ClockOut