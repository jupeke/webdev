# To do (students): 
1. **Pull** this repository (or the latest changes) to your computer. 
2. Add a new table **imagedetails** to the db *db_mynotes* in *EasyPHP -> PhpMyAdmin*. To make it easy use the SQL query in **schema.sql**

3. Create a new folder **static** in project folder. Go into the new folder and create there another folder **images**. That will be the location for saved images.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note: we'll use Pillow  image module to handle images (resize, rotate etc):    
* [How to install](https://pillow.readthedocs.io/en/latest/installation.html)
* [How to use Pillow](https://www.geeksforgeeks.org/working-images-python/?ref=lbp)

3. Implement CRUD for images (help: [file upload](https://webpy.org/cookbook/fileupload) and [save file](https://webpy.org/cookbook/storeupload)):
    * save image (the file to the *images* folder, the details to the db)
    * show images in the notes table (in the same cell with the content). To do this nicely, create a class *Note* in app.py with properties *id*, *content* and *imagehtml*. A list of notes is then sent to the home.html template. 
    * add *Edit* and *Delete* buttons for each image and make them work. Ask for confirmation before deletion!

4. Take two screenshots of the following situations: 
    * home view after inserting two small images
    * delete confirmation view for images

    Save them to the **static/images** folder and **add image links** to the end of this document.

Note: if something does not work (despite your best efforts), add a comment about it below.

## Your screenshots and comments:
