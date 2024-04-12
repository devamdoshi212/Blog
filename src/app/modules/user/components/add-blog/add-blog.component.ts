import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import category from '../../../../models/category';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  addBlogForm!: FormGroup;
  categories: category[] = [];
  fileName: string | undefined;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private user: UserService
  ) {
    this.common.getCategory().subscribe((data) => {
      this.categories = this.common.category;
    });
  }

  ngOnInit(): void {
    this.addBlogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(1)]],
      image: ['', []],
      category: [[], [Validators.required]],
      is_Public: [1, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileName = file ? file.name : undefined;
  }
  submitForm() {
    if (this.addBlogForm.valid) {
      this.user
        .postBlog({
          data: JSON.stringify({
            ...this.addBlogForm.value,
            is_public: this.addBlogForm.get('is_Public') ? 1 : 0,
          }),
        })
        .subscribe((data) => {
          if (data.success) {
            this.addBlogForm.reset();
            this.user.getProfile();
          } else {
            console.log(data);
          }
        });
    }
  }
}
