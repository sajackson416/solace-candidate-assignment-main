"use client";

import { Advocate } from "@/db/seed/advocates";
import { ChangeEvent, useEffect, useState } from "react";
import { Pagination } from "./api/advocates/route";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates?page=1").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setPagination(jsonResponse.pagination);
      });
    });
  }, []);

  useEffect(() => {
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.toString().includes(searchTerm)
      );
    });
    setFilteredAdvocates(filteredAdvocates);
  }, [searchTerm]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
    setSearchTerm("");
    const input = document.getElementById("search-input") as HTMLInputElement | null;
    if (input) {
      input.value = "";
    }
  };

  const setPage = (page: number) => {
    fetch(`/api/advocates?page=${page}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setPagination(jsonResponse.pagination);
      });
    });
  };

  return (
    <div>
      <header className="bg-primary p-4">
        <h1>Solace Advocates</h1>
      </header>
      <main className="my-24 mx-auto" style={({width: "90%",})}>
        <div>
          <p className="text-lg mb-2">Search</p>
          <input id="search-input"
            onChange={onChange} />
          {searchTerm && <button onClick={onClick}>Clear</button>}
          <div><button onClick={() => setPage(pagination.currentPage - 1)}>Previous</button> {pagination.currentPage} of {pagination.totalPages} <button onClick={() => setPage(pagination.currentPage + 1)}>Next</button></div>
        </div>
        <div className="table-wrapper">
          <table style={{ width: "100%", margin: "0 auto" }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Degree</th>
                <th>Specialties</th>
                <th>Years of Experience</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate) => {
                return (
                  <tr key={advocate.phoneNumber}>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                      {advocate.specialties.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
