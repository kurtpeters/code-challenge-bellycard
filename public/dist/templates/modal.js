define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-dialog\">\n\n    <div class=\"modal-content\">\n\n        <div class=\"modal-header\">\n            <h2 class=\"modal-title\" id=\"mySmallModalLabel\">What's your gamertag?</h2>\n        </div>\n\n        <form role=\"form\">\n\n            <div class=\"modal-body\">\n                <input class=\"input input-lg form-control\" placeholder=\"Your Handle\", type=\"text\"/>\n            </div>\n            \n            <div class=\"modal-footer\">\n                <button class=\"btn btn-lg btn-primary\">Send</button>\n            </div>\n\n        </form>\n    \n    </div>\n\n</div>";
  })

});