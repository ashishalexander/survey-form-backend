import { CookieOptions } from 'express';

export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Use 'none' for cross-site in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};