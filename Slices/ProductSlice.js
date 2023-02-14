import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";

const ProductCollection = collection(db, 'Adidas');

const initialState = {};


const ProductsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        AddDoc: (state, action) => {
            addDoc(ProductCollection, action.payload);
        },
        EditDoc: (state, action) => {
            updateDoc(ProductCollection)
        }
    }
})


export default ProductsSlice.reducer;