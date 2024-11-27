import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";


const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How does it work?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Create an Account</h4>
          <p>
          <b>Create your free account today</b> – whether you're a job seeker or an employer.
Easily set up your profile in just a few minutes to start posting job opportunities or applying for your next role.
Tailor your profile to showcase your skills, qualifications, or job requirements, and make meaningful connections.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Post or Browse Jobs</h4>
          <p>
            <b>Employers can easily post detailed job listings, while job seekers can explore a wide range of available opportunities. </b> 
           Use advanced filters to quickly find positions that align with your skills, experience, and preferences.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Hire or Get Hired</h4>
          <p>
          <b>Employers can effortlessly shortlist candidates and extend job offers. </b>
          Job seekers can review offers and choose positions that align with their career aspirations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;