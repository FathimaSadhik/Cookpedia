import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
searchKey:string=""
  allRecipes:any =[]
  constructor(private api:ApiService){}
 ngOnInit(){
  this.getAllRecipeList()
 }

  getAllRecipeList(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes =res
      console.log(this.allRecipes);
    })
  }
  removeRecipe(id:any){
    this.api.removeRecipeAPI(id).subscribe((res:any)=>{
      this.getAllRecipeList()
    })
  }

}
