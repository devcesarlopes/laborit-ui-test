export const getFileUrl = (
    collectionId: string,
    itemId: string,
    fileName: string
  ): string => {
    return `${process.env.EXPO_PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${itemId}/${fileName}`;
  };