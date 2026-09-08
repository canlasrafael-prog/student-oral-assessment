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

interface AssessmentContextType {
  studentInfo: StudentInfo | null;
  questions: SelectedQuestion[];
  currentQuestionIndex: number;
  currentQuestion: SelectedQuestion | null;
  testState: TestState;
  recordedBlob: Blob | null;
  recordedBlobUrl: string | null;
  registerStudent: (name: string, grade: string, consentGiven: boolean) => void;
  setTestState: (state: TestState) => void;
  advanceToNextQuestion: () => void;
  setRecordedBlob: (blob: Blob) => void;
  resetSession: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [questions, setQuestions] = useState<SelectedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [testState, setTestState] = useState<TestState>('INITIAL');
  const [recordedBlob, setRecordedBlobState] = useState<Blob | null>(null);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);

  // Clean up Blob URLs when changed or unmounted
  useEffect(() => {
    return () => {
      if (recordedBlobUrl) {
        URL.revokeObjectURL(recordedBlobUrl);
      }
    };
  }, [recordedBlobUrl]);

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
        registerStudent,
        setTestState,
        advanceToNextQuestion,
        setRecordedBlob: handleSetRecordedBlob,
        resetSession,
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
