import { Component } from '@angular/core';
import category from '../../../../models/category';
import { UserService } from '../../../../services/user.service';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-add-interest',
  templateUrl: './add-interest.component.html',
})
export class AddInterestComponent {
  categories: category[] = [];
  allCategories: category[] = [];
  interestIds: String[] = [];

  constructor(private user: UserService, private common: CommonService) {
    this.fetchData();
  }
  fetchData(): void {
    this.user.getInterestedCategory().subscribe((data: any) => {
      if (data.success) {
        console.log(data);
        this.categories = data.data.user.interests;

        this.common.getCategory().subscribe((data: category[]) => {
          this.allCategories = data.filter(
            (cat) => !this.categories.some((c) => c._id === cat._id)
          );
        });
      }
    });
  }
  addCategory(id: String) {
    this.interestIds.push(id);
    this.user
      .addInterestCategory({ interestIds: this.interestIds })
      .subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.fetchData();
        }
      });
  }
  removeCategory(id: String) {
    this.user.removeInterestCategory(id).subscribe((data) => {
      if (data.success) {
        this.fetchData();
      }
    });
  }
}
