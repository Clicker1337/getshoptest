import s from './VideoComponent.module.scss'
import video from '../../assets/videos/Volvo Trucks - The Epic Split feat. Van Damme (Live Test).mp4'
import {useEffect, useRef} from 'react'

interface VideoComponentProps {
    isPlaying: boolean;
    onTimeChange: (newData: number) => void;
}

const VideoComponent = ({isPlaying, onTimeChange}: VideoComponentProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause()

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
            }
        };
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            onTimeChange(Math.floor(videoRef.current.currentTime));
        }
    };

    return (
        <>
            <div className={s.hero}>
                <video
                    src={video}
                    ref={videoRef}
                    preload='auto'
                    autoPlay={true}
                    muted={true}
                />
            </div>
        </>
    )
}

export default VideoComponent