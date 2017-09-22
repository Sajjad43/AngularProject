import { Injectable,EventEmitter } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {
  	
  	private recipes: Recipe[] = [
		new Recipe("A test","A dish","https://cdn.pixabay.com/photo/2016/08/30/18/45/grilled-1631727_960_720.jpg",
			[new Ingredient("Bread",1),new Ingredient("Butter",4)])
	];	
  
  
  constructor(private shoppingListService:ShoppingListService) { }
  
  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
  	this.shoppingListService.addIngredients(ingredients);
  }
  
  getRecipe(index:number){
    return this.recipes.slice()[index];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
  }

}
