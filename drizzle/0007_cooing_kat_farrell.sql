PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_message_blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`type` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text,
	`status` text NOT NULL,
	`model` text,
	`metadata` text,
	`error` text,
	`content` text,
	`language` text,
	`url` text,
	`file` text,
	`tool_id` text,
	`tool_name` text,
	`arguments` text,
	`source_block_id` text,
	`source_language` text,
	`target_language` text,
	`response` text,
	`knowledge` text,
	`thinking_millsec` integer,
	`knowledge_base_ids` text,
	`citation_references` text
);
--> statement-breakpoint
INSERT INTO `__new_message_blocks`("id", "message_id", "type", "created_at", "updated_at", "status", "model", "metadata", "error", "content", "language", "url", "file", "tool_id", "tool_name", "arguments", "source_block_id", "source_language", "target_language", "response", "knowledge", "thinking_millsec", "knowledge_base_ids", "citation_references") SELECT "id", "message_id", "type", "created_at", "updated_at", "status", "model", "metadata", "error", "content", "language", "url", "file", "tool_id", "tool_name", "arguments", "source_block_id", "source_language", "target_language", "response", "knowledge", "thinking_millsec", "knowledge_base_ids", "citation_references" FROM `message_blocks`;--> statement-breakpoint
DROP TABLE `message_blocks`;--> statement-breakpoint
ALTER TABLE `__new_message_blocks` RENAME TO `message_blocks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `message_blocks_id_unique` ON `message_blocks` (`id`);--> statement-breakpoint
CREATE INDEX `idx_message_blocks_message_id` ON `message_blocks` (`message_id`);--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`assistant_id` text NOT NULL,
	`topic_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text,
	`status` text NOT NULL,
	`model_id` text,
	`model` text,
	`type` text,
	`useful` integer,
	`ask_id` text,
	`mentions` text,
	`usage` text,
	`metrics` text,
	`multi_model_message_style` text,
	`fold_selected` integer,
	FOREIGN KEY (`assistant_id`) REFERENCES `assistants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "role", "assistant_id", "topic_id", "created_at", "updated_at", "status", "model_id", "model", "type", "useful", "ask_id", "mentions", "usage", "metrics", "multi_model_message_style", "fold_selected") SELECT "id", "role", "assistant_id", "topic_id", "created_at", "updated_at", "status", "model_id", "model", "type", "useful", "ask_id", "mentions", "usage", "metrics", "multi_model_message_style", "fold_selected" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;--> statement-breakpoint
CREATE UNIQUE INDEX `messages_id_unique` ON `messages` (`id`);--> statement-breakpoint
CREATE INDEX `idx_messages_topic_id` ON `messages` (`topic_id`);--> statement-breakpoint
CREATE INDEX `idx_messages_assistant_id` ON `messages` (`assistant_id`);--> statement-breakpoint
CREATE TABLE `__new_topics` (
	`id` text PRIMARY KEY NOT NULL,
	`assistant_id` text NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`messages` text DEFAULT '[]' NOT NULL,
	`pinned` integer,
	`prompt` text,
	`isNameManuallyEdited` integer,
	FOREIGN KEY (`assistant_id`) REFERENCES `assistants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_topics`("id", "assistant_id", "name", "created_at", "updated_at", "messages", "pinned", "prompt", "isNameManuallyEdited") SELECT "id", "assistant_id", "name", "created_at", "updated_at", "messages", "pinned", "prompt", "isNameManuallyEdited" FROM `topics`;--> statement-breakpoint
DROP TABLE `topics`;--> statement-breakpoint
ALTER TABLE `__new_topics` RENAME TO `topics`;--> statement-breakpoint
CREATE UNIQUE INDEX `topics_id_unique` ON `topics` (`id`);--> statement-breakpoint
CREATE INDEX `idx_topics_assistant_id` ON `topics` (`assistant_id`);