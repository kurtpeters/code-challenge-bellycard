define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function";


  buffer += "<div class=\"container\">\n\n    <div class=\"prompt\">\n\n        <h1>";
  if (helper = helpers.question) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.question); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>\n\n        <div class=\"feedback\">\n\n            <form class=\"form-inline\">\n\n                <div class=\"input-group\">\n\n                    <input type=\"text\" class=\"input input-lg form-control answer\" placeholder=\"It is...\" />\n\n                    <span class=\"input-group-btn\">\n           \n                        <button class=\"send btn btn-lg btn-belly\">GO</button>\n           \n                    </span>\n\n                </div>\n\n            </form>\n\n        </div>\n\n    </div>\n\n</div>";
  return buffer;
  })

});