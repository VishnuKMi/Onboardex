"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage); // Call the callback function with the new page
    }
  };

  return (
    <ul className={`pagination flex gap-x-2 ${className}`}>
      <li
        className={`p-1.5 max-h-8 rounded-lg bg-[#DEDEFA] ${
          currentPage === 1 ? "disabled" : ""
        }`}
      >
        <button onClick={() => handlePageChange(currentPage - 1)}>
          <ChevronLeft size={20} color="#5C59E8" />
        </button>
      </li>
      {Array.from(Array(totalPages).keys()).map((i) => (
        <li
          key={i}
          className={`p-1.5 max-h-8 rounded-lg  font-semibold text-sm ${
            currentPage === i + 1
              ? "bg-[#5C59E8] text-white"
              : "bg-[#DEDEFA] text-[#5C59E8]"
          }`}
        >
          <button
            className="w-5 max-h-5"
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      ))}
      <li
        className={`p-1.5 max-h-8 rounded-lg bg-[#DEDEFA] ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <button onClick={() => handlePageChange(currentPage + 1)}>
          <ChevronRight size={20} color="#5C59E8" />
        </button>
      </li>
    </ul>
  );
};
