import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/v1/vocabulary/review
 * Get words due for review (spaced repetition)
 */
router.get('/review', async (req: Request, res: Response) => {
  // TODO: Fetch words where next_review <= NOW()
  res.json({
    success: true,
    data: {
      words: [
        {
          id: 'word-1',
          polishWord: 'dzień dobry',
          translation: { en: 'good morning', ru: 'добрый день' },
          audioUrl: '/audio/vocab/word_001.mp3',
          imageUrl: '/images/vocab/word_001.jpg',
          level: 'A1',
        },
      ],
      totalDue: 18,
    },
  });
});

/**
 * POST /api/v1/vocabulary/:id/review
 * Submit vocabulary review result
 */
router.post('/:id/review', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quality } = req.body; // 0-5 scale (Anki-style)

  // TODO: Update spaced repetition data
  // Calculate next review date using SM-2 algorithm
  res.json({
    success: true,
    data: {
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      interval: 1, // days
    },
  });
});

/**
 * GET /api/v1/vocabulary/:id
 * Get word details
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // TODO: Fetch from database
  res.json({
    success: true,
    data: {
      word: {
        id,
        polishWord: 'dziękuję',
        partOfSpeech: 'interjection',
        level: 'A1',
        translations: {
          en: 'thank you',
          ru: 'спасибо',
        },
        examples: [
          {
            polish: 'Dziękuję bardzo!',
            english: 'Thank you very much!',
            russian: 'Спасибо большое!',
          },
        ],
        audioUrl: '/audio/vocab/word_002.mp3',
        imageUrl: '/images/vocab/word_002.jpg',
      },
    },
  });
});

export default router;
