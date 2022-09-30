import web
render = web.template.render('templates/')
urls = (
    '/(\w*)', 'Home',
    '/studies/(\w*)','Studies',
    '/details/.*','Details',

)
class Home:
    def GET(self, name):
        return render.index(name)   # index is the template name

class Studies:
    def GET(self, name):
        return render.studies(name)  

# How to manage multiple url attributes written like
# /details/?name=Elsa&age=22&lang=French:
class Details:
    def GET(self):
        # Set default values for variables.
        data = web.input(name='Default', age='0', lang='Finnish')
        # Get the eventual values:
        name = data.name
        age = data.age
        lang = data.lang 
        return render.details(name, age,lang)  

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 