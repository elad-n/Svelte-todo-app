import { writable } from 'svelte/store';

export const todoFromStore = writable([
  { id: 1, title: 'Learn Svelte', completed: false },
  { id: 2, title: 'Write todo app', completed: false },
  { id: 3, title: 'Teach it', completed: false },
  { id: 4, title: 'Go to sleep', completed: false },
]);