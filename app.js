import express from 'express';
const app = express();
app.use(express.static('/public'));
app.use(express.json());

import session from 'express-session'
app.use(session({
    secret: 'keyboard cat', // Secret should be path variable
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import { rateLimit } from 'express-rate-limit'
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutter
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});
app.use('/auth', authLimiter)

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});

app.use(generalLimiter)

import helmet from 'helmet'
app.use(helmet())

const PORT = process.env.PORT ?? 8080;

const server = app.listen(PORT, () => {
    console.log('Server is runnning on port ' + server.address().port);
});