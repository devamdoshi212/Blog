import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
})

export class AddBlogComponent {
  toppings = new FormControl('');
  categories: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
}
