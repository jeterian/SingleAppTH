(function () {
	'use strict';

	//set up angular module/controller
	angular.module('app')
		.controller('RecipesController', function ($scope, dataService, $location) {
			$scope.selectedCategory = null;

			//retrieve recipe data
			dataService.getRecipes(recipeResponse);

			dataService.getCategories((error, categories) => {
				//error handler
				if (error) {
					return console.log(error);
				}

				$scope.categories = categories;
			});

			//add recipes
			$scope.addRecipe = function () {
				$location.path('/add');
			};

			//edit recipes
			$scope.editRecipe = function (recipe) {
				$location.path(`/edit/${recipe._id}`);
			};

			//delete recipe
			$scope.deleteRecipe = function (recipe) {
				const confirmed = confirm(`Do you really want to permanently delete "${recipe.name}" and risk having to type it all in again?`);
				if (!confirmed) {
					return;
				}

				dataService.removeRecipe(recipe._id, error => {
					if (error) {
						return console.log(error);
					}

					for (let i = 0; i < $scope.recipes.length; i++) {
						if ($scope.recipes[i]._id === recipe._id) {
							$scope.recipes.splice(i, 1);
						}
					}
				});
			};

			$scope.onCategoryChange = function () {
				if ($scope.selectedCategory) {
					dataService.getRecipeCateg($scope.selectedCategory.name, handleRecipeResponse);
				} else {
					dataService.getRecipes(recipeResponse);
				}
			};

			function recipeResponse(error, recipes) {
				if (error) {
					return console.log(error);
				}

				$scope.recipes = recipes;
			}
		});
})();