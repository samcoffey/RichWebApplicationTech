// Needed to allow CROSS-domain requests
$.ajaxSetup({
	crossDomain : true,
	cache : false,
	contentType : "application/json",
	dataType : "json"
});

//Router
var AppRouter = Backbone.Router
		.extend({

			routes : {
				"questionnaires" : "questionnaires"
			},

			questionnaires : function() {

				var questionnairesCollection = new QuestionnairesCollection();

				questionnairesCollection.fetch({
					success : function() {

						// create view and pass collection
						var questionnairesTableView = new QuestionnairesTableView({
							collection : questionnairesCollection
						});

						questionnairesTableView.flush(); // empty functionality 1
						questionnairesTableView.render(); // render functionality 1

					}
				});
			}

		});

//Base Url
var baseUrl = "http://lucalongo.eu/courses/2014-2015/questionnaireDIT/app/index.php";

// Base Model
var BaseModel = Backbone.Model.extend();

var QuestionnaireModel = Backbone.Model.extend({
	model : BaseModel,
	urlRoot : this.baseUrl + "/questionnaires"
});

//questionnaires Collection
var QuestionnairesCollection = Backbone.Collection.extend({
	model : BaseModel,
	url : this.baseUrl + "/questionnaires"
});

//Questionnaires Table View - Functionality 1
var QuestionnairesTableView = Backbone.View.extend({

	el : "#questionnaires",

	render : function() {
		var self = this;
		// this collections models coincides with the list of objects in the
		// collection
		_.each(this.collection.models, function(model) {
			var questionnairesTableItemView = new QuestionnairesTableItemView({
				model : model
			});

			//
			questionnairesTableItemView.render();
			// this.$el is a backbone shortcut to get the jquery object el
			self.$el.append(questionnairesTableItemView.$el);
		});
	},

	flush : function() {
		this.$el.empty(); // jquery method
	}

});

//Questionnaires Table Item View (nationality item)
var QuestionnairesTableItemView = Backbone.View.extend({

	tagName : "tr",

	template : _.template($("#questionnaire-item-template").html()),

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

$(document).ready(
		function() {
			function close_accordion_section() {
				$('.accordion .accordion-section-title').removeClass('active');
				$('.accordion .accordion-section-content').slideUp(300)
						.removeClass('open');
			}

			$('.accordion-section-title').click(
					function(e) {
						// Grab current anchor value
						var currentAttrValue = $(this).attr('href');

						if ($(e.target).is('.active')) {
							close_accordion_section();
						} else {
							close_accordion_section();

							// Add active class to section title
							$(this).addClass('active');
							// Open up the hidden content panel
							$('.accordion ' + currentAttrValue).slideDown(300)
									.addClass('open');
						}

						e.preventDefault();
					});
		});

//Init the App Router
new AppRouter();
Backbone.history.start();