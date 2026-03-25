-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `reg2024` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`phone` varchar(12) NOT NULL,
	`phone_sec` varchar(12) NOT NULL,
	`address` varchar(1000) NOT NULL,
	`postal` varchar(7) NOT NULL,
	`date` datetime NOT NULL DEFAULT 'current_timestamp()',
	`gender` enum('m','f','o') NOT NULL,
	`ageGroup` enum('j','s','a') NOT NULL,
	`lessons` enum('none','private','public') NOT NULL,
	`season` smallint(4) unsigned NOT NULL,
	`type` enum('family','solo') NOT NULL DEFAULT '''solo''',
	`bType` enum('new','returning') NOT NULL DEFAULT '''new''',
	`numApplicants` tinyint(1) NOT NULL DEFAULT 1,
	`owing` smallint(3) unsigned NOT NULL DEFAULT 0,
	`paid` smallint(3) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `reg2025` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`phone` varchar(12) NOT NULL,
	`phone_sec` varchar(12) NOT NULL,
	`address` varchar(1000) NOT NULL,
	`postal` varchar(7) NOT NULL,
	`date` datetime NOT NULL DEFAULT 'current_timestamp()',
	`gender` enum('m','f','o') NOT NULL,
	`ageGroup` enum('j','s','a') NOT NULL,
	`lessons` enum('none','private','public') NOT NULL,
	`season` smallint(4) unsigned NOT NULL,
	`type` enum('family','solo') NOT NULL DEFAULT '''solo''',
	`bType` enum('new','returning') NOT NULL DEFAULT '''new''',
	`numApplicants` tinyint(1) NOT NULL DEFAULT 1,
	`owing` smallint(3) unsigned NOT NULL DEFAULT 0,
	`paid` smallint(3) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `reg2026` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`phone` varchar(12) NOT NULL,
	`phone_sec` varchar(12) NOT NULL,
	`address` varchar(1000) NOT NULL,
	`postal` varchar(7) NOT NULL,
	`date` datetime NOT NULL DEFAULT 'current_timestamp()',
	`gender` enum('m','f','o') NOT NULL,
	`ageGroup` enum('j','s','a') NOT NULL,
	`lessons` enum('none','private','public') NOT NULL,
	`season` smallint(4) unsigned NOT NULL,
	`type` enum('family','solo') NOT NULL DEFAULT '''solo''',
	`bType` enum('new','returning') NOT NULL DEFAULT '''new''',
	`numApplicants` tinyint(1) NOT NULL DEFAULT 1,
	`owing` smallint(3) unsigned NOT NULL DEFAULT 0,
	`paid` smallint(3) unsigned NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `registration` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`firstName` varchar(50) NOT NULL,
	`lastName` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`phone` varchar(12) NOT NULL,
	`phone_sec` varchar(12) NOT NULL,
	`address` varchar(1000) NOT NULL,
	`date` datetime NOT NULL DEFAULT 'current_timestamp()',
	`gender` enum('m','f','o') NOT NULL,
	`ageGroup` enum('j','s','a') NOT NULL,
	`lessons` enum('none','private','public') NOT NULL,
	`season` smallint(4) unsigned NOT NULL,
	`type` enum('family','solo') NOT NULL DEFAULT '''solo''',
	`bType` enum('new','returning') NOT NULL DEFAULT '''new''',
	`numApplicants` tinyint(1) NOT NULL DEFAULT 1,
	`owing` smallint(3) unsigned NOT NULL DEFAULT 0
);

*/