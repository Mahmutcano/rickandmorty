import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  characters: [],
  characterDetail: null,
  favoriteCharacters: [],
  status: 'idle',
  info: {},
  error: null
};

const baseUrl = process.env.REACT_APP_RICKANDMORTY_URL;


export const fetchCharacters = createAsyncThunk('characters/fetchCharacters', async () => {
  const response = await axios.get(`${baseUrl}/character`);
  return response.data;
});


export const fetchCharacterDetail = createAsyncThunk('characters/fetchCharacterDetail', async (id) => {
  const response = await axios.get(`${baseUrl}/character/${id}`);
  return response.data;
});


export const fetchFilteredCharacters = createAsyncThunk(
  'characters/fetchFilteredCharacters',
  async (filters, { rejectWithValue }) => {
    const queryParams = new URLSearchParams(filters).toString();
    try {
      const response = await axios.get(`${baseUrl}/character?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('No characters found matching your search criteria.');
    }
  }
);


export const fetchCharactersByPage = createAsyncThunk(
  'characters/fetchByPage',
  async (pageUrl, { rejectWithValue }) => {
    try {
      const response = await axios.get(pageUrl);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch characters.');
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const character = state.characters.find(c => c.id === action.payload);
      if (character && !state.favoriteCharacters.some(fav => fav.id === action.payload)) {
        state.favoriteCharacters.push(character);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFilteredCharacters.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.characters = action.payload.results;
      state.info = action.payload.info;
      state.error = null;
    })
    .addCase(fetchFilteredCharacters.rejected, (state, action) => {
      state.status = 'failed';
      state.characters = [];
      state.error = 'No characters found matching your search criteria.';
    })
    .addCase(fetchCharactersByPage.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.characters = action.payload.results;
      state.info = action.payload.info;
      state.error = null;
    })
    .addCase(fetchCharactersByPage.rejected, (state, action) => {
      state.status = 'failed';
      state.characters = []; 
      state.error = action.payload || 'Failed to fetch characters.';
    });
  },
});

export const characterActions = {
  ...charactersSlice.actions,
  fetchCharacters,
  fetchCharacterDetail,
  fetchFilteredCharacters
};

export const charactersReducer = charactersSlice.reducer;
