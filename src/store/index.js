import { writable } from 'svelte/store';

export const auth = writable({
  loading: true,
  user: null
});

export const message = writable({
  content: '',
  show: false
});

export const currentPage = writable(document.location.pathname);
