import s from './Banner.module.scss'
import image from '../../assets/images/index 1.png'

interface BannerProps {
    onButtonClick: () => void;
}

const Banner = ({onButtonClick}: BannerProps) => {

    const togglePlay = () => {
        onButtonClick()
    }

    return (
        <div className={s.banner}>
            <div className={s.content}>
                <h1 className={s.title}>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША, ПОДАРИТЕ ЕМУ СОБАКУ</h1>
                <img src={image}></img>
                <p>Сканируйте QR-код или нажмите ОК</p>
                <button className={s.button} onClick={togglePlay}>ОК</button>
            </div>
        </div>
    )
}

export default Banner