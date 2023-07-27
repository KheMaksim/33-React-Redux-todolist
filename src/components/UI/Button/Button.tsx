import { MouseEventHandler } from 'react';
import './Button.css';

interface Props {
	text: string;
	onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, onClickHandler }: Props) => {
	return (
		<button className={text === 'Удалить' ? `button delete` : `button`} onClick={onClickHandler}>{text}</button>
	)
}

export default Button;