import { StudentInfo } from '@/context/AssessmentContext';

export interface SyncResponse {
  success: boolean;
  message: string;
  syncedAt?: string;
  data?: any;
}

/**
 * Placeholder function to simulate uploading a recorded video Blob to cloud storage
 * (e.g. AWS S3, Supabase Storage, Firebase).
 */
export async function uploadRecording(
  blob: Blob,
  studentInfo: StudentInfo
): Promise<{ storageUrl: string; sizeBytes: number }> {
  console.log('[STUB] uploadRecording triggered');
  console.log('[STUB] Student:', studentInfo.name, 'Grade:', studentInfo.grade);
  console.log('[STUB] Video Blob Size:', blob.size, 'bytes, Type:', blob.type);

  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const mockStorageUrl = `https://storage.example.com/assessments/${studentInfo.grade}/${Date.now()}_${encodeURIComponent(
    studentInfo.name.replace(/\s+/g, '_')
  )}.webm`;

  console.log('[STUB] Upload finished. Storage URL:', mockStorageUrl);

  return {
    storageUrl: mockStorageUrl,
    sizeBytes: blob.size,
  };
}

/**
 * Sends student details + recording metadata to the external Vercel application.
 * Configured via process.env.NEXT_PUBLIC_OTHER_APP_API_URL
 */
export async function syncWithExternalApp(
  studentInfo: StudentInfo,
  recordingMetadata: {
    durationSeconds?: number;
    questionCount?: number;
    storageUrl?: string;
    blobSizeBytes?: number;
  },
  videoBlob?: Blob
): Promise<SyncResponse> {
  const targetEndpoint = process.env.NEXT_PUBLIC_OTHER_APP_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_OTHER_APP_API_KEY || 'bearer_token_placeholder';

  console.log('[STUB] Target Sync Endpoint:', targetEndpoint);

  const payload = {
    student: {
      name: studentInfo.name,
      grade: studentInfo.grade,
      registeredAt: studentInfo.registeredAt,
      consentGiven: studentInfo.consentGiven,
    },
    recording: {
      ...recordingMetadata,
      uploadedAt: new Date().toISOString(),
    },
  };

  try {
    if (!targetEndpoint || targetEndpoint.includes('example.com')) {
      console.log('[STUB] Real endpoint not configured. Returning simulated sync payload:', payload);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        success: true,
        message: 'Successfully synced with external Vercel app (Simulated Mode)',
        syncedAt: new Date().toISOString(),
        data: payload,
      };
    }

    // Prepare FormData if attaching blob directly, or JSON if sending metadata
    let bodyData: BodyInit;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
    };

    if (videoBlob) {
      const formData = new FormData();
      formData.append('metadata', JSON.stringify(payload));
      formData.append('video', videoBlob, `${studentInfo.name}_assessment.webm`);
      bodyData = formData;
    } else {
      headers['Content-Type'] = 'application/json';
      bodyData = JSON.stringify(payload);
    }

    const response = await fetch(targetEndpoint, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: bodyData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Sync request failed with status ${response.status}: ${errText}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Assessment data successfully synced with external Vercel app.',
      syncedAt: new Date().toISOString(),
      data: result,
    };
  } catch (error: any) {
    console.error('[API Sync Error]:', error);
    return {
      success: false,
      message: error.message || 'Failed to sync with external app.',
    };
  }
}
