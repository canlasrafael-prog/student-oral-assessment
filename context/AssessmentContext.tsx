'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SelectedQuestion, getQuestionsForGrade } from '@/lib/questionSelector';

export type TestState =
  | 'INITIAL'
  | 'RECORDING_STARTED'
  | 'QUESTION_DISPLAYED'
  | 'ANSWERING_IN_PROGRESS'
  | 'LAST_QUESTION_DONE';

export interface StudentInfo {
  name: string;
  grade: string;
  consentGiven: boolean;
  registeredAt: string;
}

export interface AssessmentSubmission {
  id: string;
  studentName: string;
  grade: string;
  submittedAt: string;
  transcript: string;
  questionCount: number;
  durationSeconds: number;
  rubricScores?: {
    fluency: number;
    pronunciation: number;
    vocabulary: number;
    comprehension: number;
  };
  notes?: string;
}

interface AssessmentContextType {
  studentInfo: StudentInfo | null;
  questions: SelectedQuestion[];
  currentQuestionIndex: number;
  currentQuestion: SelectedQuestion | null;
  testState: TestState;
  recordedBlob: Blob | null;
  recordedBlobUrl: string | null;
  showKoreanSubtitles: boolean;
  isCenteredConfirmed: boolean;
  timerSecondsPerQuestion: number;
  liveTranscript: string;
  submissions: AssessmentSubmission[];
  registerStudent: (name: string, grade: string, consentGiven: boolean) => void;
  setTestState: (state: TestState) => void;
  advanceToNextQuestion: () => void;
  setRecordedBlob: (blob: Blob) => void;
  resetSession: () => void;
  toggleKoreanSubtitles: () => void;
  setCenteredConfirmed: (confirmed: boolean) => void;
  setTimerSecondsPerQuestion: (seconds: number) => void;
  setLiveTranscript: (text: string) => void;
  saveSubmission: (submission: AssessmentSubmission) => void;
  updateSubmissionRubric: (id: string, scores: AssessmentSubmission['rubricScores'], notes?: string) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [questions, setQuestions] = useState<SelectedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [testState, setTestState] = useState<TestState>('INITIAL');
  const [recordedBlob, setRecordedBlobState] = useState<Blob | null>(null);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [showKoreanSubtitles, setShowKoreanSubtitles] = useState<boolean>(false);
  const [isCenteredConfirmed, setCenteredConfirmed] = useState<boolean>(false);
  const [timerSecondsPerQuestion, setTimerSecondsPerQuestion] = useState<number>(60);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);

  // Initialize subtitles & submissions from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSubtitles = localStorage.getItem('app-korean-subtitles');
      if (savedSubtitles === 'true') {
        setShowKoreanSubtitles(true);
      }

      const savedSubmissions = localStorage.getItem('assessment-submissions');
      if (savedSubmissions) {
        try {
          setSubmissions(JSON.parse(savedSubmissions));
        } catch (err) {
          console.error('Error parsing stored submissions:', err);
        }
      }
    }
  }, []);

  // Clean up Blob URLs when changed or unmounted
  useEffect(() => {
    return () => {
      if (recordedBlobUrl) {
        URL.revokeObjectURL(recordedBlobUrl);
      }
    };
  }, [recordedBlobUrl]);

  const toggleKoreanSubtitles = () => {
    setShowKoreanSubtitles((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('app-korean-subtitles', String(next));
      }
      return next;
    });
  };

  const registerStudent = (name: string, grade: string, consentGiven: boolean) => {
    const info: StudentInfo = {
      name,
      grade,
      consentGiven,
      registeredAt: new Date().toISOString(),
    };
    setStudentInfo(info);
    
    // Select 5 grade questions
    const selected = getQuestionsForGrade(grade);
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setTestState('INITIAL');
    setRecordedBlobState(null);
    setRecordedBlobUrl(null);
    setCenteredConfirmed(false);
    setLiveTranscript('');
  };

  const advanceToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSetRecordedBlob = (blob: Blob) => {
    setRecordedBlobState(blob);
    if (recordedBlobUrl) {
      URL.revokeObjectURL(recordedBlobUrl);
    }
    const url = URL.createObjectURL(blob);
    setRecordedBlobUrl(url);
  };

  const resetSession = () => {
    setStudentInfo(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setTestState('INITIAL');
    if (recordedBlobUrl) {
      URL.revokeObjectURL(recordedBlobUrl);
    }
    setRecordedBlobState(null);
    setRecordedBlobUrl(null);
    setCenteredConfirmed(false);
    setLiveTranscript('');
  };

  const saveSubmission = (newSub: AssessmentSubmission) => {
    setSubmissions((prev) => {
      const updated = [newSub, ...prev.filter((s) => s.id !== newSub.id)];
      if (typeof window !== 'undefined') {
        localStorage.setItem('assessment-submissions', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const updateSubmissionRubric = (
    id: string,
    scores: AssessmentSubmission['rubricScores'],
    notes?: string
  ) => {
    setSubmissions((prev) => {
      const updated = prev.map((sub) => {
        if (sub.id === id) {
          return {
            ...sub,
            rubricScores: scores,
            notes: notes !== undefined ? notes : sub.notes,
          };
        }
        return sub;
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('assessment-submissions', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const currentQuestion = questions[currentQuestionIndex] || null;

  return (
    <AssessmentContext.Provider
      value={{
        studentInfo,
        questions,
        currentQuestionIndex,
        currentQuestion,
        testState,
        recordedBlob,
        recordedBlobUrl,
        showKoreanSubtitles,
        isCenteredConfirmed,
        timerSecondsPerQuestion,
        liveTranscript,
        submissions,
        registerStudent,
        setTestState,
        advanceToNextQuestion,
        setRecordedBlob: handleSetRecordedBlob,
        resetSession,
        toggleKoreanSubtitles,
        setCenteredConfirmed,
        setTimerSecondsPerQuestion,
        setLiveTranscript,
        saveSubmission,
        updateSubmissionRubric,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = (): AssessmentContextType => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
