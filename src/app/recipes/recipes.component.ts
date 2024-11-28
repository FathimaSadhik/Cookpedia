import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,SearchPipe,FormsModule,NgxPaginationModule,FooterComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  p: number = 1;
 allRecipes:any =[]
 dummyAllRecipe:any =[]
 searchKey:string=""


 constructor(private api:ApiService,private router:Router){}

 ngOnInit(){
  this.getAllRecipes()
}

 getAllRecipes(){
  this.api.getAllRecipeAPI().subscribe((res:any)=>{
    this.allRecipes =res
    this.dummyAllRecipe =this.allRecipes
    console.log(this.allRecipes);
  })
}
// function for meal type and cuisine type
filterRecipes(recipeType:string,recipeName:string){
  this.allRecipes=this.dummyAllRecipe.filter((item:any)=>item[recipeType].includes(recipeName))
}
// fn for view recipe
viewRecipe(recipeId:string){
  if(sessionStorage.getItem("token")){
    this.router.navigateByUrl(`recipes/${recipeId}/view`)

  }else{
    alert("Please login to get Full Recipe in Details!!!")
  }
}

}
