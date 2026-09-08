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

export function formatGradeDisplayLabel(gradeKey: string): string {
  const key = gradeKey.toLowerCase();
  if (key === 'kinder') return 'Kindergarten';
  if (key === 'adult') return 'Adult Level';
  if (key.startsWith('grade')) {
    const num = key.replace('grade', '');
    return `Grade ${num}`;
  }
  return gradeKey.toUpperCase();
}

/**
 * Grade Tiers for range pooling when candidate questions are limited.
 */
const GRADE_TIERS: Record<string, string[]> = {
  kinder: ['kinder'],
  grade1: ['grade1', 'grade2'],
  grade2: ['grade1', 'grade2', 'grade3'],
  grade3: ['grade2', 'grade3', 'grade4'],
  grade4: ['grade3', 'grade4', 'grade5'],
  grade5: ['grade4', 'grade5', 'grade6'],
  grade6: ['grade5', 'grade6', 'grade7'],
  grade7: ['grade7', 'grade8', 'grade9'],
  grade8: ['grade7', 'grade8', 'grade9'],
  grade9: ['grade9', 'grade10', 'grade11'],
  grade10: ['grade9', 'grade10', 'grade11', 'grade12'],
  grade11: ['grade10', 'grade11', 'grade12'],
  grade12: ['grade10', 'grade11', 'grade12'],
  adult: ['adult'],
};

/**
 * Selects 1 random question from each of the 5 categories for the specified grade level.
 * Employs tier-range pooling if candidate lists are small so different students receive unique questions.
 */
export function getQuestionsForGrade(gradeKey: string): SelectedQuestion[] {
  const data = questionsData as QuestionsJsonType;
  
  const rawKey = gradeKey.toLowerCase();
  let normalizedKey = rawKey;

  if (rawKey !== 'kinder' && rawKey !== 'adult' && !rawKey.startsWith('grade')) {
    normalizedKey = `grade${rawKey}`;
  }

  const primaryQuestions = data[normalizedKey] || data['grade1'];
  const tierKeys = GRADE_TIERS[normalizedKey] || [normalizedKey];

  return CATEGORY_ORDER.map((category) => {
    let list = primaryQuestions[category] || [];

    // If candidate list for this specific grade is small (< 5), pool questions from adjacent grades in the tier
    if (list.length < 5) {
      const pooledSet = new Set<string>(list);
      for (const tKey of tierKeys) {
        if (data[tKey] && data[tKey][category]) {
          data[tKey][category].forEach((q) => pooledSet.add(q));
        }
      }
      list = Array.from(pooledSet);
    }

    const randomIndex = list.length > 0 ? Math.floor(Math.random() * list.length) : 0;
    const text = list[randomIndex] || `${category.toUpperCase()} prompt for ${formatGradeDisplayLabel(normalizedKey)}`;

    return {
      id: `${normalizedKey}-${category}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      category,
      categoryLabel: CATEGORY_LABELS[category],
      text,
      grade: normalizedKey,
    };
  });
}
