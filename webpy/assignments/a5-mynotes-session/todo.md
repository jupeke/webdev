# To do (students): 
1. **Pull** this repository (or the latest changes) to your computer. 
2. Add two new tables **users** and **sessions** to the db *db_mynotes* in *EasyPHP -> PhpMyAdmin*. To make it easy use the SQL queries in **schema.sql** 

3. The code should work already (test all the functions, specially *signup, login* and *logout*). But it's a bit illogical that you can add, edit and delete notes even if you are not logged in. Develop the application further in the following way: 
    * *app.py*: prevent actions new, edit and delete if the user has not logged in. If that's the case, redirect the user to address */forbidden*.
    * *home.html*: change so that the buttons *Add new note*, *Edit* and *Delete* are not visible unless user has logged in. 
    * *home.html etc*: change so that you can not select *Permission* value when you sign up. Instead the default value for basic (not admin) permission should be used. 
    Add a *Create account* button to the *home.html* if the logged in user is an *admin* (otherwise the link is not shown). That opens a form like the signup but with the 2 options for *permission*.

Note: if something does not work (despite your best efforts), add a comment about it below.

## Your comments:
