import type { NotificationConfig } from "~/schemas/notifications";

export const buildTelegramShoutrrrUrl = (config: Extract<NotificationConfig, { type: "telegram" }>) => {
	const shoutrrrUrl = new URL("telegram://telegram");
	shoutrrrUrl.username = config.botToken;
	shoutrrrUrl.searchParams.set("channels", `${config.chatId}${config.threadId ? `:${config.threadId}` : ""}`);
	return shoutrrrUrl.toString().replace("/?", "?");
};
