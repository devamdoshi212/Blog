import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import category from '../../../../models/category';
import { CommonService } from '../../../../services/common.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
})
export class EditBlogComponent {
  addBlogForm!: FormGroup;
  categories: category[] = [];
  fileName: string | undefined;

  blogId: any = '';

  title: any = '';
  content: any = '';
  public: boolean = true;
  category: category[] = [];
  image: any = '';

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private user: UserService,
    private route: ActivatedRoute
  ) {
    this.common.getCategory().subscribe((data) => {
      this.categories = this.common.category;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      this.user.getSingleBlog(this.blogId).subscribe((data) => {
        console.log(data);
        this.title = data.data.title;
        this.content = data.data.content;
        this.category = data.data.category;
        this.public = data.data.is_public == 1 ? true : false;
      });
    });

    this.addBlogForm = this.fb.group({
      title: [this.title, [Validators.required]],
      content: [this.content, [Validators.required, Validators.minLength(1)]],
      image: ['', []],
      category: [this.category, [Validators.required]],
      is_Public: [this.public, Validators.required],
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
            is_public: this.addBlogForm.get('is_Public')?.value ? 1 : 0,
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
