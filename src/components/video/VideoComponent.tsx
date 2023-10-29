import s from './VideoComponent.module.scss'
import video from '../../assets/videos/Volvo Trucks - The Epic Split feat. Van Damme (Live Test).mp4'
import {useEffect, useRef} from 'react'

const TIME_UPDATE = "timeupdate"

interface VideoComponentProps {
    isPlaying: boolean;
    onTimeChange: (newData: number) => void;
}

const VideoComponent = ({isPlaying, onTimeChange}: VideoComponentProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    isPlaying ? videoRef?.current?.play() : videoRef?.current?.pause()

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener(TIME_UPDATE, handleTimeUpdate);
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener(TIME_UPDATE, handleTimeUpdate);
            }
        };
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const seconds = Math.floor(videoRef.current.currentTime)
            onTimeChange(seconds);
            if (seconds > 5) {
                videoRef.current.removeEventListener(TIME_UPDATE, handleTimeUpdate);
            }
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