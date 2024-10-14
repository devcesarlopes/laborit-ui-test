import {fetch} from '@react-native-community/netinfo';

export async function isConnectedAsync(): Promise<boolean> {
  try {
    const state = await fetch();
    return !!state?.isConnected;
  } catch {
    return false;
  }
}
