import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../service/review.service";
import {Review} from "../model/Review";
import {User} from "../model/User";
import {StorageService} from "../service/storage.service";
import {UserService} from "../service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviews: Review[];
  user: User;
  reviewForm: FormGroup;

  constructor(private reviewService: ReviewService,
              private storageService: StorageService,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.reviews = await this.reviewService.getAllReviews();
    if (this.storageService.currentUser) {
      let userId = this.storageService.currentUser;
      this.user = await this.userService.getUserById(userId);
    }
    this.reviewForm = this.formBuilder.group({
      description: ['', [Validators.required]]
    });
  }

  deleteReview(index: number): void {
    let review = this.reviews[index];
    this.reviewService.deleteReview(review.id).subscribe(response => {
      console.log(response);
      this.reviews.splice(index, 1);
    });
  }

  addReview(): void {
    if (this.user && this.reviewForm.valid) {
      let review = new Review();
      review.user = this.user;
      review.description = this.reviewForm.get('description').value;
      this.reviewService.createReview(review).subscribe(response => {
        console.log(response);
        this.reviews.push(response);
        this.reviewForm.get('description').reset();
      })
    }
  }
}
