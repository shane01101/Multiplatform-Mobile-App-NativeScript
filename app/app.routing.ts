import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReservationComponent } from './reservation/reservation.component';


const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutComponent },
    { path: "menu", component: MenuComponent },
    { path: "contact", component: ContactComponent },
    { path: "favorites", component: FavoritesComponent },
    { path: "reservation", component: ReservationComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }