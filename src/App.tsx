import {useState} from 'react';
import s from './App.module.scss'
import VideoComponent from './components/video/VideoComponent'
import Banner from './components/banner/Banner';
import Panel from './components/panel/Panel';

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
                {isPlaying && timer >= 5 ? <Banner onButtonClick={togglePlay} /> : <div />}
                {!isPlaying && <Panel onButtonClick={togglePlay} />}
                <VideoComponent
                    isPlaying={isPlaying}
                    onTimeChange={handleTimeChange}
                />
            </div>
        </>
    )
}

export default App
