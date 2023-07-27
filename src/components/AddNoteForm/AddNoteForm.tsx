import { useState, ChangeEvent, MouseEvent } from "react";
import Button from "../UI/Button/Button";
import './AddNoteForm.css';

interface Props {
	onAddNote: (text: string) => void;
}

const AddNoteForm = ({ onAddNote }: Props) => {
	const [text, setText] = useState('');

	const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.currentTarget.value);
	};

	const addNote = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (text.trim() !== '') {
			onAddNote(text);
			setText('');
		}
	};

	return (
		<form className="note__form">
			<textarea className="note__input" value={text} onChange={changeInput} />
			<Button text='Добавить' onClickHandler={addNote} />
		</form>
	);
};

export default AddNoteForm;