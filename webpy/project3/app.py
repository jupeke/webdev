from os import uname
import web
render = web.template.render('templates/')
urls = (
    '/', 'Login',
    '/success/','Success',
    '/failure/','Failure',
)
class Login:
    def GET(self):
        return render.login()   # home is the template name
    def POST(self):
        user_input = web.input()
        username = user_input.username
        password = user_input.password
        success = True
        if(success):
            return render.success(content)    
        else:
            return render.failure(content)

class Success:
    def GET(self):
        content = "OK"
        return render.success(content) 

class Failure:
    def GET(self):
        content = "Failure"
        return render.failure(content) 
        

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 