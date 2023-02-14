# cd C:\Users\kerkkaju\Documents\GitHub\webdev\webpy\mynotes_final
from random import randint
from PIL import Image # For manipulating images.
import web
import logging
render = web.template.render('templates/')
web.config.debug = True # To make sessions work
urls = (
    '/', 'Home',
    '/confirm_delete', 'Confirm_delete',
    '/new','Newnote',
    '/edit', 'Edit',
    '/login','Login',
    '/logout','Logout',
    '/signup', 'Signup',
    '/details','Details',
    '/image','Imagesave',
    '/forbidden','Forbidden',
    '/admin','Admin',
    '/user_new','Admin_user_new',
    '/user_edit','Admin_user_edit',
    '/user_delete','Admin_user_delete',
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
session = web.session.Session(
    myapp, store, initializer={"logged_in": False, "is_admin": False, "user_id":-1})

# 'Constants' for Permission values in the db.
ADMIN_USER = 10
BASIC_USER = 1

# Configuration:
web.config.session_parameters['cookie_name'] = 'webpy_session_id'
web.config.session_parameters['cookie_domain'] = None
web.config.session_parameters['cookie_path'] = None
web.config.session_parameters['timeout'] = 3600  # in seconds
web.config.session_parameters['ignore_expiry'] = False
web.config.session_parameters['ignore_change_ip'] = True
web.config.session_parameters['secret_key'] = 'fLjUfxqXtfNoIlPiip'
web.config.session_parameters['expired_message'] = 'Session expired'

class Logged_in_check:
    def __init__(self):
        # session.logged_in == False also if session has been killed.
        if not session.logged_in: 
            raise web.seeother('/forbidden') 

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
        if session.logged_in: 
            username = session.username
        else:
            username = "none"
        return render.home(username, session.user_id, \
            session.is_admin, notes, message)  
    
    def POST(self):
        raise web.seeother('/') 

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
        
class Imagesave:
    filedir = 'static/images' # the directory to store the file in.
    def POST(self):
        i = web.input(myfile={})
        self.saveimage(i)
        raise web.seeother('/')

    # Saves the image file, resizes it to max 200px and saves the
    # details to db:
    def saveimage(self, wi):
        if 'myfile' in wi: # to check if the file-object is created
            # replaces the windows-style slashes with linux ones:
            filepath = wi.myfile.filename.replace('\\','/') 
            # splits the and chooses the last part (the filename with extension)
            filename = filepath.split('/')[-1] 
            extension = filename.split('.')[-1] 
            if extension in ["jpg", "jpeg", "png", "gif"]:
                imgpath = self.filedir +'/'+ filename
                # creates the file where the uploaded file should be stored. Note:
                # the 'wb' is a must! Gives you write bytes permissions, I suppose.
                fout = open(imgpath,'wb') 
                # writes the uploaded file to the newly created file.
                fout.write(wi.myfile.file.read()) 
                fout.close() # closes the file, upload complete.
                # Save details into db:
                id=db.insert('imagedetails', id_note=wi.note_id, \
                    filename=filename)

                # Resizing by using Image class (PIL):
                self.img_resize(Home.imgmaxwidth, Home.imgmaxheight, imgpath)

    # Resizing by using Image class (PIL):
    def img_resize(self, maxw, maxh, imgpath):
        try:
            img = Image.open(imgpath) 
            #In-place modification, preserves the orig ratio
            img.thumbnail((maxw, maxh)) 
            img.save(imgpath)
        except IOError:
            pass

class Newnote(Logged_in_check):
    def GET(self):
        return render.note_new("")
        
    def POST(self):
        i = web.input()
        if i.content == "":
            return render.note_new("The note can not be empty.")
        else:
            n=db.insert('notes', content=i.content)
            raise web.seeother('/')

class Edit(Logged_in_check):
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

class Confirm_delete(Logged_in_check):
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
        plaintext_pw = i.pword
        hashed_pw = hash(plaintext_pw)
        logging.debug("hashed pw:",hashed_pw)
        if self.login_ok(i.uname, hashed_pw):
            session.logged_in = True
            session.username = i.uname
            raise web.seeother('/?message=Welcome {}!'.format(session.username))
        else:
            session.logged_in = False
            return render.login('Bad username or password. Please retry!')
        
    # Hash all the passwords (once-in-the-lifetime thing)
    def hash_all(self):
        users = db.select('users')
        for user in users:
            hashed_pw = hash(user.password)
            myvar = dict(id=user.id)    
            n=db.update('users', vars=myvar, \
                where="id=$id", password=hashed_pw)

    def login_ok(self, uname, pword):
        success = False
        myvar = dict(un=uname,pw=pword)
        matches = db.query(
            "SELECT * FROM users WHERE username=$un AND password=$pw", 
            vars=myvar)
        if len(matches) > 0:
            success = True
            user = matches[0]
            if user.permission == ADMIN_USER:
                session.is_admin = True
            session.user_id = user.id
        return success

class Logout:
    def GET(self):
        n = session.username
        session.logged_in = False # Not really needed
        session.kill()
        return render.logout("See you again, {}!".format(n))

class Signup:
    def GET(self):
        return render.signup()
    def POST(self):
        i = web.input()
        id=db.insert('users', name=i.name, username=i.uname, \
            password=hash(i.pword), permission=1)
        raise web.seeother('/login?message=New user "{}" created'.format(i.name))

class Details(Logged_in_check):
    def GET(self):
        i = web.input()
        user_id = i.user_id
        myvar = dict(id=user_id)    # To prevent SQL injection attacks.
        users = db.select('users', vars=myvar, where="id=$id")
        if len(users) > 0:
            return render.details_edit(users[0])
        else:
            raise web.seeother('/forbidden')
        
    def POST(self):
        i = web.input()
        user_id = i.user_id
        myvar = dict(id=user_id) 
        myname = i.name
        uname = i.uname
        pword = i.pword  
        n=db.update('users', vars=myvar, where="id=$id", \
            name=myname, username=uname, password=pword)
        session.username = uname
        raise web.seeother('/?message=Person details changed successfully!')

class Forbidden:
    def GET(self):
        return render.forbidden()     

#==================================================================
class Admin_check:
    def __init__(self):
        # session.is_admin == False also if session has been killed.
        if not session.is_admin: 
            raise web.seeother('/forbidden') 

class Admin(Admin_check):
    def GET(self):
        users = db.select('users')
        i = web.input(message="")
        message = i.message
        return render.admin(users, message)    

class Admin_user_new(Admin_check):
    def GET(self):
        return render.user_new()
        
    def POST(self):
        i = web.input()
        hash
        id=db.insert('users', name=i.name, username=i.uname, \
            password=hash(i.pword), permission=i.permission)
        raise web.seeother('/admin?message=New user "{}" created'.format(i.name))
        

class Admin_user_edit(Admin_check):
    def GET(self):
        i = web.input()
        user_id = i.user_id
        myvar = dict(id=user_id)    # To prevent SQL injection attacks.
        users = db.select('users', vars=myvar, where="id=$id")
        return render.user_edit(users[0])
        
    def POST(self):
        i = web.input()
        user_id = i.user_id
        myvar = dict(id=user_id) 
        name = i.name
        uname = i.uname
        pword = hash(i.pword)  
        perm = i.permission
        n=db.update('users', vars=myvar, where="id=$id", \
            name=name, username=uname, password=pword, permission = perm)
        raise web.seeother('/admin?message=Person details changed successfully!')

class Admin_user_delete(Admin_check):
    def GET(self):
        i = web.input()
        user_id = i.user_id
        myvar = dict(id=user_id)
        users = db.select('users', vars=myvar, where="id=$id")
        return render.user_delete(users[0])
        
    def POST(self):
        i = web.input()
        user_id = i.user_id
        myvar = dict(id=user_id)
        db.delete('users', vars=myvar, where="id=$id")
        raise web.seeother('/admin')

class Note:
    def __init__(self, id, content, imagehtml):
        self.id = id
        self.content = content
        self.imagehtml = imagehtml

if __name__ == "__main__":
    myapp.run() 
