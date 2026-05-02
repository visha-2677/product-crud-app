import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"products",
        pathMatch: 'full'
    },
    {
        path:"products",
        loadComponent:()=> import("./product/product-list/product-list").then(m => m.ProductList)
    },
    {
        path:"products/add-update",
        loadComponent:()=> import("./product/product-add-update/product-add-update").then(m => m.ProductAddUpdate)
    },
    {
        path:"products/add-update/:id",
        loadComponent:()=> import("./product/product-add-update/product-add-update").then(m => m.ProductAddUpdate)
    }
];
