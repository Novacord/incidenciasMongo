import rateLimit from 'express-rate-limit';

export default rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 200,
	standardHeaders: true,
	legacyHeaders: false,
})