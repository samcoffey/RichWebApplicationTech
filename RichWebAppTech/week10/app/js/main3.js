// Needed to allow CROSS-domain requests
$.ajaxSetup({
	crossDomain : true,
	cache : false,
	contentType : "application/json",
	dataType : "json"
});

// Router
var AppRouter = Backbone.Router
		.extend({

			routes : {
				"students" : "students",
				"students/:id" : "students",
				"questionnaires/students/:id" : "questionnairesOfaStudent"
			},

			students : function(id) {

				var studentsCollection = new StudentsCollection();

				studentsCollection
						.fetch({
							success : function() {

								// create view and pass collection
								var studentsListView = new StudentsListView(
										{
											collection : studentsCollection
										});

								studentsListView.flush(); // empty left
								// sidebar
								studentsListView.render(); // render left
								// sidebar

								// Render the Detail
								if (id) {
									var studentsDetailView = new StudentsDetailView(
											{
												model : studentsCollection
														.get(id)
											});
									studentsDetailView.render();
								}

							}
						});
			},

			questionnairesOfaStudent : function(studentID) {
				var questionnaireOfAStudentCollection = new QuestionnairesOfAStudentCollection(
						[], {
							id : studentID
						});

				questionnaireOfAStudentCollection
						.fetch({
							success : function() {
								var questionnairesOfStudentView = new QuestionnaireOfAStudentCollection(
										{
											collection : questionnaireOfAStudentCollection
										});

								questionnairesOfStudentView.flush();
								questionnairesOfStudentView.render();
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

// students Collection
var StudentsCollection = Backbone.Collection.extend({
	model : BaseModel,
	url : this.baseUrl + "/students"
});

// questionnaires of a student Collection
var QuestionnairesOfAStudentCollection = Backbone.Collection.extend({
	model : BaseModel,
	baseURL : this.baseUrl,
	initialize : function(models, options) {
		this.url = this.baseURL + "/questionnaires/student/" + options.id;
		console.log(this.url);
	}
});

/**
 * VIEWS
 */

// Students List View (students navigation)
var StudentsListView = Backbone.View.extend({

	el : "#students",

	render : function() {
		var self = this;
		// this collections models coincides with the list of objects in the
		// collection
		_.each(this.collection.models, function(model) {
			var studentsListItemView = new StudentsListItemView({
				model : model
			});

			//
			studentsListItemView.render();
			// this.$el is a backbone shorcut to get the jquery object el
			self.$el.append(studentsListItemView.$el);
		});
	},

	flush : function() {
		this.$el.empty(); // jquery method
	}

});

//Studnets List Item View (nationality item)
var StudentsListItemView = Backbone.View.extend({

	tagName : "li",

	template : _.template($("#student-item-template").html()),

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
var QuestionnaireOfAStudentCollection = Backbone.View.extend({

	$content : $("#content"),

	render : function() {
		var self = this;
		_.each(this.collection.models, function(questionnaire) {
			console.log(questionnaire.toJSON());
			self.$content.append(questionnaire.toJSON().id + "<br>");
		});

	},

	flush : function() {
		this.$content.empty(); // jquery method
	}
});

// Init the App Router
new AppRouter();
Backbone.history.start();