"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import InternshipCard from "./components/InternshipCard";

export default function Home() {
  const [internships, setInternships] = useState([]);

  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);

  const [workFromHome, setWorkFromHome] =
    useState(false);

  const [partTime, setPartTime] =
    useState(false);

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/internships");
      const data = await res.json();
      setInternships(data);
    }

    loadData();
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
        (item.location_names
          ?.join(", ")
          .toLowerCase()
          .includes(location.toLowerCase()) ??
          false);

      const matchesSalary =
        (item.stipend?.salaryValue1 || 0) >=
        salary * 100000;

      const matchesWFH =
        !workFromHome || item.work_from_home;

      const matchesPartTime =
        !partTime || item.part_time;

      return (
        matchesProfile &&
        matchesLocation &&
        matchesSalary &&
        matchesWFH &&
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

      <main className="bg-gray-100 min-h-screen">

        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold">
              {finalInternships.length} Internships
            </h1>

            <p className="text-gray-600 mt-2">
              Search and Apply to Latest Internships
            </p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Filters */}
            <div className="lg:col-span-3">

              <div className="bg-white rounded-xl border p-5 sticky top-24">

                <h2 className="text-2xl font-semibold mb-5">
                  Filters
                </h2>

                <label className="block mb-2 font-medium">
                  Profile
                </label>

                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  value={profile}
                  onChange={(e) =>
                    setProfile(e.target.value)
                  }
                  className="w-full border rounded-lg p-3 mb-5"
                />

                <label className="block mb-2 font-medium">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="e.g. Delhi"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  className="w-full border rounded-lg p-3 mb-5"
                />

                <label className="flex items-center gap-2 mb-3">

                  <input
                    type="checkbox"
                    checked={workFromHome}
                    onChange={() =>
                      setWorkFromHome(
                        !workFromHome
                      )
                    }
                  />

                  Work from home

                </label>

                <label className="flex items-center gap-2 mb-5">

                  <input
                    type="checkbox"
                    checked={partTime}
                    onChange={() =>
                      setPartTime(!partTime)
                    }
                  />

                  Part-time

                </label>

                <label className="block mb-3 font-medium">
                  Salary (Lakhs)
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

                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0</span>
                  <span>10</span>
                </div>

              </div>

            </div>

            {/* Right Side */}
            <div className="lg:col-span-9">

              {/* Sort */}
              <div className="flex justify-end mb-5">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="bg-white border rounded-lg px-4 py-3"
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
                <div className="bg-white rounded-xl p-8 text-center">

                  No internships found

                </div>
              )}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}