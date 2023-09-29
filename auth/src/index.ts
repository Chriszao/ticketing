import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { router } from './routes';

const app = express();

app.use(json());

app.use(router);

app.all('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => console.log('🚀 Listening on port 3000!'));
