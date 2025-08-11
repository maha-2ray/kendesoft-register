import React from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../components/ui/button';

type WebcamCaptureProps = {
    onCapture: (imageSrc: string | null | undefined) => void;
    registering?: boolean;
};

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, registering }) => {
    const webcamRef = React.useRef<Webcam>(null);
   
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        onCapture(imageSrc); // You can handle the captured image here
    }, [webcamRef, onCapture]);
    return (
        <div className='flex flex-col items-center mt-2'>
            <Webcam audio={false} ref={webcamRef} width={300} screenshotFormat="image/jpeg" className='rounded-full' />
            {!registering &&
                <Button onClick={capture} className='w-[200px] bg-[#00A3EE] text-white mt-2'>Capture</Button>
            }
        </div>
    )
}

export default WebcamCapture