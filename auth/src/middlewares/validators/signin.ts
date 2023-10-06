import { body } from 'express-validator';

export const signInValidator = [
	body('email').isEmail().withMessage('You must provide a valid email'),
	body('password').trim().notEmpty().withMessage('You must supply a password'),
];
