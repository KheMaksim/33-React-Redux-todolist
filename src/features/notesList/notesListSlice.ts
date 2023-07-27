import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import INote from "@/interfaces/INote";
import api from "@/Api/apiService";

type NotesState = {
	notes: INote[];
  loading: boolean;
};

const initialState: NotesState = {
	notes: [],
  loading: false,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async function () {
	const { data: noteResponse } = await api.get<INote[]>("/notes.json");
	return noteResponse;
});

export const addNote = createAsyncThunk("notes/addNote", async (newText: string) => {
	const newNote: INote = { id: ``, text: newText };
	await api.post<{ newText: string }>("/notes.json", newNote);
	return newNote;
});

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId: string) => {
		await api.delete<{ noteId: string }>("/notes/" + `${noteId}.json`);
    return;
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, text }: { id: string, text: string }) => {
		const editedNote: INote = { id: id, text: text }
		const response = await api.put<INote>("/notes/" + `${id}.json`, editedNote);
    return response.data;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(fetchNotes.pending || addNote.pending || deleteNote.pending || editNote.pending, (state) => {
			state.loading = true;
		})
		.addCase(fetchNotes.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload === null) {
				state.notes = [];
				return;
			}
			const notesArray = Object.entries(action.payload).map(([id, text]) => ({ ...text, id: id }));
			state.notes = notesArray;
		})
		.addCase(addNote.fulfilled || deleteNote.fulfilled || editNote.fulfilled, (state) => {
			state.loading = false;
		})
		.addCase(fetchNotes.rejected || addNote.rejected || deleteNote.rejected || editNote.rejected, (state, action) => {
			state.loading = false;
			console.error("Ошибка при запросе:", action.error.message);
		})
	}
});
export const notesReducer = notesSlice.reducer;
