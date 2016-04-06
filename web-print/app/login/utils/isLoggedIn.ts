/**
 * Created by Omar on 4/6/16.
 */
export function isLoggedIn() {
  return localStorage.getItem('token');
}

