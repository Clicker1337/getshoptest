import {useState} from 'react';
import s from './App.module.scss'
import VideoComponent from './components/video/VideoComponent'
import Banner from './components/banner/Banner';

function App() {
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true)

    const handleTimeChange = (newData: number) => {
        setTimer(newData);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <>
            <div className={s.container}>
                {timer >= 5 ? <Banner onButtonClick={togglePlay} /> : <div />}
                <VideoComponent
                    isPlaying={isPlaying}
                    onTimeChange={handleTimeChange}
                />
            </div>
        </>
    )
}

export default App
