import web
urls = (
    '/', 'Home'
)
class Home:
    def GET(self):
        return "Hello, world!"

if __name__ == "__main__":
    myapp = web.application(urls, globals())
    myapp.run() 