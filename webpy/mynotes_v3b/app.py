# cd C:\Users\kerkkaju\Documents\GitHub\webdev\webpy\mynotes_v3
from random import randint
from PIL import Image
import web
render = web.template.render('templates/')
web.config.debug = False # To make sessions work
urls = (
    '/', 'Home',
    '/confirm_delete', 'Confirm_delete',
    '/new','Newnote',
    '/edit', 'Edit',
    '/login','Login',
    '/logout','Logout',
    '/signup', 'Signup',
    '/upload', 'Upload'
)

# Connect to db:
db = web.database(
    dbn='mysql',
    host='127.0.0.1',
    port=3306,
    user='root',
    pw='',
    db='db_mynotes',
)

myapp = web.application(urls, globals())

# Session:
store = web.session.DBStore(db, 'sessions')
session = web.session.Session(myapp, store, initializer={"logged_in": False})

# Configuration:
web.config.session_parameters['cookie_name'] = 'webpy_session_id'
web.config.session_parameters['cookie_domain'] = None
web.config.session_parameters['cookie_path'] = None
web.config.session_parameters['timeout'] = 3600  # in seconds
web.config.session_parameters['ignore_expiry'] = False
web.config.session_parameters['ignore_change_ip'] = True
web.config.session_parameters['secret_key'] = 'fLjUfxqXtfNoIlPiip'
web.config.session_parameters['expired_message'] = 'Session expired'

class Home:
    filedir = 'static/images' # the directory to store the file in.
    imgmaxwidth = 150
    imgmaxheight = 150
    def GET(self):
        dbnotes = db.select('notes')
        notes = []
        for dbnote in dbnotes:
            note = Note(dbnote.id, dbnote.content, \
                self.get_images_of_a_note(dbnote.id))
            notes.append(note)

        i = web.input(message="")
        message = i.message
        if session.get('logged_in', False):
            user = session.username
        else:
            user = "none"
        return render.home(user, notes, message)   # the template name
    
    def POST(self):
        if session.get('logged_in', False):
            user = session.username
        else:
            user = "none"
        i = web.input(todo="show",myfile={})
        todo = i.todo
        note_id = i.note_id
        if todo == "delete":
            note = "piip"
            raise web.seeother('/confirm_delete?note_id='+note_id)
        elif todo == "update":
            raise web.seeother('/edit?note_id='+note_id)
        elif todo == "addimg":
            self.saveimage(i)
            raise web.seeother('/')
        else:    # Default todo == "show"
            raise web.seeother('/') 

    # Saves the image file, resizes it to max 200px and saves the
    # details to db:
    def saveimage(self, wi):
        if 'myfile' in wi: # to check if the file-object is created
            filepath = wi.myfile.filename.replace('\\','/') # replaces the windows-style slashes with linux ones.
            filename = filepath.split('/')[-1] # splits the and chooses the last part (the filename with extension)
            extension = filename.split('.')[-1] 
            if extension in ["jpg", "jpeg", "png", "gif"]:
                imgpath = self.filedir +'/'+ filename
                # creates the file where the uploaded file should be stored. Note:
                # the 'wb' is a must! Gives you write bytes permissions, I suppose.
                fout = open(imgpath,'wb') 
                fout.write(wi.myfile.file.read()) # writes the uploaded file to the newly created file.
                fout.close() # closes the file, upload complete.
                # Save details into db:
                id=db.insert('imagedetails', id_note=wi.note_id, \
                    filename=filename)

                # Resizing by using Image class (PIL):
                self.img_resize(self.imgmaxwidth, self.imgmaxheight, imgpath)

    # Resizing by using Image class (PIL):
    def img_resize(self, maxw, maxh, imgpath):
        try:
            img = Image.open(imgpath) 
            #In-place modification, preserves the orig ratio
            img.thumbnail((maxw, maxh)) 
            img.save(imgpath)
        except IOError:
            pass
                
    def get_images_of_a_note(self, id_note):
        imagehtml = ""
        myvar = dict(id=id_note)    # To prevent SQL injection attacks.
        images = db.select('imagedetails', vars=myvar, where="id_note=$id")
        for image in images:
            imgsrc = self.filedir+"/"+image.filename
            #------------------------------------------------------------------
            # Resize if too big:
            '''try:
                img = Image.open(imgsrc)
                if (img.width > self.imgmaxwidth or img.height > self.imgmaxheight):
                    self.img_resize(self.imgmaxwidth, self.imgmaxheight, imgsrc)
            except IOError:
                pass'''
            #------------------------------------------------------------------
            imagehtml += "<img src='{}'>".format(imgsrc)
        return imagehtml
            
class Newnote:
    def GET(self):
        return render.note_new()
    def POST(self):
        i = web.input()
        n=db.insert('notes', content=i.content)
        raise web.seeother('/')

class Edit:
    def GET(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)    # To prevent SQL injection attacks.
        notes = db.select('notes', vars=myvar, where="id=$id")
        return render.note_edit(notes[0])
    def POST(self):
        i = web.input()
        note_id = i.note_id
        cont = i.content
        myvar = dict(id=note_id)    
        n=db.update('notes', vars=myvar, where="id=$id", content=cont)
        raise web.seeother('/')

class Confirm_delete:
    def GET(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)
        notes = db.select('notes', vars=myvar, where="id=$id")
        return render.confirm_delete(notes[0])
    def POST(self):
        i = web.input()
        note_id = i.note_id
        myvar = dict(id=note_id)
        db.delete('notes', vars=myvar, where="id=$id")
        raise web.seeother('/')

class Login:
    def GET(self):
        i = web.input(message="")
        message = i.message
        return render.login(message)
    def POST(self):
        i = web.input()
        if self.login_ok(i.uname, i.pword):
            session.logged_in = True
            session.username = i.uname
            raise web.seeother('/?message=Welcome {}!'.format(session.username))
        else:
            session.logged_in = False
            return render.login('Bad username or password. Please retry!')
        
    def login_ok(self, uname, pword):
        success = False
        myvar = dict(un=uname,pw=pword)
        matches = db.query(
            "SELECT * FROM users WHERE username=$un AND password=$pw", 
            vars=myvar)
        if len(matches) > 0:
            success = True
        return success

class Logout:
    def GET(self):
        n = session.username
        session.kill()
        return render.logout("See you again, {}!".format(n))

class Signup:
    def GET(self):
        raise web.seeother()
    def POST(self):
        i = web.input()
        id=db.insert('users', name=i.name, username=i.uname, \
            password=i.pword, permission=i.permission)
        raise web.seeother('/login?message=New user "{}" created'.format(i.name))

class Note:
    def __init__(self, id, content, imagehtml):
        self.id = id
        self.content = content
        self.imagehtml = imagehtml
    

if __name__ == "__main__":
    myapp.run() 