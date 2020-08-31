import { writable } from 'svelte/store';

export const auth = writable({
  loading: false,
  logged: false
})

export const message = writable({
  content: '',
  show: false
});

export const currentPage = writable(document.location.pathname);