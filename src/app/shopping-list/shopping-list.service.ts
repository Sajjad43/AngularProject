import { Injectable,EventEmitter } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs/Subject";
@Injectable()

export class ShoppingListService {
	
	ingredientChanged = new Subject<Ingredient[]>(); 
  startedEditing = new Subject<Number>();
	private ingredients:Ingredient[] = [
	new Ingredient("Apple",5),
	new Ingredient("Pumpkin",534)
	]
  constructor() { }

  getIngredients(){
  	return this.ingredients.slice();
  }

  getIngredient(index){
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient){
  	this.ingredients.push(ingredient);
  	this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){

    console.log(ingredients);
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());

  }

  updateIngredient(ingredient:Ingredient,index:number){
    this.ingredients[index] = ingredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
