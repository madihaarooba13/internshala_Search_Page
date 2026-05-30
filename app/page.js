"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import InternshipCard from "./components/InternshipCard";
import { FiFilter } from "react-icons/fi";

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

      </main>
    </>
  );
}