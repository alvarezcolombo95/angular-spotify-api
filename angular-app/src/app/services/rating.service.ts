import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AlbumRating {
  albumId: string;
  rating: number;
  name: string;
  artists: string;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiUrl = 'http://localhost:3000/ratings';  // backend URL
  

  constructor(private http: HttpClient) { }

  /** List all ratings for logged-in user */
  getAllRatings(): Observable<AlbumRating[]> {
    return this.http.get<AlbumRating[]>(this.apiUrl);
  }

  /** Get one album rating */
  getRating(albumId: string): Observable<AlbumRating | null> {
    return this.http.get<AlbumRating | null>(`${this.apiUrl}/${albumId}`);
  }

  /** Set/update rating */
  setRating(albumId: string, rating: number, name: string, artists: string) {

    const userId = localStorage.getItem('spotify_user_id');

    return this.http.post(this.apiUrl, {
      userId,
      albumId,
      rating,
      name,
      artists
    });
  }
}