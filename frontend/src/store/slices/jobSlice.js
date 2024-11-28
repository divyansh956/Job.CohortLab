import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const jobSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        loading: false,
        error: null,
        message: null,
        singleJob: {},
        myJobs: [],
    },
    reducers: {
        requestForAllJobs(state) {
            state.loading = true;
            state.error = null;
        },
        successForAllJobs(state, action) {
            state.loading = false;
            state.jobs = action.payload;
            state.error = null;
        },
        failureForAllJobs(state, action) {
            state.loading = false;
            state.error = action.payload; // Fixed: Assign the error message here
        },
        clearAllErrors(state) {
            state.error = null; // Removed redundant assignments
        },
        resetJobSlice(state) {
            state.error = null;
            state.jobs = [];
            state.loading = false;
            state.message = null;
            state.myJobs = [];
            state.singleJob = {};
        },
    },
});

export const fetchJobs = (city, niche, searchKeyword = "") => async (dispatch) => {
    try {
        dispatch(jobSlice.actions.requestForAllJobs());
        let link = "http://localhost:4000/api/v1/job/getall?";
        const queryParams = [];

        if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
        if (city) queryParams.push(`city=${city}`);
        if (niche) queryParams.push(`niche=${niche}`);

        link += queryParams.join('&');

        const response = await axios.get(link, { withCredentials: true });
        dispatch(jobSlice.actions.successForAllJobs(response.data.data.jobs));
        dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(jobSlice.actions.failureForAllJobs(errorMessage)); // Added fallback
    }
};

export const clearAllJobErrors = () => (dispatch) => {
    dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
    dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
