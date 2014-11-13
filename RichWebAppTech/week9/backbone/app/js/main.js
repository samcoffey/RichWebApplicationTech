// Needed to allow CROSS-domain requests
$.ajaxSetup({
	crossDomain : true,
	cache : false,
	contentType : "application/json",
	dataType : "json"
});

// Router
var AppRouter = Backbone.Router.extend({

	routes : {
		"nationalities" : "nationalities",
		"nationalities/:id" : "nationalities",
		"nationalities/students/:id" : "studentsOfNationality"
	},

	nationalities : function(id) {

		var nationalitesCollection = new NationalitesCollection();

		nationalitesCollection.fetch({
			success : function() {

				// create view and pass collection
				var nationalitesListView = new NationalitesListView({
					collection : nationalitesCollection
				});

				nationalitesListView.flush(); // empty left sidebar
				nationalitesListView.render(); // render left sidebar

				// Render the Detail
				if (id) {
					var nationalityDetailView = new NationalityDetailView({
						model : nationalitesCollection.get(id)
					});

					nationalityDetailView.render(); // render right column
                    nationalityDetailView.pieChartRender();
				}

			}
		});
	},
	
	//Added by sc
	studentsOfNationality : function(id) {
		var studentsCollection = new StudentsCollection();
		studentsCollection.fetch({
			success : function() {
				
				var studentsOfNationalityView = new StudentsOfNationalityView({
					collection : studentsCollection
				});
				studentsOfNationalityView.flush();
				studentsOfNationalityView.render(id);
			}
		});
		
	}
});

// Base Url
var baseUrl = "http://www.lucalongo.eu/courses/2014-2015/questionnaireDIT/app/index.php";

// Base Model
var BaseModel = Backbone.Model.extend();

//Student Model - Added by sc - Automatically adds Id
var StudentModel = Backbone.Model.extend({
	model : BaseModel,
	urlRoot : this.baseUrl + "/students"
});

// Nationalites Collection
var NationalitesCollection = Backbone.Collection.extend({
	model : BaseModel,
	url : this.baseUrl + "/nationalities"
});

//Students Collection - Added by sc
var StudentsCollection = Backbone.Collection.extend({
	model : BaseModel,
	url : this.baseUrl + "/students"
});

// Nationalites List View (nationalites navigation)
var NationalitesListView = Backbone.View.extend({

	el : "#nationalities",

	render : function() {
		var self = this;
		// this collections models coincides with the list of objects in the
		// collection
		_.each(this.collection.models, function(model) {
			var nationalitesListItemView = new NationalitesListItemView({
				model : model
			});

			//
			nationalitesListItemView.render();
			// this.$el is a backbone shorcut to get the jquery object el
			self.$el.append(nationalitesListItemView.$el);
		});
	},

	flush : function() {
		this.$el.empty(); // jquery method
	}

});

// Nationalites List Item View (nationality item)
var NationalitesListItemView = Backbone.View.extend({

	tagName : "li",

	template : _.template($("#nationality-item-template").html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Nationalites Detail View (nationality detail)
var NationalityDetailView = Backbone.View.extend({

	$content : $("#content"),

	template : _.template($("#nationality-detail-template").html()),

	render : function() {
		// add here html to display
		this.$content.html(this.template(this.model.toJSON()));
		return this;
	},

	pieChartRender : function(model) {
		// Render pie chart
	}
});

//Student Detail View (student detail) - Added by SC
var StudentsOfNationalityView = Backbone.View.extend({

	$content : $("#content"),

	template : _.template($("#studentsOfNationality-detail-template").html()),

	render : function(idNationality) {
		// this collections models conincides with the list of objects in the collection
		var self = this;
		var template = this.template;
		_.each(this.collection.models, function(model) {
			var studentID = model.toJSON().id;
			
			//Setting a student Model
			var student = new StudentModel({
				id : studentID
			});
			
			//The fetch below will perform GET ../student/studentID
			student.fetch({
				success : function(s) {
					if(s.toJSON().id_nationality == idNationality) {
						self.$content.append(template(s.toJSON()));
					}
				}
			});
		});

	},

	flush : function() {
		this.$content.empty(); // jquery method
	},
	
	pieChartRender : function(model) {
		// Render pie chart
	}
});

// Init the App Router
new AppRouter();
Backbone.history.start();