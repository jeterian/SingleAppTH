(function() {
	'use strict';

	//angular module/controller
	angular.module('app')
		.controller('RecipeDetailController', function($scope, $location, dataService) {
			var editing = false;
			if ($location.path().startsWith('/edit/')) {
				dataService.getRecipe($location.path().substr(6), (error, recipe) => {
					//error handling
					if (error) {
						return console.log(error);
					}

					$scope.recipe = recipe;
					editing = true;
				});
			} else {
				$scope.recipe = {};
			}

			//getCategories 
			dataService.getCategories((error, categories) => {
				if (error) {
					return console.log(error);
				}
				$scope.categories = categories;
			});

			//getFood
			dataService.getFood((error, data) => {
				if (error) {
					return console.log(error);
				}
				$scope.foodItems = data;
			});

			//get new items
			$scope.newItem = function () {
				if (!$scope.recipe.items) {
					$scope.recipe.items = [];
				}
				$scope.recipe.items.push({});
			};

			//new instruction
			$scope.newInstruction = function () {
				if(!$scope.recipe.instructions) {
					$scope.recipe.instructions = [];
				}
				$scope.recipe.instructions.push({});
			};

			//delete items
			$scope.deleteItem = function (index) {
				$scope.recipe.items.splice(index, 1);
			};


			//delete instructions
			$scope.deleteInstruction = function () {
				$scope.recipe.instructions.splice(index, 1);
			};

			//save recipe

			$scope.saveRecipe = function () {
				var recipe = $scope.recipe;

				//handle errors
				function errResponse(error) {
					if (error) {
						const errors - error.errors;
						$scope.errors = [];
						for (const error in errors) {
							if (Object.prototype.hasOwnProperty.call(errors, error)) {
								for (let i=0; i < errors[error].length; i++) {
									$scope.errors.push(errors[error][i]);
								}
							}
						}
					} else {
						$location.path('/';)
					}
				}

				if (editing) {
					dataService.updateRecipe(recipe, _id, recipe, errResponse);
				} else {
					dataService.addRecipe(recipe, errResponse);
				}
			};

			$scope.cancel = function() {
				$location.path('/');
			};
		});
})();