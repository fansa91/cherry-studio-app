PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_providers` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`api_key` text,
	`api_host` text,
	`api_version` text,
	`models` text,
	`enabled` integer,
	`is_system` integer,
	`is_authed` integer,
	`rate_limit` integer,
	`is_not_support_array_content` integer,
	`notes` text
);
--> statement-breakpoint
INSERT INTO `__new_providers`("id", "type", "name", "api_key", "api_host", "api_version", "models", "enabled", "is_system", "is_authed", "rate_limit", "is_not_support_array_content", "notes") SELECT "id", "type", "name", "api_key", "api_host", "api_version", "models", "enabled", "is_system", "is_authed", "rate_limit", "is_not_support_array_content", "notes" FROM `providers`;--> statement-breakpoint
DROP TABLE `providers`;--> statement-breakpoint
ALTER TABLE `__new_providers` RENAME TO `providers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;