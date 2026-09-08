/**
 * Browser-native MediaRecorder & getUserMedia helper utilities
 */

export interface RecordingControls {
  mediaRecorder: MediaRecorder;
  stop: () => void;
}

/**
 * Returns supported video MIME type for recording across browsers (Chrome, Firefox, Safari).
 */
export function getSupportedMimeType(): string {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    return 'video/webm';
  }

  const types = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/webm',
    'video/mp4;codecs=h264,aac',
    'video/mp4',
  ];

  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }

  return 'video/webm';
}

/**
 * Request camera and microphone media stream from browser.
 */
export async function getCameraAndMicStream(): Promise<MediaStream> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error('Webcam and audio recording are not supported in this browser or environment.');
  }

  return await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      facingMode: 'user',
    },
    audio: true,
  });
}

/**
 * Safely stop all tracks of a MediaStream.
 */
export function stopStreamTracks(stream: MediaStream | null) {
  if (!stream) return;
  stream.getTracks().forEach((track) => {
    try {
      track.stop();
    } catch (err) {
      console.warn('Error stopping track:', err);
    }
  });
}
