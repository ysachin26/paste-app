import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
   pastes:localStorage.getItem('pastes')
   ? JSON.parse(localStorage.getItem('pastes'))
   :[],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
   addToPaste: (state, action) => {
    const { data}= action.payload;
    if(data==='')
    {
       toast.error('Empty Note Cannot Be Created')
    }else{
state.pastes.push(action.payload);
localStorage.setItem('pastes', JSON.stringify(state.pastes));
toast.success('Successfully toasted!')
    }
      

    },
 updateToPaste: (state, action) => {
  const { id, title, data } = action.payload;
  const paste = state.pastes.find((p) => p.id === id);
  if (paste) {
    paste.title = title;
    paste.data = data;
    paste.createAt = new Date().toISOString();
  }
  localStorage.setItem('pastes', JSON.stringify(state.pastes));
   toast.success('updated successfully')
},
   resetPaste:(state)=>
   {
    state.pastes= [];
    localStorage.removeItem("pastes")
     toast.success('Paste reset successfully')
   },
   removePaste:(state,action)=>
   {

    // const pasteId = action.payload();
    // if(pasteId)
    // {
    //   const index = state.pastes.findIndex((item)=>item.id===pasteId)

    // }

      const id = action.payload; // pass just id
  state.pastes = state.pastes.filter((item) => item.id !== id);
  localStorage.setItem("pastes", JSON.stringify(state.pastes));
   }
  },
})
 console.log(pasteSlice)
export const {addToPaste,updateToPaste,removePaste,resetPaste} = pasteSlice.actions;
export default pasteSlice.reducer;
 