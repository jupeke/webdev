CREATE TABLE `comments` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `comment` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci ROW_FORMAT=COMPACT

CREATE TABLE `images` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `id_comment` int(11) NOT NULL, 
    `filename` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `filetype` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    'image' text COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
