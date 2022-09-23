import web
render = web.template.render('templates/')
urls = (
    '/', 'Login',
    '/success/','Check',
    '/failure/','Check',
)
class Login:
    def GET(self):
        return render.login()   # home is the template name

class Check:
    def GET(self):
        content = "OK"
        success = True
        if(success):
            return render.success(content)    
        else:
            return render.failure(content)

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 