import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-save-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FooterComponent],
  templateUrl: './save-recipes.component.html',
  styleUrl: './save-recipes.component.css'
})
export class SaveRecipesComponent {
allRecipes:any =[]

constructor(private api:ApiService){}
 ngOnInit(){
  this.getAllSavedrecipe()
 }
getAllSavedrecipe(){
  this.api.getsavedRecipeAPI().subscribe((res:any)=>{
    this.allRecipes =res
    console.log(this.allRecipes);

  })
}

removeSavedRecipe(id:any){
  this.api.deletesavedRecipeAPI(id).subscribe((res:any)=>{
    this.getAllSavedrecipe()
  })
}
}
