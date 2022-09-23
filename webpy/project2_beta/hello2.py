import web
render = web.template.render('templates/')
urls = (
    '/(\w*)', 'Home'
)
class Home:
    def GET(self,name):
        return render.index(name)   # index is the template name

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 