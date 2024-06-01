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
import { CustomDialogComponent } from '../../../../components/custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  addBlogForm!: FormGroup;
  categories: category[] = [];
  fileName: string | undefined;
  file: File | null = null;
  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private user: UserService,
    private dialog: MatDialog,
    private router: Router
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
      is_Public: [true, Validators.required],
    });
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file ? this.file.name : '';
      const formData = new FormData();
      formData.append('image', this.file);
      console.log(this.file);
    }
  }
  submitForm() {
    if (this.addBlogForm.valid) {
      const formData = new FormData();
      formData.append('title', this.addBlogForm.get('title')?.value);
      formData.append('content', this.addBlogForm.get('content')?.value);
      formData.append(
        'category',
        JSON.stringify(this.addBlogForm.get('category')?.value)
      );
      formData.append(
        'is_public',
        this.addBlogForm.get('is_Public')?.value ? '1' : '0'
      );

      if (this.file) {
        formData.append('image', this.file);
      }
      this.user.postBlog(formData).subscribe((data) => {
        if (data.success) {
          this.addBlogForm.reset();
          this.openDialog();
          this.router.navigate(['/user/blogs']);
        } else {
          console.log(data);
        }
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmation',
        description: 'Blog Added Successfully',
        button: false,
      },
    });
    setTimeout(() => {
      dialogRef.close();
    }, 3000);
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
