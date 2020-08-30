import { writable } from 'svelte/store';

export const message = writable({
  content: '',
  show: false
});
