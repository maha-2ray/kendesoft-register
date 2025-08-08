import React from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../components/ui/button';

type RegisterNewUserProps = {
    onCapture: (imageSrc: string | null | undefined) => void;
}
type ClockInProps = {
    onCapture: (imageSrc: string | null | undefined) => void;
}
type ClockOutProps = {
    onCapture: (imageSrc: string | null | undefined) => void;
}

const WebcamCapture: React.FC<RegisterNewUserProps | ClockInProps | ClockOutProps> = ({ onCapture }) => {
    const webcamRef = React.useRef<Webcam>(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        onCapture(imageSrc); // You can handle the captured image here
    }, [webcamRef, onCapture]);
    return (
        <div className='flex flex-col items-center min-h-screen'>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className='rounded-full w-100 h-80' />
            <Button onClick={capture} className='w-[200px] bg-[#00A3EE] text-white'>Capture</Button>
        </div>
    )
}

export default WebcamCapture