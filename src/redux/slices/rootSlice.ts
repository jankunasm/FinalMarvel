import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: 'Generic Character',
        description: 'Default Description',
        comics_appeared_in: 'One or Several',
        super_power: 'Default Power'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload }
        }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseDescription } = rootSlice.actions
