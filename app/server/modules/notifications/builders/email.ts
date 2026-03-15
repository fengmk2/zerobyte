import type { NotificationConfig } from "~/schemas/notifications";

export const buildEmailShoutrrrUrl = (config: Extract<NotificationConfig, { type: "email" }>) => {
	const shoutrrrUrl = new URL("smtp://placeholder");

	shoutrrrUrl.hostname = config.smtpHost;
	shoutrrrUrl.port = String(config.smtpPort);
	shoutrrrUrl.pathname = "/";

	if (config.username && config.password) {
		shoutrrrUrl.username = config.username;
		shoutrrrUrl.password = config.password;
	}

	shoutrrrUrl.searchParams.set("from", config.from);
	if (config.fromName) {
		shoutrrrUrl.searchParams.set("fromname", config.fromName);
	}
	shoutrrrUrl.searchParams.set("to", config.to.join(","));
	shoutrrrUrl.searchParams.set("starttls", config.useTLS ? "yes" : "no");

	return shoutrrrUrl.toString();
};
