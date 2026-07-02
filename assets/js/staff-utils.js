import { auth } from './firebase-config.js';
import { signInAnonymously, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js';

let authReadyResolver;
const authReadyPromise = new Promise((resolve) => {
  authReadyResolver = resolve;
});

onAuthStateChanged(auth, (user) => {
  if (user && typeof authReadyResolver === 'function') {
    authReadyResolver(user);
    authReadyResolver = null;
  }
});

export async function ensureAnonymousAuth() {
  if (auth.currentUser) {
    return auth.currentUser;
  }

  try {
    await signInAnonymously(auth);
    if (auth.currentUser) {
      return auth.currentUser;
    }
    return await authReadyPromise;
  } catch (error) {
    console.error('Anonymous sign-in failed:', error);
    throw error;
  }
}

export function updateStaffNameDisplay(selector = '.sidebar-footer strong') {
  const element = document.querySelector(selector);
  if (!element) return;

  const user = auth.currentUser;
  const name = user
    ? user.displayName || user.email || `Staff-${String(user.uid || '').slice(0, 8)}`
    : 'Staff';

  element.textContent = String(name).split('@')[0];
}

export function bindStaffLogout(selector = '.logout-btn', redirectUrl = 'login.html') {
  const button = document.querySelector(selector);
  if (!button) return;

  button.addEventListener('click', (event) => {
    event.preventDefault();
    signOut(auth)
      .catch((error) => {
        console.warn('Sign-out failed:', error);
      })
      .finally(() => {
        window.location.href = redirectUrl;
      });
  });
}

export function getStaffDisplayId() {
  return auth.currentUser?.email || auth.currentUser?.uid || 'anonymous';
}
