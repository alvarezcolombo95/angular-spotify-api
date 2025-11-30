import { Injectable, OnInit } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService implements OnInit {

  constructor(private http: HttpClient) {
    console.log("LOGIN SERVICE LOADED");
    this.token = localStorage.getItem('token') || '';
   }

  ngOnInit(): void {}

  // --- PKCE helpers ---
  private generateRandomString(length: number) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    array.forEach((x) => (text += possible.charAt(x % possible.length)));
    return text;
  }

  private async generateCodeChallenge(verifier: string) {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(digest);
  }

  private base64UrlEncode(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  // --- end PKCE helpers ---

async getUrlLogin() {
  const verifier = this.generateRandomString(64);
  const challenge = await this.generateCodeChallenge(verifier);
  localStorage.setItem('pkce_verifier', verifier);

  const url = new URL(SpotifyConfiguration.authEndpoint);

  url.searchParams.set("client_id", SpotifyConfiguration.clientId);
  url.searchParams.set("redirect_uri", SpotifyConfiguration.redirectUrl);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("show_dialog", "true");
  url.searchParams.set("scope", SpotifyConfiguration.scope.join(" "));

  console.log("FINAL URL:", url.toString());

  return url.toString();
}

  // HANDLE AUTH CALLBACK //
  async handleAuthCallback() {
  await this.getTokenFromUrl();

  // fetch user profile to get ID
  const profileResp = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + this.token }
  });

  const profile = await profileResp.json();

  if (profile?.id) {
    localStorage.setItem('spotify_user_id', profile.id);
    console.log("Saved Spotify user ID:", profile.id);
  }
}


  // --- EXCHANGE CODE FOR TOKEN ---
  async exchangeCodeForToken(code: string): Promise<string> {
    const verifier = localStorage.getItem('pkce_verifier');
    if (!verifier) {
      console.error('PKCE verifier missing');
      return '';
    }

    const body = new HttpParams({
      fromObject: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: SpotifyConfiguration.redirectUrl,
        client_id: SpotifyConfiguration.clientId,
        code_verifier: verifier
      }
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const tokenResp: any = await this.http
      .post('https://accounts.spotify.com/api/token', body.toString(), { headers })
      .toPromise();

    const accessToken = tokenResp.access_token;

    if (accessToken) {
      localStorage.setItem('token', accessToken); 
      this.token = accessToken;
      
      const expiresIn = tokenResp.expires_in;       // seconds
      const expirationTime = Date.now() + expiresIn * 1000;
      localStorage.setItem('token_expiration', expirationTime.toString());
    }

    return accessToken;
  }
  // -----------------------------------------


  async getTokenFromUrl() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');

    if (!code) {
      console.log('No existe código en la url');
      return '';
    }

    console.log('Se encontró un código, intercambiando por token…');

    // Perform code → access_token exchange
    const token = await this.exchangeCodeForToken(code);

    // Clean URL (remove ?code=…)
    window.history.replaceState({}, document.title, window.location.pathname);

    return token;
  }

  public token = '';

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    this.token = '';
  }

  checkLog() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');

    if (!token || token === '' || token === 'undefined') return false;
    if (!expiration) return false;

    const expiresAt = parseInt(expiration);
    if (Date.now() > expiresAt) {
      console.log('Token expired, logging out.');
      this.logOut();
      return false;
    }

    return true;
  }
}
