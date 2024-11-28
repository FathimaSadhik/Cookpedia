import { Component, Input, input } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FooterComponent],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

// @Input() id!:string
id:string=""
recipe:any ={}
allRelatedRecipes:any =[]
  constructor(private api:ApiService,private activateRoute:ActivatedRoute){

  }
ngOnInit(){
// console.log(this.id);
this.activateRoute.params.subscribe((res:any)=>{
  this.id=res.id
  this.getRecipe(this.id)
})

}
 getRecipe(id:string){
  this.api.viewRecipeAPI(id).subscribe((res:any)=>{
    this.recipe =res
    console.log(this.recipe);
    this.getAllRelatedRecipes(res.cuisine)
  })
 }
 getAllRelatedRecipes(cuisine:string){
  this.api.getRelatedRecipeAPI(cuisine).subscribe((res:any)=>{
    if(res.length>1){
      this.allRelatedRecipes=res.filter((item:any)=>item.name!=this.recipe.name)
      console.log(this.allRelatedRecipes)
    }
  })
 }

addDownloadRecipe(){
  const recipeDetails ={
    name:this.recipe.name,
    cuisine:this.recipe.cuisine
  }
  this.api.downloadRecipeAPI(this.id,recipeDetails).subscribe((res:any)=>{
    this.generatePDF()
  })
}

 generatePDF(){
  let pdf = new jspdf()
  pdf.setFontSize(16)
  pdf.setTextColor("red")
  pdf.text(this.recipe.name,10,10)
  pdf.setFontSize(12)
  pdf.setTextColor("black")
  pdf.text(`Cuisine :${this.recipe.cuisine}`,10,20)
  pdf.text(`Servings :${this.recipe.servings}`,10,25)
  pdf.text(`Mode of Cooking :${this.recipe.difficulty}`,10,30)
  pdf.text(`Preparation Time :${this.recipe.prepTimeMinutes}`,10,35)
  pdf.text(`Cooking Time :${this.recipe.cookTimeMinutes}`,10,40)
  pdf.text(`Calorie Per Servings :${this.recipe.caloriesPerServing}`,10,45)
// ingredients instructions
let head =[["Ingredients Needed","Cooking Instructions"]]
let body:any=[]
body.push([this.recipe.ingredients,this.recipe.instructions])
autoTable(pdf,{head,body,startY:50})
pdf.output('dataurlnewwindow')
pdf.save('download.pdf')
 }
 saveRecipe(){
  const{_id,name,cuisine,image}=this.recipe
  this.api.saveRecipeAPI({id:_id,name,cuisine,image}).subscribe({
    next:(res:any)=>{
      alert("Recipe Added to your collection!!!!")
    },
    error:(reason:any)=>{
      alert(reason.error)
    }
  })
 }
}
