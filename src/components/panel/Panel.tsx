import {useEffect, useRef, useState} from 'react'
import s from './Panel.module.scss'

const PHONE_TEMPLATE = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_',]
const NUMERAL = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

function createPhone(array: string[]) {
    let newString = array.join('')
    return newString = '+7' + '(' + newString.slice(0, 3) + ') '
        + newString.slice(3, 6)
        + '-'
        + newString.slice(6, 8)
        + '-'
        + newString.slice(8, 10);
}

const Panel = () => {
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>(PHONE_TEMPLATE)
    const [stack, setStack] = useState<number>(0)

    const stackRef = useRef(stack);
    stackRef.current = stack;
    const phoneNumbersRef = useRef(phoneNumbers)
    phoneNumbersRef.current = phoneNumbers;


    const addNumber = (num: string) => {
        if (stackRef.current === 10) return;
        const updatedNumbers = [...phoneNumbersRef.current];
        updatedNumbers[stackRef.current] = num;
        setPhoneNumbers(updatedNumbers);
        setStack(stackRef.current + 1);
    };

    const deleteNumber = () => {
        if (stackRef.current === 0) return;
        const updatedNumbers = [...phoneNumbersRef.current];
        updatedNumbers[stackRef.current - 1] = '_';
        setPhoneNumbers(updatedNumbers);
        setStack(stackRef.current - 1);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const key = event.key;
        if (NUMERAL.includes(key)) {
            addNumber(key);
        } else if (key === 'Backspace' || key === 'Delete') {
            deleteNumber();
            event.preventDefault();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    let validation = false;
    phoneNumbers.includes('_') ? validation = true : validation = false

    const Phone = createPhone(phoneNumbers)
    console.log(phoneNumbers)

    return (
        <div className={s.panel}>
            <div className={s.content}>
                <div className={s.container}>
                    <div className={s.top}>
                        <h1 className={s.title}>Введите номер вашего телефона</h1>
                        <span className={s.phone}>{Phone}</span>
                        <p>И с вами свяжется наш менеджер для дальнейшей консультации</p>
                    </div>
                    <div className={s.buttons}>
                        {NUMERAL.map((num, key) => (
                            <button key={key} className={s.buttonNum} onClick={() => addNumber(num)}>{num}</button>
                        ))}
                        <button className={s.buttonNum} onClick={() => deleteNumber()}>Стереть</button>
                    </div>
                    <span>{validation && <p>Введите полностью номер</p>}</span>
                </div>
            </div>
        </div>
    )
}

export default Panel