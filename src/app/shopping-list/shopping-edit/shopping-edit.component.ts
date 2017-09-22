import { Component, OnInit ,Output,OnDestroy, ElementRef,ViewChild,EventEmitter} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model'
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import   {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild("f") form : NgForm; 

  subscription:Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem :Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe((index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        })
    })
  } 

  onSubmit(form:NgForm){
      
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);

    if(this.editMode == true){
      this.shoppingListService.updateIngredient(newIngredient,this.editedItemIndex);
    }
    else{
      
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  	
  	 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
