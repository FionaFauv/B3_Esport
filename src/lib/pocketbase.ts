import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
// Log pour déboguer l'URL
console.log('PocketBase URL:', process.env.NEXT_PUBLIC_PB_URL);
pb.autoCancellation(false);

export { pb };