//Import env as early as possible
import 'dotenv/config'
//import express
import express from 'express'
// Create instance of express
const app = express();
// Set at public folder
app.use(express.static('/public'));
// Set JSON body parser
app.use(express.json());
// Set up logging to see what users interact with and also see system errors.
import logger from './utils/LoggerUtil.js';
import pinoHttp from 'pino-http';
app.use(pinoHttp({ logger }));
// import CORS to control which origins can communicate with backend
import cors from 'cors'
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// Import express session so we can save user info in sessions.
import session from 'express-session'
app.use(session({
  secret: process.env.SESSION_SECRET, // Secret should be path variable
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// a specific limiter first for all auth endpoints
import { rateLimit } from 'express-rate-limit'
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutter
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56
});
/* app.use('/auth', authLimiter); */
// A general more foregiving rate limit on all other endpoints
const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
});
app.use(generalLimiter);
// Express middleware to help set som standard headers.
import helmet from 'helmet'
app.use(helmet())
// Import and use our custom authrouter
import authRouter from './routers/authRouter.js'
app.use('/auth', authRouter)

app.get('/{*splat}', (req, res) => {
    res.send('<div><h1>404</h1><h3>page' + req.path + 'doesnt exist</h3> </div>');
})

app.all('/{*splat}', (req, res) => {
    res.send({ errorMessage: "the route does not exist for method" + req.method })
});

//nullish coealesnce ??
const PORT = process.env.PORT ?? 8080;

const server = app.listen(PORT, () => {
    console.log('Server is runnning on port ' + server.address().port);
});