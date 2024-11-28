import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { UsersComponent } from './users/users.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
// http://localhost:4200/admin
  {
    path:"", component:DashboardComponent
  },
  // http://localhost:4200/admin/all-recipe
  {
    path:"all-recipe",component:RecipeListComponent
  },
  // http://localhost:4200/admin/recipes/add
  {
    path:"recipes/add",component:ManageRecipeComponent
  },
   // http://localhost:4200/admin/recipes/:id/edit
   {
    path:"recipes/:id/edit",component:ManageRecipeComponent
  },
   // http://localhost:4200/admin/all-users
   {
    path:"all-users",component:UsersComponent
  },
   // http://localhost:4200/admin/all-download
   {
    path:"all-download",component:DownloadsComponent
  },
   // http://localhost:4200/admin/all-request
   {
    path:"all-request",component:RequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
