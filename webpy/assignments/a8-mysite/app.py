# cd C:\Users\kerkkaju\Documents\GitHub\webdev\webpy\assignments\a7-mynotes-admin
import web
render = web.template.render('templates/')
web.config.debug = False # To make sessions work
urls = (
    '/', 'Home',
)

# Connect to db:
db = web.database(
    dbn='mysql',
    host='127.0.0.1',
    port=3306,
    user='root',
    pw='',
    db='xxxxxx',    # Change as needed
)

myapp = web.application(urls, globals())

# Session:
store = web.session.DBStore(db, 'sessions')
session = web.session.Session(
    myapp, store, initializer={"logged_in": False, "is_admin": False, "user_id":-1})

# 'Constants' for Permission values in the db.
#ADMIN_USER = 10
#BASIC_USER = 1

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
    def GET(self):
        return render.home()  
    
    def POST(self):
        raise web.seeother('/') 
            
#======================================================
if __name__ == "__main__":
    myapp.run() 
