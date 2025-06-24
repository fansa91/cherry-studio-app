CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`origin_name` text NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`size` integer NOT NULL,
	`ext` text NOT NULL,
	`count` integer NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `files_id_unique` ON `files` (`id`);--> statement-breakpoint
CREATE TABLE `knowledges` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`model` text NOT NULL,
	`dimensions` integer NOT NULL,
	`description` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`version` text NOT NULL,
	`document_count` integer,
	`chunk_size` integer,
	`chunk_overlap` integer,
	`threshold` integer,
	`rerank_model` text,
	`items` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `knowledges_id_unique` ON `knowledges` (`id`);--> statement-breakpoint
CREATE TABLE `providers` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`api_key` text NOT NULL,
	`api_host` text NOT NULL,
	`api_version` text,
	`models` text NOT NULL,
	`enabled` integer,
	`is_system` integer,
	`is_authed` integer,
	`rate_limit` integer,
	`is_not_support_array_content` integer,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `websearch_providers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`api_key` text NOT NULL,
	`api_host` text NOT NULL,
	`engines` text,
	`url` text,
	`basic_auth_username` text,
	`basic_auth_password` text,
	`content_limit` integer,
	`using_browser` integer
);
