import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'pagination/fetchPosts',
    async({page,limit},{rejectWithValue})=>{
try{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    let data = await response.json()
    let totalCount = response.headers.get("x-total-count")
    return {data,totalCount:parseInt(totalCount,10)}
}
catch(error){
    return rejectWithValue(error.message);
}
    }
)

 const paginationSlice = createSlice({
    name:"pagination",
    initialState: {
        paginationData: [],
        filteredData:[],
        totalPage: 1,
        currentPage: 1,
        itemsPerPage: 6,
        status: 'idle',
        toggle:false,
        error: null,
        loadingCard: null, // Add this line
        searchQuery: '',
      },
      reducers:{
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
          },
          setNextFirstData(state, action){
            state.paginationData = action.payload;
          },
          setLoadingCard(state, action) {
            state.loadingCard = action.payload;
          },
          setToggleButton(state, action){
            state.toggle = action.payload
          },

          setItemPerpage(state, action) {
            state.itemsPerPage = Number(action.payload); // Update search query
        },
          setSearchQuery(state, action) {
            state.searchQuery = action.payload; // Update search query
        },
          filterDataByQuery(state) {
            const query = state.searchQuery.toLowerCase();
            state.filteredData = state.paginationData.filter(item =>
                item.title.toLowerCase().includes(query)
            );
        }
      },
     extraReducers:(builder)=>{
    builder
.addCase(fetchPosts.pending,(state)=>{
state.status = "loading"
state.error =null
})
.addCase(fetchPosts.fulfilled,(state,action)=>{
    state.status = "succeeded"
    state.error = null
    state.paginationData = action.payload.data
    state.totalPage = Math.ceil(action.payload.totalCount / state.itemsPerPage);
})
.addCase(fetchPosts.rejected,(state,action)=>{
    state.status = "failed"
    state.error = action.payload

})
}
})
export const { setCurrentPage, setNextFirstData,setLoadingCard,setToggleButton,setItemPerpage,filterDataByQuery,setSearchQuery} = paginationSlice.actions;
export default paginationSlice.reducer