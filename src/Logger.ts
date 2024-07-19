import pino from "pino";

export class Pino {
	private readonly logger = pino({
		level: "debug",
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
			},
		},
	});

	private readonly fileLogger = pino({
		level: "debug",
		transport: {
			target: "pino/file",
			options: { destination: "app.log" },
		},
	});

	debug(message: unknown): void {
		this.logger.debug(message);
	}

	error(error: string | Error): void {
		this.logger.error(error);
	}

	info(message: unknown): void {
		this.logger.info(message);
	}
}
