import { get, post, useMockData, mockDelay, mockApiResponse } from '@/lib/api';

// Types
export interface MockExam {
  id: number;
  title_en: string;
  title_ru: string;
  description_en: string;
  description_ru: string;
  level: string;
  exam_type: 'full' | 'practice';
  total_time_minutes: number;
  passing_score_percentage: number;
  sections: ExamSection[];
  user_attempts?: ExamAttempt[];
}

export interface ExamSection {
  id?: number;
  section_type: string;
  section_number?: number;
  title_en: string;
  title_ru?: string;
  instructions_en?: string;
  instructions_ru?: string;
  time_limit_minutes: number;
  max_points: number;
  question_count?: number;
  questions?: ExamQuestion[];
}

export interface ExamQuestion {
  id: number;
  question_number: number;
  question_type: 'multiple_choice' | 'fill_blank' | 'essay' | 'short_answer' | 'speaking_prompt';
  question_data: any;
  points: number;
  difficulty: string;
}

export interface ExamAttempt {
  attempt_id?: number;
  id?: number;
  exam_id?: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  started_at?: string;
  completed_at?: string;
  expires_at?: string;
  percentage_score?: number;
  passed?: boolean;
  current_section?: ExamSection;
}

export interface ExamAnswer {
  question_id: number;
  answer_data: any;
  time_spent_seconds?: number;
}

export interface ExamResults {
  attempt_id: number;
  status: string;
  completed_at: string;
  total_points_earned: number;
  total_points_possible: number;
  percentage_score: number;
  passed: boolean;
  section_scores: {
    [sectionType: string]: {
      earned: number;
      possible: number;
      percentage: number;
    };
  };
  detailed_results?: any[];
}

// Mock data
const mockExams: MockExam[] = [
  {
    id: 1,
    title_en: 'B1 Polish Language Exam - Full Practice',
    title_ru: 'Экзамен по польскому языку B1 - Полная практика',
    description_en: 'Complete B1 level exam covering reading, writing, listening, and speaking',
    description_ru: 'Полный экзамен уровня B1, включающий чтение, письмо, аудирование и говорение',
    level: 'B1',
    exam_type: 'full',
    total_time_minutes: 180,
    passing_score_percentage: 60,
    sections: [
      {
        section_type: 'reading',
        title_en: 'Reading Comprehension',
        time_limit_minutes: 60,
        max_points: 30,
        question_count: 20,
      },
      {
        section_type: 'writing',
        title_en: 'Writing',
        time_limit_minutes: 45,
        max_points: 25,
        question_count: 2,
      },
      {
        section_type: 'listening',
        title_en: 'Listening Comprehension',
        time_limit_minutes: 30,
        max_points: 25,
        question_count: 15,
      },
      {
        section_type: 'speaking',
        title_en: 'Speaking',
        time_limit_minutes: 45,
        max_points: 20,
        question_count: 3,
      },
    ],
    user_attempts: [],
  },
  {
    id: 2,
    title_en: 'B2 Polish Language Exam - Reading & Listening',
    title_ru: 'Экзамен по польскому языку B2 - Чтение и аудирование',
    description_en: 'Focused practice on reading and listening comprehension',
    description_ru: 'Целенаправленная практика чтения и аудирования',
    level: 'B2',
    exam_type: 'practice',
    total_time_minutes: 90,
    passing_score_percentage: 65,
    sections: [
      {
        section_type: 'reading',
        title_en: 'Reading Comprehension',
        time_limit_minutes: 50,
        max_points: 40,
        question_count: 25,
      },
      {
        section_type: 'listening',
        title_en: 'Listening Comprehension',
        time_limit_minutes: 40,
        max_points: 35,
        question_count: 20,
      },
    ],
    user_attempts: [],
  },
];

/**
 * Get all available mock exams
 */
export async function getMockExams(filters?: {
  level?: string;
  exam_type?: string;
}) {
  if (useMockData()) {
    await mockDelay(300);
    let filteredExams = [...mockExams];

    if (filters?.level && filters.level !== 'all') {
      filteredExams = filteredExams.filter((e) => e.level === filters.level);
    }

    if (filters?.exam_type && filters.exam_type !== 'all') {
      filteredExams = filteredExams.filter((e) => e.exam_type === filters.exam_type);
    }

    return mockApiResponse({ exams: filteredExams, total: filteredExams.length });
  }

  const params = new URLSearchParams();
  if (filters?.level) params.append('level', filters.level);
  if (filters?.exam_type) params.append('exam_type', filters.exam_type);

  return get(`/exams?${params.toString()}`);
}

