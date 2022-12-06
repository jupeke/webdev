# To do (students): 
1. **Pull** this repository (or the latest changes) to your computer. 
2. Add two new tables **users** and **sessions** to the db *db_mynotes* in *EasyPHP -> PhpMyAdmin*. To make it easy use the SQL queries in **schema.sql** 

3. Implement the following features:
    * sign up (saving a new user to the db)
    * login (sessions)
    * logout (sessions)

    Make sure the logged in user stays logged in also if she adds a note or reloads a page. Use sessions (stored in db) to make work. For help read [this](https://webpy.org/cookbook/sessions).

4. Implement the following features:
    * Edit your account (a new template *details_edit.html*, modify *app.py*: urls and a new class *Details*). Leave out *permission*, it can not be changed here.

4. Implement **admin features** (test each one before going on):
    * Add a *Manage users* link to *home.html* and make the link only visible for admins.

    * Add Admin home page (see picture below) that shows all the users in a table (a new template *admin.html*, modify *app.py*: urls and a new class *Admin*)

    * Add a *New User* link and make it work (a new template *details_edit.html*, modify *app.py*: urls and a new class *Admin_user_new*)

    * Add *Edit* and *Delete* links for each user.

    * Edit user (*user_edit.html, modify *app.py*: urls and a new class *Admin_user_edit*)

    * Delete user (*user_delete.html, modify *app.py*: urls and a new class *Admin_user_delete*)

    * Secure admin features: modify *app.py* so that only admin users can open the *admin.html* or do anything there.


## Screenshots by teacher:

**admin.html**:

![admin.html](images/admin.png)

Note: if something does not work (despite your best efforts), add a comment about it below.

## Your screenshots and comments:
