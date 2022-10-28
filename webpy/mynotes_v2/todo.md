# To do (students): 
1. **Pull** this repository (or the latest changes) to your computer. 
2. Add a new table **users** to the db *db_mynotes* in *EasyPHP -> PhpMyAdmin* (use the SQL below):

>``CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
 `username` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
 `password` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
 `permission` tinyint(4) NOT NULL DEFAULT '1',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ``

3. For session management we'll use another table **sessions**:

>``CREATE TABLE `sessions` (
 `session_id` char(128) COLLATE utf8mb4_unicode_ci NOT NULL,
 `atime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `data` text COLLATE utf8mb4_unicode_ci,
 UNIQUE KEY `session_id` (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci``


4. Implement the following features:
    * sign up (saving a new user to the db)
    * login (sessions)
    * logout (sessions)

    Make sure the logged in user stays logged in also if she adds a note or reloads a page.


5. Take four screenshots of the following situations: 
    * a
    * b
    * c
    * d

    Save them to the **images** folder and **add image links** to the end of this document.

Note: if something does not work (despite your best efforts), add a comment about it below.

## Your screenshots and comments:
