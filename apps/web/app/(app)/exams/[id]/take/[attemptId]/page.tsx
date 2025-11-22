'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  submitSectionAnswers,
  completeExamAttempt,
  ExamAnswer,
  ExamSection,
  ExamQuestion,
} from '@/services/exam.service';
import { useToast } from '@/components/ui/ToastContainer';

// Question Components
function MultipleChoiceQuestion({
  question,
  answer,
  onChange,
}: {
  question: ExamQuestion;
  answer: any;
  onChange: (data: any) => void;
}) {
  const options = question.question_data?.options || [];

  return (
    <div className="space-y-3">
      <p className="text-lg text-gray-900 dark:text-white font-medium mb-4">
        {question.question_data?.question_text}
      </p>
      {question.question_data?.context && (
        <p className="text-gray-600 dark:text-gray-400 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {question.question_data.context}
        </p>
      )}
      <div className="space-y-2">
        {options.map((option: any, index: number) => (
          <label
            key={option.id || index}
            className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors
              ${
                answer?.selectedOptionId === option.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={answer?.selectedOptionId === option.id}
              onChange={() => onChange({ selectedOptionId: option.id })}
              className="mt-1 mr-3 text-blue-600"
            />
            <span className="text-gray-900 dark:text-white">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function FillBlankQuestion({
  question,
  answer,
  onChange,
}: {
  question: ExamQuestion;
  answer: any;
  onChange: (data: any) => void;
}) {
  const blanks = question.question_data?.blanks || 1;

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-900 dark:text-white font-medium">
        {question.question_data?.question_text}
      </p>
      {question.question_data?.context && (
        <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {question.question_data.context}
        </p>
      )}
      <div className="space-y-3">
        {Array.from({ length: blanks }).map((_, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blank {index + 1}
            </label>
            <input
              type="text"
              value={answer?.answers?.[index] || ''}
              onChange={(e) => {
                const newAnswers = [...(answer?.answers || Array(blanks).fill(''))];
                newAnswers[index] = e.target.value;
                onChange({ answers: newAnswers });
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your answer..."
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function EssayQuestion({
  question,
  answer,
  onChange,
}: {
  question: ExamQuestion;
  answer: any;
  onChange: (data: any) => void;
}) {
  const wordLimit = question.question_data?.word_limit || 200;
  const wordCount = (answer?.text || '').split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-900 dark:text-white font-medium">
        {question.question_data?.question_text}
      </p>
      {question.question_data?.prompt && (
        <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {question.question_data.prompt}
        </p>
      )}
      <div>
        <textarea
          value={answer?.text || ''}
          onChange={(e) => onChange({ text: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   min-h-[200px]"
          placeholder="Write your answer here..."
        />
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Word limit: {wordLimit} words
          </span>
          <span
            className={`font-medium ${
              wordCount > wordLimit
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {wordCount} / {wordLimit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TakeExamPage() {
  const router = useRouter();
  const params = useParams();
  const showToast = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState<ExamSection | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [attemptId, setAttemptId] = useState<number>(0);

  const examId = params.id as string;
  const attemptIdParam = params.attemptId as string;

  useEffect(() => {
    if (attemptIdParam) {
      // In a real implementation, we'd fetch the current exam state
      // For now, using mock data from the start
      setAttemptId(parseInt(attemptIdParam));
      loadMockExamSection();
    }
  }, [attemptIdParam]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const loadMockExamSection = () => {
    // Mock section data
    const mockSection: ExamSection = {
      id: 1,
      section_type: 'reading',
      title_en: 'Reading Comprehension',
      time_limit_minutes: 60,
      max_points: 30,
      questions: [
        {
          id: 1,
          question_number: 1,
          question_type: 'multiple_choice',
          points: 2,
          difficulty: 'medium',
          question_data: {
            question_text: 'What is the main idea of the passage?',
            context:
              'Polish is a West Slavic language spoken primarily in Poland. It is the official language of Poland and one of the 24 official languages of the European Union.',
            options: [
              { id: 'a', text: 'Polish is difficult to learn' },
              { id: 'b', text: 'Polish is a West Slavic language' },
              { id: 'c', text: 'Poland is in Europe' },
              { id: 'd', text: 'Polish has many speakers' },
            ],
          },
        },
        {
          id: 2,
          question_number: 2,
          question_type: 'fill_blank',
          points: 2,
          difficulty: 'easy',
          question_data: {
            question_text: 'Complete the sentence with the correct word.',
            context: 'Warszawa jest _____ Polski.',
            blanks: 1,
          },
        },
        {
          id: 3,
          question_number: 3,
          question_type: 'essay',
          points: 10,
          difficulty: 'hard',
          question_data: {
            question_text: 'Describe your experience learning Polish.',
            prompt:
              'Write a short essay (150-200 words) about your motivation for learning Polish and what challenges you have faced.',
            word_limit: 200,
          },
        },
      ],
    };

    setCurrentSection(mockSection);
    setTimeRemaining(mockSection.time_limit_minutes * 60);
    setLoading(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answerData: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerData,
    }));
  };

  const handleSubmitSection = async () => {
    if (!currentSection) return;

    try {
      setSubmitting(true);

      // Convert answers to API format
      const examAnswers: ExamAnswer[] = (currentSection.questions || []).map((q) => ({
        question_id: q.id,
        answer_data: answers[q.id] || {},
        time_spent_seconds: 0,
      }));

      const response = await submitSectionAnswers(attemptId, currentSection.id!, examAnswers);

      if (response.success && response.data) {
        showToast('Section submitted successfully!', 'success');

        // Check if there's a next section
        if (response.data.next_section) {
          setCurrentSection(response.data.next_section);
          setCurrentQuestionIndex(0);
          setAnswers({});
          setTimeRemaining(response.data.next_section.time_limit_minutes * 60);
        } else {
          // Complete the exam
          const completeResponse = await completeExamAttempt(attemptId);
          if (completeResponse.success) {
            showToast('Exam completed!', 'success');
            router.push(`/exams/${examId}/results/${attemptId}`);
          }
        }
      } else {
        throw new Error(response.error?.message || 'Failed to submit section');
      }
    } catch (error: any) {
      console.error('Failed to submit section:', error);
      showToast(error.message || 'Failed to submit section', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!currentSection) {
    return null;
  }

  const currentQuestion = currentSection.questions?.[currentQuestionIndex];
  const totalQuestions = currentSection.questions?.length || 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Timer */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentSection.title_en}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {answeredCount} / {totalQuestions}
                </p>
              </div>
              <div
                className={`text-right px-4 py-2 rounded-lg ${
                  timeRemaining < 300
                    ? 'bg-red-100 dark:bg-red-900/20'
                    : 'bg-blue-100 dark:bg-blue-900/20'
                }`}
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Remaining</p>
                <p
                  className={`text-xl font-bold ${
                    timeRemaining < 300
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {currentQuestion && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
            {/* Question Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Question {currentQuestion.question_number}
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {currentQuestion.question_type.replace('_', ' ')}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {currentQuestion.points} points
                  </span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="mb-8">
              {currentQuestion.question_type === 'multiple_choice' && (
                <MultipleChoiceQuestion
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onChange={(data) => handleAnswerChange(currentQuestion.id, data)}
                />
              )}
              {currentQuestion.question_type === 'fill_blank' && (
                <FillBlankQuestion
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onChange={(data) => handleAnswerChange(currentQuestion.id, data)}
                />
              )}
              {currentQuestion.question_type === 'essay' && (
                <EssayQuestion
                  question={currentQuestion}
                  answer={answers[currentQuestion.id]}
                  onChange={(data) => handleAnswerChange(currentQuestion.id, data)}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                         rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
              >
                ← Previous
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmitSection}
                  disabled={submitting}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400
                           text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Section'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Question Navigator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Question Navigator
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {(currentSection.questions || []).map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`aspect-square rounded-lg font-semibold text-sm transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[q.id]
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-700"></div>
              <span>Not answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-600"></div>
              <span>Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
