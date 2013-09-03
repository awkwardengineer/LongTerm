import cgi
import urllib
import webapp2
import jinja2
import os

from google.appengine.ext.webapp import template

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

 
class MainPage(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        
        path= os.path.join(os.path.dirname(__file__), 'index.html')
  
        self.response.out.write(template.render(path,template_values))
        
class TestPage(webapp2.RequestHandler):
    def get(self):
        template_values = {}
        
        path= os.path.join(os.path.dirname(__file__), 'nodes.html')
  
        self.response.out.write(template.render(path,template_values))


app = webapp2.WSGIApplication([('/nodes.html',TestPage),
                               ('/',MainPage)],
                              debug=True)