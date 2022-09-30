import web
render = web.template.render('templates/')
urls = (
    '/', 'Home',
    '/target','Target',
)
class Home:
    def GET(self):
        return render.home()   # home is the template name
    def POST(self):
        inp = web.input()
        message = inp.message
        raise web.seeother("/target?content="+message)   
         
class Target:
    def GET(self):
        i = web.input(content=None)
        return render.target(i.content)

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 