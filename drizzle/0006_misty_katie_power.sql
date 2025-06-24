PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_assistants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`prompt` text NOT NULL,
	`type` text DEFAULT 'assistant' NOT NULL,
	`emoji` text,
	`description` text,
	`model` text,
	`default_model` text,
	`settings` text,
	`enable_web_search` integer,
	`enable_generate_image` integer,
	`knowledge_recognition` text,
	`tags` text,
	`group` text
);
--> statement-breakpoint
INSERT INTO `__new_assistants`("id", "name", "prompt", "type", "emoji", "description", "model", "default_model", "settings", "enable_web_search", "enable_generate_image", "knowledge_recognition", "tags", "group") SELECT "id", "name", "prompt", "type", "emoji", "description", "model", "default_model", "settings", "enable_web_search", "enable_generate_image", "knowledge_recognition", "tags", "group" FROM `assistants`;--> statement-breakpoint
DROP TABLE `assistants`;--> statement-breakpoint
ALTER TABLE `__new_assistants` RENAME TO `assistants`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `assistants_id_unique` ON `assistants` (`id`);