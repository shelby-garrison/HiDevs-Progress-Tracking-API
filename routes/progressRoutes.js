const express = require('express');
const { body } = require('express-validator');
const { updateProgress } = require('../controllers/progressController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

/**
 * @swagger
 * /api/progress/update:
 *   post:
 *     summary: Update user progress
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               levelId:
 *                 type: integer
 *               moduleIndex:
 *                 type: integer
 *               completionStatus:
 *                 type: boolean
 *               timeSpent:
 *                 type: integer
 *               userNotes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Progress updated
 *       401:
 *         description: Unauthorized
 */
router.post('/update', auth, 
    [
        body('levelId').isInt({ min: 1, max: 5 }),
        body('moduleIndex').isInt({ min: 1 }),
        body('completionStatus').isBoolean(),
        body('timeSpent').isNumeric(),
        body('userNotes').optional().isString()
    ],
    validate, updateProgress
);

module.exports = router;
