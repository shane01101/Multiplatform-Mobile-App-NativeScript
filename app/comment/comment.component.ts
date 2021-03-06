import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Comment } from '../shared/comment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TextField } from 'ui/text-field';
import { Slider } from 'ui/slider';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
    
    commentForm: FormGroup;
    comment: Comment;
    rating: Number;

    constructor(private params: ModalDialogParams, private formBuilder: FormBuilder) {

        this.commentForm = this.formBuilder.group({
            rating: 5,
            comment: ['', Validators.required],
            author: ['', [Validators.required, Validators.minLength(2)]],
        });
    }

    ngOnInit() {

    }


    onAuthorChange(args) {
        let textField = <TextField>args.object;

        this.commentForm.patchValue({ author: textField.text});
    }

    onRatingChange(args) {
        let slider = <Slider>args.object;
        slider.value = Math.round(slider.value);
        this.commentForm.patchValue({ rating: slider.value});
    }

    onCommentChange(args) {
        let textField = <TextField>args.object;

        this.commentForm.patchValue({ comment: textField.text});
    }

    onSubmit() {
        console.log(this.commentForm.value);
        
        this.comment = this.commentForm.value;
        this.comment.date = new Date().toISOString();

        this.params.closeCallback(this.comment);
    }
}