import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
})
export class AddBlogComponent {
  addBlogForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addBlogForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(1)]],
      image: ['', []],
      category: [[], [Validators.required]],
      is_Public: [1, Validators.required],
    });
  }
  categories: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  fileName: string | undefined;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileName = file ? file.name : undefined;
  }
  submitForm() {
    console.log(this.addBlogForm.value);
  }
}
