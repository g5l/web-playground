import { NextResponse } from "next/server";

type Movie = {
  id: string;
  title: string;
  year: number;
  rating: number;
};

const MOCK_MOVIES: Movie[] = [
  { id: "tt0111161", title: "The Shawshank Redemption", year: 1994, rating: 9.3 },
  { id: "tt0068646", title: "The Godfather", year: 1972, rating: 9.2 },
  { id: "tt0468569", title: "The Dark Knight", year: 2008, rating: 9.0 },
  { id: "tt0109830", title: "Forrest Gump", year: 1994, rating: 8.8 },
];

export async function GET() {
  return NextResponse.json({
    movies: MOCK_MOVIES,
    servedAt: new Date().toISOString(),
  });
}

