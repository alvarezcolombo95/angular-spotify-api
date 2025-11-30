import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, tap } from 'rxjs';

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

  private apiUrl = 'http://localhost:3000/ratings';

  // Avisar al componente cuando un rating es creado/updateado
  ratingChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Devuelve Spotify user ID de localStorage
  private getUserId(): string | null {
    return localStorage.getItem('spotify_user_id');
  }

  //Get ALL ratings del usuario logueado
  getAllRatings(): Observable<AlbumRating[]> {
    const userId = this.getUserId();
    if (!userId) return of([]);
    return this.http.get<AlbumRating[]>(`${this.apiUrl}/${userId}`);
  }

  //Get rating de album especifico
  getRating(albumId: string): Observable<AlbumRating | null> {
    const userId = this.getUserId();
    if (!userId) return of(null);
    return this.http.get<AlbumRating | null>(`${this.apiUrl}/${userId}/${albumId}`);
  }

  //Crear o updetear un rating
  setRating(albumId: string, rating: number, name: string, artists: string) {
    const userId = this.getUserId();

    return this.http.post(this.apiUrl, {
      userId,
      albumId,
      rating,
      name,
      artists
    }).pipe(
      tap(() => {
        // Emit event so UI refreshes everywhere
        this.ratingChanged.next();
      })
    );
  }
}
