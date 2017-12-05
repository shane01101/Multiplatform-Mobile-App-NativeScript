import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppComponent } from "./app.component";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from "nativescript-telerik-ui/listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { MenuComponent } from './menu/menu.component';
import { DrawerComponent } from "./shared/drawer/drawer.component";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationModalComponent } from "./reservationmodal/reservationmodal.component";

import { DishService } from './services/dish.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { FavoriteService } from './services/favorite.service';


import { baseURL } from './shared/baseurl';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        TNSFontIconModule.forRoot({
            'fa': './fonts/font-awesome.min.css'
        }),
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        DishdetailComponent,
        DrawerComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        FavoritesComponent,
        ReservationComponent,
        ReservationModalComponent
    ],
    entryComponents: [ReservationModalComponent],
    providers: [
        {provide: 'BaseURL', useValue: baseURL},
        DishService,
        ProcessHTTPMsgService,
        PromotionService,
        LeaderService,
        FavoriteService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