/**
 * Get exam by ID with full details
 */
export async function getExamById(examId: number) {
  if (useMockData()) {
    await mockDelay(300);
    const exam = mockExams.find((e) => e.id === examId);
    if (!exam) {
      return mockApiResponse(null, { message: 'Exam not found', code: 'EXAM_NOT_FOUND' }, false);
    }
    return mockApiResponse({ exam });
  }

  return get(`/exams/${examId}`);
}

/**
 * Start a new exam attempt
 */
export async function startExamAttempt(examId: number) {
  if (useMockData()) {
    await mockDelay(500);
    const exam = mockExams.find((e) => e.id === examId);
    if (!exam) {
      return mockApiResponse(null, { message: 'Exam not found', code: 'EXAM_NOT_FOUND' }, false);
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + exam.total_time_minutes * 60000);

    const attempt: ExamAttempt = {
      attempt_id: Date.now(),
      exam_id: examId,
      status: 'in_progress',
      started_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      current_section: exam.sections[0],
    };

    return mockApiResponse(attempt);
  }

  return post(`/exams/${examId}/start`, {});
}

/**
 * Submit section answers
 */
export async function submitSectionAnswers(
  attemptId: number,
  sectionId: number,
  answers: ExamAnswer[]
) {
  if (useMockData()) {
    await mockDelay(700);

    // Mock auto-grading for multiple choice
    const correctCount = answers.filter(() => Math.random() > 0.3).length;
    const incorrectCount = answers.length - correctCount;

    return mockApiResponse({
      section_completed: true,
      auto_graded_results: {
        correct_count: correctCount,
        incorrect_count: incorrectCount,
        points_earned: correctCount * 2,
        points_possible: answers.length * 2,
      },
      manual_grading_required: false,
      next_section: null, // Last section
    });
  }

  return post(`/exams/attempts/${attemptId}/sections/${sectionId}/submit`, { answers });
}

/**
 * Complete exam attempt
 */
export async function completeExamAttempt(attemptId: number) {
  if (useMockData()) {
    await mockDelay(800);

    const results: ExamResults = {
      attempt_id: attemptId,
      status: 'completed',
      completed_at: new Date().toISOString(),
      total_points_earned: 72,
      total_points_possible: 100,
      percentage_score: 72,
      passed: true,
      section_scores: {
        reading: { earned: 24, possible: 30, percentage: 80 },
        writing: { earned: 18, possible: 25, percentage: 72 },
        listening: { earned: 18, possible: 25, percentage: 72 },
        speaking: { earned: 12, possible: 20, percentage: 60 },
      },
    };

    return mockApiResponse(results);
  }

  return post(`/exams/attempts/${attemptId}/complete`, {});
}

/**
 * Get exam attempt results
 */
export async function getExamResults(attemptId: number) {
  if (useMockData()) {
    await mockDelay(400);

    const results = {
      attempt_id: attemptId,
      status: 'completed',
      mock_exam_id: 1,
      title_en: 'B1 Polish Language Exam - Full Practice',
      level: 'B1',
      started_at: new Date(Date.now() - 3 * 3600000).toISOString(),
      completed_at: new Date().toISOString(),
      time_spent_minutes: 165,
      total_points_earned: 72,
      total_points_possible: 100,
      percentage_score: 72,
      passed: true,
      detailed_results: [],
    };

    return mockApiResponse({ results });
  }

  return get(`/exams/attempts/${attemptId}/results`);
}

/**
 * Get study resources
 */
export async function getStudyResources(filters?: {
  level?: string;
  section_type?: string;
  resource_type?: string;
}) {
  if (useMockData()) {
    await mockDelay(300);
    return mockApiResponse({ resources: [], total: 0 });
  }

  const params = new URLSearchParams();
  if (filters?.level) params.append('level', filters.level);
  if (filters?.section_type) params.append('section_type', filters.section_type);
  if (filters?.resource_type) params.append('resource_type', filters.resource_type);

  return get(`/exams/study-resources?${params.toString()}`);
}
