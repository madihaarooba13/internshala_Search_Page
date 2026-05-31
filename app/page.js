"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import InternshipCard from "./components/InternshipCard";
import { FiFilter } from "react-icons/fi";
import { FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { BsLightningChargeFill } from "react-icons/bs";

export default function Home() {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("");

  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);

  const [workFromHome, setWorkFromHome] =
    useState(false);

  const [partTime, setPartTime] =
    useState(false);

  const [sortBy, setSortBy] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/internships");
      const data = await res.json();
      setInternships(data);
    }

    fetchData();
  }, []);

  const filteredInternships = internships.filter(
    (item) => {
      const matchesProfile =
        !profile ||
        (item.title || "")
          .toLowerCase()
          .includes(profile.toLowerCase());

      const matchesLocation =
        !location ||
        (
          item.location_names
            ?.join(", ")
            ?.toLowerCase() || ""
        ).includes(location.toLowerCase());

      const matchesSalary =
        (item.stipend?.salaryValue1 || 0) >=
        salary * 100000;

      const matchesWFH =
        !workFromHome || item.work_from_home;

      const matchesPartTime =
        !partTime || item.part_time;
        const matchesSearch =
  !search ||
  (item.title || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (item.company_name || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  (item.profile_name || "")
    .toLowerCase()
    .includes(search.toLowerCase());

      return (
        matchesProfile &&
        matchesLocation &&
        matchesSalary &&
        matchesWFH &&
        matchesSearch &&
        matchesPartTime
      );
    }
  );

  let finalInternships = [...filteredInternships];

  if (sortBy === "salary-high") {
    finalInternships.sort(
      (a, b) =>
        (b.stipend?.salaryValue1 || 0) -
        (a.stipend?.salaryValue1 || 0)
    );
  }

  if (sortBy === "salary-low") {
    finalInternships.sort(
      (a, b) =>
        (a.stipend?.salaryValue1 || 0) -
        (b.stipend?.salaryValue1 || 0)
    );
  }

  if (sortBy === "latest") {
    finalInternships.sort(
      (a, b) =>
        (b.postedOnDateTime || 0) -
        (a.postedOnDateTime || 0)
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-[#f8f8f8] min-h-screen">

        <div className="max-w-[1250px] mx-auto px-4 py-8">

          {/* Breadcrumb */}
          <div className="text-gray-500 text-sm mb-8">
            Home &gt; Internships
          </div>

          {/* Heading */}
          <div className="text-center mb-10">

            <h1 className="text-[42px] font-semibold text-gray-800">
              {finalInternships.length} Internships
            </h1>

            <p className="text-gray-600 mt-2">
              Search and Apply to Latest Internships
            </p>

          </div>

          <div className="grid grid-cols-12 gap-6">

            {/* Left Sidebar */}
            <div className="col-span-3">

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">

                <h2 className="flex items-center justify-center gap-2 text-[20px] font-semibold mb-8">

                  <FiFilter className="text-blue-500" />

                  Filters

                </h2>

                {/* Profile */}
                <label className="block text-lg mb-2">
                  Profile
                </label>

                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  value={profile}
                  onChange={(e) =>
                    setProfile(e.target.value)
                  }
                  className="w-full border rounded-md p-3 mb-6"
                />

                {/* Location */}
                <label className="block text-lg mb-2">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="e.g. Delhi"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="w-full border rounded-md p-3 mb-6"
                />

                {/* WFH */}
                <label className="flex items-center gap-3 mb-4">

                  <input
                    type="checkbox"
                    checked={workFromHome}
                    onChange={() =>
                      setWorkFromHome(
                        !workFromHome
                      )
                    }
                    className="w-5 h-5"
                  />

                  Work from home

                </label>

                {/* Part Time */}
                <label className="flex items-center gap-3 mb-6">

                  <input
                    type="checkbox"
                    checked={partTime}
                    onChange={() =>
                      setPartTime(!partTime)
                    }
                    className="w-5 h-5"
                  />

                  Part-time

                </label>

                {/* Salary */}
                <label className="block text-lg mb-4">
                  Annual salary (in lakhs)
                </label>

                <input
                  type="range"
                  min="0"
                  max="10"
                  value={salary}
                  onChange={(e) =>
                    setSalary(
                      Number(e.target.value)
                    )
                  }
                  className="w-full"
                />

                <div className="flex justify-between mt-3 text-gray-500">

                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>

                </div>

                <div className="text-right mt-8">

                 
                    <label className="block text-[15px] font-normal text-[#060505] mb-3 mt-8 text-left">
  Years of experience
</label>

<select
  className="
    w-full
    h-[45px]
    px-4
    text-[16px]
    text-[#666]
    bg-white
    border
    border-[#d6d6d6]
    rounded
    outline-none
    focus:border-[#d6d6d6]
  "
>
  <option>Select years of experience</option>
  <option>0 Year</option>
  <option>1 Year</option>
  <option>2 Years</option>
  <option>3 Years</option>
  <option>4 Years</option>
  <option>5+ Years</option>
</select>
 <button
                    onClick={() => {
                      setProfile("");
                      setLocation("");
                      setSalary(0);
                      setWorkFromHome(false);
                      setPartTime(false);
                    }}
                    className="text-blue-600"
                  >
                 <div className="text-blue-600 text-right cursor-pointer mt-4">
                   Clear all
                 </div>

                  </button>
                  <div className="mt-8">

  {/* OR Line */}
  <div className="flex items-center mb-8">

    <div className="flex-1 border-t border-gray-300"></div>

    <span className="px-4 text-gray-500 text-[15px]">
      OR
    </span>

    <div className="flex-1 border-t border-gray-300"></div>

  </div>

  {/* Search Heading */}
  <h3 className="text-center text-[20px] font-semibold text-[#333] mb-5">
    Search
  </h3>

  {/* Search Box */}
  <div className="flex">

    <input
  type="text"
  placeholder="e.g. Design, Mumbai, Infosys"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    flex-1
    h-[48px]
    px-4
    border
    border-[#d6d6d6]
    rounded-l
    text-[16px]
    outline-none
  "
/>

    <button
      className="
        w-[54px]
        h-[48px]
        bg-[#00A5EC]
        rounded-r
        flex
        items-center
        justify-center
        text-white
        text-xl
      "
    >
      🔍
    </button>

  </div>

</div>

                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="col-span-9">

              {/* Sort */}
              <div className="flex justify-end mb-5">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">
                    Sort By
                  </option>

                  <option value="salary-high">
                    Highest Salary
                  </option>

                  <option value="salary-low">
                    Lowest Salary
                  </option>

                  <option value="latest">
                    Latest Posted
                  </option>

                </select>

              </div>

              {/* Cards */}
              <div>

                {finalInternships.length > 0 ? (
  finalInternships.map(
    (internship) => (
      <InternshipCard
        key={internship.id}
        internship={internship}
        onClick={() =>
          setSelectedInternship(internship)
        }
      />
    )
  )
                ) : (
                  <div className="bg-white rounded-xl p-10 text-center">

                    No internships found

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
{selectedInternship && (
  <div
    className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4"
    onClick={() => setSelectedInternship(null)}
  >
    <div
      className="bg-white w-full max-w-[850px] rounded-lg max-h-[90vh] overflow-y-auto no-scrollbar"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
<div className=" bg-gray-100 border-gray-400 h-[80px] flex items-center justify-center relative">

  <h2 className="text-[18px] font-small">
    Applying to {selectedInternship.title}
  </h2>

  <button
    onClick={() => setSelectedInternship(null)}
    className="absolute right-6 text-3xl text-gray-500"
  >
    ×
  </button>

</div>


<div className=" p-8">

  {/* TOP */}
  <div className="flex justify-between items-start">

    <div>

      <h1 className="text-[24px] font-semibold text-[#333]">
        {selectedInternship.title}
      </h1>

      <div className="flex items-center gap-3 mt-2">

        <p className="text-[16px] text-[#666]">
          {selectedInternship.company_name}
        </p>

        <span className="bg-[#eaf4ff] text-[#2f80ed] px-3 py-1 rounded-full text-xs">
          Actively hiring
        </span>

      </div>

    </div>

    {(selectedInternship.company_logo ||
      selectedInternship.company_logo_url ||
      selectedInternship.logo) && (
      <img
        src={
          selectedInternship.company_logo ||
          selectedInternship.company_logo_url ||
          selectedInternship.logo
        }
        alt="logo"
        className="w-14 h-14 object-contain"
      />
    )}

  </div>

  {/* DETAILS */}

  <div className="mt-8 space-y-6 text-[#555]">

    <div className="flex items-center gap-3">

      <BiRupee className="text-[20px] text-[#888]" />

      <span className="text-[16px]">
        {selectedInternship.stipend?.salary ||
          selectedInternship.salary ||
          "Not disclosed"}
      </span>

    </div>

    <div className="flex items-center gap-3">

      <FiMapPin className="text-[18px] text-[#888]" />

      <span className="text-[16px]">
        {selectedInternship.location_names?.join(", ")}
      </span>

    </div>

    <div className="flex items-center gap-3">

      <FiBriefcase className="text-[18px] text-[#888]" />

      <span className="text-[16px]">
        {selectedInternship.experience ||
          "No experience required"}
      </span>

    </div>

  </div>

  {/* TAGS + APPLY */}

  <div className="mt-10 flex justify-between items-center">

    <div className="flex gap-3 flex-wrap">

      <span className="bg-[#e8f8ff] text-[#00a5ec] px-4 py-2 rounded-full text-sm flex items-center gap-2">

        <FiClock />

        {selectedInternship.posted_by_label ||
          "Recently posted"}

      </span>

      <span className="bg-[#f4f4f4] text-[#666] px-4 py-2 rounded-full text-sm flex items-center gap-2">

        <BsLightningChargeFill className="text-yellow-500" />

        Be an early applicant

      </span>

      <span className="bg-[#f4f4f4] text-[#666] px-4 py-2 rounded-full text-sm">
        Fresher Job
      </span>

    </div>

    <button className="bg-[#00A5EC] hover:bg-[#0096d6] text-white px-8 py-3 rounded font-semibold">
      Apply now
    </button>

  </div>

</div>

<div className="h-px bg-[#ececec] w-full"></div>



<div className="px-8 py-6">

  <div className="flex items-center gap-3 mb-6">

    <h3 className="text-[18px] font-semibold text-[#333]">
      About the job
    </h3>

    <span className="bg-[#eef0ff] text-[#7077b8] text-xs px-3 py-2 rounded-md font-medium">
      Summarized by AI ✨
    </span>

  </div>

  {/* Role Overview */}

  <div className="mb-6">

    <h4 className="font-semibold text-[16px] text-[#333] mb-2">
      Role Overview:
    </h4>

    <ul className="list-disc ml-6 text-[15px] text-[#444] space-y-2">

      <li>
        Work as a {selectedInternship.profile_name} intern and
        contribute to day-to-day business operations.
      </li>

      <li>
        Collaborate with team members and support ongoing projects.
      </li>

      <li>
        Gain practical industry experience while working with{" "}
        {selectedInternship.company_name}.
      </li>

    </ul>

  </div>

  {/* Requirements */}

  <div className="mb-6">

    <h4 className="font-semibold text-[16px] text-[#333] mb-2">
      Requirements:
    </h4>

    <ul className="list-disc ml-6 text-[15px] text-[#444] space-y-2">

      <li>
        Available for {selectedInternship.duration}.
      </li>

      <li>
        Can start {selectedInternship.start_date}.
      </li>

      <li>
        Interested in{" "}
        {selectedInternship.profile_name}.
      </li>

      {selectedInternship.work_from_home ? (
        <li>Comfortable working remotely.</li>
      ) : (
        <li>
          Comfortable working from{" "}
          {selectedInternship.location_names?.join(", ")}.
        </li>
      )}

    </ul>

  </div>

  {/* Internship Details */}

  <div className="mb-6">

    <h4 className="font-semibold text-[16px] text-[#333] mb-2">
      Internship Details:
    </h4>

    <ul className="list-disc ml-6 text-[15px] text-[#444] space-y-2">

      <li>
        Duration: {selectedInternship.duration}
      </li>

      <li>
        Stipend:{" "}
        {selectedInternship.stipend?.salary}
      </li>

      <li>
        Apply before:{" "}
        {selectedInternship.application_deadline}
      </li>

      <li>
        Type: {selectedInternship.employment_type}
      </li>

    </ul>

  </div>

  {/* Company */}

  <div>

    <h4 className="font-semibold text-[16px] text-[#333] mb-2">
      About {selectedInternship.company_name}:
    </h4>

    <ul className="list-disc ml-6 text-[15px] text-[#444] space-y-2">

      <li>
        Opportunity available at{" "}
        {selectedInternship.company_name}.
      </li>

      <li>
        Location:{" "}
        {selectedInternship.location_names?.join(", ")}.
      </li>

      <li>
        Posted {selectedInternship.posted_by_label}.
      </li>

    </ul>

  </div>

</div>

     <div className="bg-[#eaf6ff]  py-8 text-center">

  <h3 className="text-[18px] font-semibold text-[#333] mb-5">
    Interested? Apply now
  </h3>

  <button
    className="
      inline-flex
      items-center
      gap-3
      bg-[#009FE3]
      hover:bg-[#0093d3]
      text-white
      px-12
      py-3
      rounded
      font-semibold
      transition
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-6 h-6 bg-white rounded-full p-1"
    >
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 16.108 19.008 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.093 0 9.786-1.947 13.341-5.122l-6.162-5.212C29.126 35.091 26.665 36 24 36c-5.174 0-9.619-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.793 2.266-2.245 4.219-4.124 5.666l.003-.002 6.162 5.212C36.91 38.57 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>

    Continue with Google
  </button>

  <div className="mt-4">
    <button className="text-[#009FE3] hover:underline">
      Use email instead
    </button>
  </div>

  <p className="text-gray-500 text-sm mt-4">
    By continuing, you agree to our T&C.
  </p>

</div>

     

    </div>
  </div>
)}
      </main>
    </>
  );
}