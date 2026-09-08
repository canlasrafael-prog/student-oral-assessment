import questionsData from '@/data/questions.json';

export type QuestionCategory = 'narrative' | 'descriptive' | 'expository' | 'argumentative' | 'persuasive';

export interface SelectedQuestion {
  id: string;
  category: QuestionCategory;
  categoryLabel: string;
  text: string;
  grade: string;
}

export const CATEGORY_ORDER: QuestionCategory[] = [
  'narrative',
  'descriptive',
  'expository',
  'argumentative',
  'persuasive',
];

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  narrative: 'Narrative Prompt',
  descriptive: 'Descriptive Prompt',
  expository: 'Expository Prompt',
  argumentative: 'Argumentative Prompt',
  persuasive: 'Persuasive Prompt',
};

type QuestionsJsonType = Record<
  string,
  Record<QuestionCategory, string[]>
>;

/**
 * Selects 1 random question from each of the 5 categories for the specified grade level.
 * Order is fixed: Narrative -> Descriptive -> Expository -> Argumentative -> Persuasive.
 */
export function getQuestionsForGrade(gradeKey: string): SelectedQuestion[] {
  const data = questionsData as QuestionsJsonType;
  
  // Normalize key e.g., "1" or "grade1" -> "grade1"
  const normalizedKey = gradeKey.toLowerCase().startsWith('grade')
    ? gradeKey.toLowerCase()
    : `grade${gradeKey}`;

  const gradeQuestions = data[normalizedKey] || data['grade1'];

  return CATEGORY_ORDER.map((category) => {
    const list = gradeQuestions[category] || [];
    const randomIndex = list.length > 0 ? Math.floor(Math.random() * list.length) : 0;
    const text = list[randomIndex] || `${category.toUpperCase()} question placeholder for ${normalizedKey}`;

    return {
      id: `${normalizedKey}-${category}-${randomIndex}`,
      category,
      categoryLabel: CATEGORY_LABELS[category],
      text,
      grade: normalizedKey,
    };
  });
}
