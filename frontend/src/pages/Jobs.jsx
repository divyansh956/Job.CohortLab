import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // State from Redux
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  // Handle API errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  // Fetch jobs on changes
  useEffect(() => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [city, niche, searchKeyword, dispatch]);

  // Trigger search manually
  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  // Available filter options
  const cities = [
    "Remote", "Bangalore", "Hyderabad", "Chennai", "Trivandrum", "Kochi",
    "Mysore", "Pune", "Mumbai", "Indore", "Bhopal", "New Delhi", "Gurgaon",
    "Noida", "Jaipur", "Kolkata", "Lucknow", "Chandigarh", "Ahmedabad",
    "Bhubaneswar", "Jamshedpur", "Other Cities",
  ];

  const nichesArray = [
    "Software Development", "Web Development",
    "Web Development (MEAN Stack)", "Web Development (LAMP Stack)",
    "Web Development (Django/Flask)", "Web Development (Ruby on Rails)",
    "Cybersecurity", "Data Science", "Artificial Intelligence", "Machine Learning",
    "Cloud Computing", "DevOps", "Mobile App Development (Java/Kotlin)",
    "Mobile App Development (Swift)", "Mobile App Development (React Native)",
    "Blockchain (Solidity/Chaincode)", "Blockchain (Solana/Rust)",
    "Database Administration", "Data Analysis", "Data Engineering",
    "Big Data", "Network Administration", "UI/UX Design", "Game Development",
    "IoT (Internet of Things)", "Machine Learning with IoT", "IT Project Management",
    "IT Support and Helpdesk", "Systems Administration", "IT Consulting",
    "IT Sales", "Other IT & Software roles",
  ];

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              placeholder="Search Jobs..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>
              Find Job <FaSearch />
            </button>
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((cityName, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={cityName}
                      name="city"
                      value={cityName}
                      checked={city === cityName}
                      onChange={() => setCity(cityName)}
                    />
                    <label htmlFor={cityName}>{cityName}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((nicheName, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={nicheName}
                      name="niche"
                      value={nicheName}
                      checked={niche === nicheName}
                      onChange={() => setNiche(nicheName)}
                    />
                    <label htmlFor={nicheName}>{nicheName}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div className="card" key={job._id}>
                      <p className={job.hiringMultipleCandidates === "Yes" ? "hiring-multiple" : "hiring"}>
                        {job.hiringMultipleCandidates === "Yes" ? "Hiring Multiple Candidates" : "Hiring"}
                      </p>
                      <p className="title">{job.title}</p>
                      <p className="company">{job.companyName}</p>
                      <p className="location">{job.location}</p>
                      <p className="salary">
                        <span>Salary:</span> Rs. {job.salary}
                      </p>
                      <p className="posted">
                        <span>Posted On:</span> {job.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link className="btn" to={`/post/application/${job._id}`}>
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No jobs found. </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Jobs;
