CREATE TABLE `notes` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `content` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=COMPACT


CREATE TABLE `users` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `username` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `password` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `permission` tinyint(4) NOT NULL DEFAULT 1, 
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `sessions` ( 
    `session_id` char(128) COLLATE utf8mb4_unicode_ci NOT NULL, 
    `atime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `data` text COLLATE utf8mb4_unicode_ci, 
    UNIQUE KEY session_id (`session_id`) 
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci