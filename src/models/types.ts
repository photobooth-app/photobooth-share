export enum MediaStatus {
  init = 'init',
  unavailable = 'unavailable',
  display = 'display',
  // loaded = 'loaded',
  //   errored = 'errored',
}
export enum MediaTypes {
  unknown = 'unknown',
  image = 'image',
  video = 'video',
}

export const mimeToExtension: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
};
