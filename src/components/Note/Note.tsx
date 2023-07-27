import { ChangeEvent, useState } from 'react';
import Button from '../UI/Button/Button';
import './Note.css';

interface Props {
	id: string;
	text: string;
	deleteNote: () => void;
	editNote: (id: string, noteText: string) => void;
}

const Note = ({ id, text, deleteNote, editNote }: Props) => {
	const [noteText, setNoteText] = useState<string>(text);
	const [editing, setEditing] = useState<boolean>(false);

	const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNoteText(e.currentTarget.value);
	};

	const editNoteText = (id: string, text: string) => {
		editNote(id, text);
		setEditing(!editing);
	};

	const editingHandler = () => {
		setEditing(!editing);
	}

	return (
		<div className="note__container">
			{editing ?
				<>
					<textarea className="note__input" value={noteText} onChange={changeInput} />
					<div className="note__buttons">
						<Button text={'Сохранить'} onClickHandler={() => { editNoteText(id, noteText) }} />
						<Button text={'Удалить'} onClickHandler={deleteNote} />
					</div>
				</> :
				<>
					<p className="note__title">{noteText}</p>
					<div className="note__buttons">
						<Button text={'Изменить'} onClickHandler={editingHandler} />
						<Button text={'Удалить'} onClickHandler={deleteNote} />
					</div>
				</>}
		</div>
	);
};

export default Note;