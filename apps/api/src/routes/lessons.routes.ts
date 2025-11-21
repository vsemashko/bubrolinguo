import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/v1/lessons
 * Get all lessons (filtered by level)
 */
router.get('/', async (req: Request, res: Response) => {
  const { level } = req.query;

  // TODO: Fetch from database
  res.json({
    success: true,
    data: {
      lessons: [
        {
          id: 'lesson-1',
          level: 'A1',
          order: 1,
          title: { en: 'Hello & Goodbye', ru: 'Привет и прощание' },
          description: { en: 'Learn basic greetings', ru: 'Выучите базовые приветствия' },
          estimatedTime: 10,
          isLocked: false,
        },
      ],
    },
  });
});

/**
 * GET /api/v1/lessons/:id
 * Get lesson details with exercises
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Fetch from database
  res.json({
    success: true,
    data: {
      lesson: {
        id,
        level: 'A1',
        title: { en: 'Hello & Goodbye', ru: 'Привет и прощание' },
        exercises: [
          {
            id: 'ex-1',
            type: 'translation',
            question: 'Translate: Hello',
            correctAnswer: 'Cześć',
          },
        ],
      },
    },
  });
});

/**
 * POST /api/v1/lessons/:id/submit
 * Submit lesson results
 */
router.post('/:id/submit', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { answers, timeSpent } = req.body;

  // TODO: Calculate score, update progress, award XP
  res.json({
    success: true,
    data: {
      score: 85,
      xpEarned: 15,
      achievementsUnlocked: [],
    },
  });
});

export default router;
