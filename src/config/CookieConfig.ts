import { CookieOptions } from 'express';

export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    path: '/',
};