import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppComponent } from "./app.component";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { MenuComponent } from './menu/menu.component';
import { DrawerComponent } from "./shared/drawer/drawer.component";

import { DishService } from './services/dish.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { baseURL } from './shared/baseurl';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        DishdetailComponent,
        DrawerComponent
    ],
    providers: [
        {provide: 'BaseURL', useValue: baseURL},
        DishService,
        ProcessHTTPMsgService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
