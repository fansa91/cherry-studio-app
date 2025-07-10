PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_websearch_providers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`api_key` text,
	`api_host` text,
	`engines` text,
	`url` text,
	`basic_auth_username` text,
	`basic_auth_password` text,
	`content_limit` integer,
	`using_browser` integer
);
--> statement-breakpoint
INSERT INTO `__new_websearch_providers`("id", "name", "api_key", "api_host", "engines", "url", "basic_auth_username", "basic_auth_password", "content_limit", "using_browser") SELECT "id", "name", "api_key", "api_host", "engines", "url", "basic_auth_username", "basic_auth_password", "content_limit", "using_browser" FROM `websearch_providers`;--> statement-breakpoint
DROP TABLE `websearch_providers`;--> statement-breakpoint
ALTER TABLE `__new_websearch_providers` RENAME TO `websearch_providers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;