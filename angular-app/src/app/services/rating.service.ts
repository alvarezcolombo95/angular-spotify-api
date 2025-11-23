import { Injectable } from '@angular/core';

export interface AlbumRating {
  albumId: string;
  rating: number;
  name: string;      // NEW
  artists: string;   // NEW
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private storageKey = 'albumRatings';

  constructor() {}

  /** Load all ratings from localStorage */
  private loadRatings(): AlbumRating[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }

  /** Save ratings to localStorage */
  private saveRatings(ratings: AlbumRating[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(ratings));
  }

  /** Set rating for an album */
  setRating(albumId: string, rating: number, name: string, artists: string) {
  const ratings = this.loadRatings();

  const existing = ratings.find(r => r.albumId === albumId);
  if (existing) {
    existing.rating = rating;
    existing.name = name;
    existing.artists = artists;
  } else {
    ratings.push({
      albumId,
      rating,
      name,
      artists
    });
  }

  this.saveRatings(ratings);
}

  /** Get rating of a specific album */
  getRating(albumId: string): number | null {
    const ratings = this.loadRatings();
    const entry = ratings.find(r => r.albumId === albumId);
    return entry ? entry.rating : null;
  }

  /** List all rated albums */
  getAllRatings(): AlbumRating[] {
    return this.loadRatings();
  }

  /** Later useful: get albums sorted by rating */
  getRatingsSorted(): AlbumRating[] {
    return this.loadRatings().sort((a, b) => b.rating - a.rating);
  }
}