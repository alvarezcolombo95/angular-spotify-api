import { Injectable, OnInit } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService implements OnInit {

  constructor(private http: HttpClient) { }

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
    // Generate PKCE verifier + challenge
    const verifier = this.generateRandomString(64);
    const challenge = await this.generateCodeChallenge(verifier);

    // Save verifier for later (used after redirect)
    localStorage.setItem('pkce_verifier', verifier);

    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scope.join('%20')}&`;
    
    // Changed ONLY this:
    const responseType = `response_type=code&code_challenge_method=S256&code_challenge=${challenge}&show_dialog=true`;

    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  // HANDLE AUTH CALLBACK //
  async handleAuthCallback() {
  await this.getTokenFromUrl();
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
      localStorage.setItem('token', accessToken);  // unchanged
      this.token = accessToken;                   // unchanged
    }

    return accessToken;
  }
  // -----------------------------------------


  async getTokenFromUrl() {
    // CHANGED: code now comes in querystring, not hash
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
    localStorage.setItem('token', '');
    this.token = '';
  }

  checkLog() {
    return !!localStorage.getItem('token');
  }
}
