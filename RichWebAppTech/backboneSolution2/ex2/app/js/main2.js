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
		"nationalities/students/:id" : "studentsOfNationality",
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
					// nationalityDetailView.pieChartRender();
				}

			}
		});
	},

	studentsOfNationality : function(id) {

		var studentsCollection = new StudentsCollection();
		// var nationalitesCollection = new NationalitesCollection();

		studentsCollection.fetch({
			success : function() {

				// create view and pass collection
				var studentsOfNationalityView = new StudentsOfNationalityView({
					collection : studentsCollection
				});

				studentsOfNationalityView.flush(); // empty left sidebar
				studentsOfNationalityView.render(id); // render left sidebar
			}
		});

	}

});

// Base Url
var baseUrl = "http://www.lucalongo.eu/courses/2014-2015/questionnaireDIT/app/index.php";

// Base Model
var BaseModel = Backbone.Model.extend();

var StudentModel = Backbone.Model.extend({
	model : BaseModel,
	urlRoot : this.baseUrl + "/students"
});

// Nationalites Collection
var NationalitesCollection = Backbone.Collection.extend({
	model : BaseModel,
	url : this.baseUrl + "/nationalities"
});

// students Collection
var StudentsCollection = Backbone.Collection.extend({
	model : BaseModel,
	url : this.baseUrl + "/students"
});

/**
 * VIEWS
 */

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
	}
});

// Students with a certain nationality View (nationality detail)
var StudentsOfNationalityView = Backbone.View.extend({

	$content : $("#content"),
	template : _.template($("#studentOfNationality-detail-template").html()),

	render : function(idNationality) {
		// this collections models coincides with the list of objects in the collection
		var self = this;
		var template = this.template;
		_.each(this.collection.models, function(model) {
			var studentID = model.toJSON().id;
			
			//setting a student model
			var student = new StudentModel({
				id : studentID
			});

			// The fetch below will perform GET .../student/studentID
			student.fetch({
				success : function(s) {
					if (s.toJSON().id_nationality ==  idNationality) {
						self.$content.append(template(s.toJSON()));
					}
				}
			});

		});
	},

	flush : function() {
		this.$content.empty(); // jquery method
	}

});

// Init the App Router
new AppRouter();
Backbone.history.start();