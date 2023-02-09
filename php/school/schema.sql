CREATE DATABASE IF NOT EXISTS school;

USE school;

CREATE TABLE IF NOT EXISTS `subjects` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, /* use varchar(255) if there need for DEFAULT. */
 `shortname` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci

CREATE TABLE IF NOT EXISTS `courses` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `subject_id ` int(11) NOT NULL
 `name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
 `desc` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci

CREATE TABLE IF NOT EXISTS `students` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `firstname` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `lastname` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE IF NOT EXISTS `teachers` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `firstname` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `lastname` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE IF NOT EXISTS `qualifications` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `teacher_id` int(11) NOT NULL,
    `subject_id` int(11) NOT NULL,
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE IF NOT EXISTS `groups` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL, 
    `course_id` int(11) NOT NULL,
    `max_number` int(11) NOT NULL,
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE IF NOT EXISTS `registrations` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `group_id` int(11) NOT NULL,
    `student_id` int(11) NOT NULL,
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

CREATE TABLE IF NOT EXISTS `attributions` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `group_id` int(11) NOT NULL,
    `teacher_id` int(11) NOT NULL,
    PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci