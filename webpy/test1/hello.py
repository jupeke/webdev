import web
render = web.template.render('templates/')
urls = (
    '/(.d*)', 'index'
)
class index:
    def GET(self, name):
        return render.index(name)

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 