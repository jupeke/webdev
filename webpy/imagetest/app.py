import web

urls = ('/upload', 'Upload')

class Upload:
    def GET(self):
        return """<html><head></head><body>
<form method="POST" enctype="multipart/form-data" action="">
<input type="file" name="myfile" />
<br/>
<input type="submit" />
</form>
</body></html>"""

    def POST(self):
        x = web.input(myfile={})
        web.debug(x['myfile'].filename) # This is the filename
        #web.debug(x['myfile'].value) # This is the file contents
        #web.debug(x['myfile'].file.read()) # Or use a file(-like) object
        filedir = 'images' # change this to the directory you want to store the file in.
        if 'myfile' in x: # to check if the file-object is created
            filepath=x.myfile.filename.replace('\\','/') # replaces the windows-style slashes with linux ones.
            filename=filepath.split('/')[-1] # splits the and chooses the last part (the filename with extension)
            extension=filename.split('.')[-1] 
            web.debug(filename)
            web.debug(extension)
            # creates the file where the uploaded file should be stored. Note:
            # the 'wb' is a must! Gives you write bytes permissions, I suppose.
            fout = open(filedir +'/'+ filename,'wb') 
            fout.write(x.myfile.file.read()) # writes the uploaded file to the newly created file.
            fout.close() # closes the file, upload complete.
        raise web.seeother('/upload')
        # Help?: decode('utf-8')

if __name__ == "__main__":
   app = web.application(urls, globals())
   app.run()