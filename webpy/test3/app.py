import web
render = web.template.render('templates/')
urls = (
    '/', 'Home'
)
class Home:
    def GET(self):
        name = 'Ellen'   # Must define but can be empty
        return render.index(name)   # index is the template name

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 