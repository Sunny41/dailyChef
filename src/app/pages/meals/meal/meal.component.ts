import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Meal } from 'src/app/models/meal';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {

  meal: Meal;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private router: Router, private storage: StorageService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.meal = this.router.getCurrentNavigation().extras.state.meal;

        this.meal.name = "Hamburger2";
        this.storage.setMeal(this.meal);
      }
    });
  }

  ngOnInit() {}

  onSave(){
    
  }
}
