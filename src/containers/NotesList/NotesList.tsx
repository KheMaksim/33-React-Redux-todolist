import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/hooks';
import { fetchNotes, addNote, deleteNote, editNote, } from '@/features/notesList/notesListSlice';
import Loader from '@/components/UI/Loader/Loader';
import AddNoteForm from '@/components/AddNoteForm/AddNoteForm';
import Note from '@/components/Note/Note';
import './NotesList.css';

const NotesList = () => {
	const notes = useAppSelector((state) => state.notes.notes);
	const loading = useAppSelector((state) => state.notes.loading);
	const dispatch = useDispatch();

	const getNotes = useCallback(() => {
		dispatch(fetchNotes() as unknown as AnyAction);
	}, [dispatch]);

	const handleAddNote = async (newText: string) => {
		await dispatch(addNote(newText) as unknown as AnyAction);
		getNotes();
	};

	const handleDeleteNote = async (noteId: string) => {
		await dispatch(deleteNote(noteId) as unknown as AnyAction);
		getNotes();
	};

	const handleEditNote = async (id: string, text: string) => {
		await dispatch(editNote({ id, text }) as unknown as AnyAction);
		getNotes();
	};

	useEffect(() => {
		getNotes();
	}, []);

	return (
		<>
			{loading && <Loader />}
			<div className='notes__container'>
				<h2 className='notes__title'>Личные записи:</h2>
				<AddNoteForm onAddNote={handleAddNote} />
				{notes.map((note) => (
					<Note
						key={note.id}
						id={note.id}
						text={note.text}
						editNote={handleEditNote}
						deleteNote={() => { handleDeleteNote(note.id); }}
					/>
				))}
			</div>
		</>
	)
}

export default NotesList;