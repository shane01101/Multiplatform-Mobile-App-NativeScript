import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { DrawerPage } from '../shared/drawer/drawer.page';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { Animation, AnimationDefinition } from "ui/animation";
import * as enums from "ui/enums";
import { CouchbaseService } from '../services/couchbase.service';
import { Couchbase } from 'nativescript-couchbase';

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html'
})
export class ReservationComponent extends DrawerPage implements OnInit {

    reservation: FormGroup;
    docId: string = "reservations";
    submitted: boolean;
    reservationView: View;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef,
        private page: Page, 
        private couchbaseService: CouchbaseService) {
            super(changeDetectorRef);

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    ngOnInit() {
        //comment this out to persist reservations that have been submitted
        this.couchbaseService.deleteDocument(this.docId);
        this.submitted = false;
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    createModalView(args) {
        
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });
    }
    reservationAnimationView(){
        this.reservationView= <View>this.page.getViewById<View>("reservationView");
        this.reservationView.animate({
            scale: { x: 0, y: 0}, 
            opacity: 0.0,
            duration: 500,
            curve: enums.AnimationCurve.easeOut}

        ).then(() => {
            this.submitted = true;
            this.reservationView.animate({
              scale: { x: 1, y: 1}, 
              opacity: 1.0,
              duration: 500,
              curve: enums.AnimationCurve.easeIn}     
          );
        });
    }

    addReservation()
    {
        let reservations: Array<any> = [];
        let doc = this.couchbaseService.getDocument(this.docId);

        if(doc == null) {
            console.log("This is the first reservation");
            reservations.push(this.reservation.value);
            this.couchbaseService.createDocument({ "reservations": reservations }, this.docId);
        }
        else {
            reservations = doc.reservations;
            reservations.push(this.reservation.value);
            this.couchbaseService.updateDocument(this.docId, { "reservations": reservations });
        }
        doc = this.couchbaseService.getDocument(this.docId);
        console.log(JSON.stringify(doc));
    }

    onSubmit() {
        this.addReservation();
        this.reservationAnimationView();
    }
}