"use client";

import { useState } from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineClock,
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOfficeBuilding,
} from "react-icons/hi";

import { BsCashStack } from "react-icons/bs";

export default function InternshipCard({
  internship,
  onClick,
}) {
  const [logoError, setLogoError] = useState(false);
  

  return (
<div
  onClick={onClick}
  className="
    bg-white
    border
    border-gray-200
    rounded-2xl
    p-6
    shadow-sm
    mb-5
    cursor-pointer
    transition-all
    duration-300
    hover:shadow-xl
    hover:-translate-y-1
    hover:scale-[1.01]
  "
>
      {/* Header */}
      <div className="flex justify-between items-start">

        <div className="flex-1 pr-4">

          <h2 className="text-[18px] font-semibold text-gray-800">
            {internship.title}
          </h2>

          <div className="flex items-center gap-3 mt-2 flex-wrap">

            <p className="text-[15px] text-gray-500">
              {internship.company_name}
            </p>

            <span className="border border-blue-500 text-blue-500 text-xs px-3 py-1 rounded-full">
              Actively hiring
            </span>

          </div>

        </div>

        {/* Company Logo */}
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">

          {internship.company_logo && !logoError ? (
            <img
              src={`https://internshala-uploads.internshala.com/logo%2F${internship.company_logo}`}
              alt={internship.company_name}
              className="w-12 h-12 object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <HiOfficeBuilding className="text-gray-300 text-4xl" />
          )}

        </div>

      </div>

      {/* Details */}
      <div className="flex flex-wrap gap-6 mt-5 text-sm text-gray-600">

        {internship.work_from_home ? (
          <div className="flex items-center gap-2">
            <HiOutlineHome className="text-gray-500 text-lg" />
            <span>Work from home</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-gray-500 text-lg" />

            <span>
              {internship.location_names?.length
                ? internship.location_names.join(", ")
                : "Remote"}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <BsCashStack className="text-gray-500" />

          <span>
            {internship.stipend?.salary || "Not disclosed"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineBriefcase className="text-gray-500" />

          <span>
            {internship.duration || "N/A"}
          </span>
        </div>

      </div>

      {/* Responsibilities */}
      <div className="mt-5 flex items-start gap-2 text-sm text-gray-700">

        <HiOutlineDocumentText className="text-gray-500 mt-0.5 text-lg flex-shrink-0" />

        <p className="line-clamp-1">
          <span className="font-medium">
            Key Responsibilities:
          </span>{" "}
          {internship.profile_name || internship.title}
        </p>

      </div>

      {/* Skills / Labels */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-5 text-[15px] text-gray-500">

        {internship.labels_app_in_card?.length ? (
          internship.labels_app_in_card.map((label, index) => (
            <div
              key={index}
              className="flex items-center"
            >
              <span>{label}</span>

              {index !==
                internship.labels_app_in_card.length - 1 && (
                <span className="mx-2 text-gray-300">
                  •
                </span>
              )}
            </div>
          ))
        ) : (
          <>
            <span>{internship.profile_name}</span>

            {internship.employment_type && (
              <>
                <span className="text-gray-300">
                  •
                </span>

                <span>
                  {internship.employment_type}
                </span>
              </>
            )}
          </>
        )}

        {internship.office_days && (
          <>
            <span className="text-gray-300">
              •
            </span>

            <span>
              {internship.office_days}
            </span>
          </>
        )}

      </div>

      {/* Bottom */}
      <div className="flex flex-wrap items-center gap-2 mt-5 text-sm text-gray-500">

        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">

          <HiOutlineClock />

          <span>
            {internship.posted_by_label ||
              "Recently Posted"}
          </span>

        </div>

        {internship.is_international_job && (
          <>
            <span>•</span>
            <span>International</span>
          </>
        )}

        {internship.part_time && (
          <>
            <span>•</span>
            <span>Part time</span>
          </>
        )}

        {internship.work_from_home && (
          <>
            <span>•</span>
            <span>Work from home</span>
          </>
        )}

      </div>
        
    </div>
    
  );
}