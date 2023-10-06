export const env = {
	JWT_KEY: '',
};

export function loadEnvVariables() {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY env variable must be defined');
	}

	env.JWT_KEY = process.env.JWT_KEY;
}
