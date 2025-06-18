import rateLimit from 'express-rate-limit';

 const rateLimiter = rateLimit({
windowMs: 15 * 60 * 1000, 
max: 10, 
message: {
status: 429,
message: 'Too many attempts from this IP, please try again after 15 minutes',
},
standardHeaders: true,
legacyHeaders: false,
});
export default rateLimiter