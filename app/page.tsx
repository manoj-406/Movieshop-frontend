"use client";
import React, { useState, useEffect } from "react";

type MovieData = {
  id: number;
  Movie_title: string;
  Director: string;
  Release_date: string;
};

const Page = () => {
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [error, setError] = useState<string | null>(null);
 
  const fetchData = async () => {
    try {
      const response:any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}movie`);
      if (response.ok) {
        const data: MovieData[] = await response.json();
        setMovieData(data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError("Failed to load movie data. Please try again later.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const Movie_title = formdata.get("movieName") as string;
    const Director = formdata.get("diector") as string;
    const Release_date = formdata.get("date") as string;
    console.log({ Movie_title, Director, Release_date });

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Movie_title, Director, Release_date }),
    });
    await fetchData();
  };

  return (
    <div className="overflow-y-auto h-screen">
      <h1 className="text-4xl text-black text-center p-8 font-bold font-serif">
        Movie Shop
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-center justify-center gap-8 text-black mb-8"
      >
        <div className="flex gap-8 flex-wrap justify-center w-full">
          <input
            type="text"
            name="movieName"
            placeholder="Movie name"
            className="p-4 rounded-md shadow-xl bg-white/90"
            required
          />
          <input
            type="text"
            name="diector" // Consider changing this to "director" for clarity
            placeholder="Director Name"
            className="p-4 rounded-md shadow-xl bg-white/90"
            required
          />
          <input
            type="date"
            name="date"
            className="p-4 rounded-md shadow-xl bg-white/90"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#964B00] text-white rounded-md px-8 py-2 shadow-xl"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {movieData?.map((data: MovieData) => (
        <div key={data.id} className="border p-4 m-2 rounded-md">
          <p>
            <strong>Movie Name:</strong> {data.Movie_title}
          </p>
          <p>
            <strong>Director:</strong> {data.Director}
          </p>
          <p>
            <strong>Release Date:</strong> {data.Release_date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
