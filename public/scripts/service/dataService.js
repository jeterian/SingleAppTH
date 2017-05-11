(function() {
	'use strict';

	angular.module('app')
		.service('dataService', function($http) {
			const homeUrl = 'http://localhost:5000';

			this.getRecipes = function(callback) {
				$http.get('${homeUrl}/api/recipes')
					.then(success => {
						callback(null, success.data);
					});
			};

			this.getCategories = function(callback) {
				$http.get('${homeUrl}/api/categories')
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
			};

			this.getFood = function(callback) {
				$http.get('${homeUrl}/api/fooditems')
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
			};

			this.getRecipeCateg = function(callback) {
				$http.get('${homeUrl}/api/recipes?category=${category}')
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
			};

			this.getRecipe = function (id, callback) {
				$http.get(`${homeUrl}/api/recipes/${id}`)
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
				};

			this.addRecipe = function (recipeData, callback) {
				$http.post(`${homeUrl}/api/recipes`, recipeData)
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
			};

			this.updateRecipe = function (id, recipeData, callback) {
				$http.put(`${homeUrl}/api/recipes/${id}`, recipeData)
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
			};

			this.removeRecipe = function (id, callback) {
				$http.delete(`${homeUrl}/api/recipes/${id}`)
					.then(success => {
						callback(null, success.data);
					}, error => {
						callback(error.data, null);
					});
				};
		});
})();