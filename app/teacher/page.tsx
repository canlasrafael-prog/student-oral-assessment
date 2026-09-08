import TeacherClient from './TeacherClient';

export const metadata = {
  title: 'Teacher Review Dashboard | Student Oral Assessment App',
  description: 'Proctor and teacher dashboard for reviewing student oral assessment recordings, live transcripts, and grading oral rubrics.',
};

export default function TeacherPage() {
  return <TeacherClient />;
}
