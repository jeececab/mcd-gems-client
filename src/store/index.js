import { writable } from 'svelte/store';

export const message = writable({
  content: '',
  show: false
});

export const currentPage = writable(document.location.pathname);