import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { setlocalStorage } from '../../utility/localstorage';
const initialState = {
   pastes: localStorage.getItem('pastes')
      ? JSON.parse(localStorage.getItem('pastes'))
      : [],

   archieve: localStorage.getItem('archive')
      ? JSON.parse(localStorage.getItem('archive'))
      : [],
}

export const pasteSlice = createSlice({
   name: 'paste',
   initialState,
   reducers: {
      addToPaste: (state, action) => {
         const { data } = action.payload;
         if (data === '') {
            toast.error('Empty Note Cannot Be Created')
         } else {
            state.pastes.push(action.payload);
            setlocalStorage(state.pastes)


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
         setlocalStorage(state.pastes)

         toast.success('updated successfully')
      },
      resetPaste: (state) => {
         state.pastes = [];
         localStorage.removeItem("pastes")
         toast.success('Paste reset successfully')
      },

      archievePaste: (state, action) => {
         const id = action.payload;
         const paste = state.pastes.find((p) => p.id === id);

         if (paste) {
            state.archieve.push(paste);
            state.pastes = state.pastes.filter((item) => item.id != id)
            setlocalStorage(state.pastes, 'pastes')
            setlocalStorage(state.archieve, 'archive');
            toast.success('archieved')
         }
      },
      unarchivePaste: (state, action) => {
         const id = action.payload;
         const paste = state.archieve.find((item) => item.id === id)
         if (paste) {
            state.pastes.push(paste);
            state.archieve = state.archieve.filter((item) => item.id !== id);
            setlocalStorage(state.pastes, 'pastes')
            setlocalStorage(state.archieve, 'archive');
            toast.success('Note unarchived successfully');
         }
      },
      pinnedCard: (state, action) => {

         const id = action.payload;
         const paste = state.pastes.find((p) => p.id === id)

         if (paste) {
            if (paste.isPinned === true) {
               paste.isPinned = false;
            }
            else {
               paste.isPinned = true;
            }

            setlocalStorage(state.pastes)


         }

      },
      removePaste: (state, action) => {
         const id = action.payload; // pass just id
         state.pastes = state.pastes.filter((item) => item.id !== id);
         setlocalStorage(state.pastes, 'pastes')
         toast.success('deleted')
      },
      deleteArchivePaste: (state, action) => {
         const id = action.payload;
         state.archieve = state.archieve.filter((item) => item.id !== id);
         setlocalStorage(state.archieve, 'archive')
         toast.success('deleted')

      },
   },
})
console.log(pasteSlice)
export const { addToPaste, unarchivePaste, deleteArchivePaste, updateToPaste, removePaste, resetPaste, pinnedCard, archievePaste } = pasteSlice.actions;
export default pasteSlice.reducer;
