import PocketBase from 'pocketbase';

const pb = (() => {
  const POCKETBASE_URL = process.env.EXPO_PUBLIC_POCKETBASE_URL;
  console.log('POCKETBASE_URL', POCKETBASE_URL)
  return new PocketBase(POCKETBASE_URL);
})();
pb.autoCancellation(false);

export default pb;