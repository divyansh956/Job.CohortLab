import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [], // Stores the list of jobs fetched from the API
    loading: false, // Indicates if the request is in progress
    error: null, // Stores the error message if a request fails
    message: null, // Optional message for success/failure actions
    singleJob: {}, // Stores details of a single job (if required)
    myJobs: [], // Stores jobs specific to the user (if needed)
  },
  reducers: {
    requestForAllJobs(state) {
      state.loading = true;
      state.error = null; // Clear previous errors when starting a new request
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload; // Update the jobs list with the fetched data
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload; // Store the error message
    },
    clearAllErrors(state) {
      state.error = null; // Clear any existing error messages
    },
    resetJobSlice(state) {
      // Reset the slice to its initial state
      state.error = null;
      state.jobs = [];
      state.loading = false;
      state.message = null;
      state.myJobs = [];
      state.singleJob = {};
    },
  },
});

// Async thunk for fetching jobs based on filters
export const fetchJobs = (city, niche, searchKeyword = "") => async (dispatch) => {
  try {
    dispatch(jobSlice.actions.requestForAllJobs()); // Set loading state to true
    let link = "http://localhost:4000/api/v1/job/getall?";
    const queryParams = [];

    // Add query parameters based on the provided filters
    if (searchKeyword) queryParams.push(`searchKeyword=${searchKeyword}`);
    if (city) queryParams.push(`city=${city}`);
    if (niche) queryParams.push(`niche=${niche}`);

    // Construct the full API URL
    link += queryParams.join("&");

    // Make the API request
    const response = await axios.get(link, { withCredentials: true });

    // Dispatch success action with the fetched jobs
    dispatch(jobSlice.actions.successForAllJobs(response.data.data.jobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    // Extract the error message, providing a fallback if unavailable
    const errorMessage = error.response?.data?.message || "An error occurred while fetching jobs.";
    dispatch(jobSlice.actions.failureForAllJobs(errorMessage));
  }
};

// Action to clear error messages
export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

// Action to reset the job slice to its initial state
export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

// Export the reducer for store configuration
export default jobSlice.reducer;
