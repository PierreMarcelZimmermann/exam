import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-user-input',
  templateUrl: './category-user-input.component.html',
  styleUrls: ['./category-user-input.component.css']
})
export class CategoryUserInputComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryName: string = this.categoryForm.value.name;
      this.categoryService.createCategory(categoryName).subscribe(
        (createdCategory) => {
          console.log('Category created:', createdCategory);
          this.categoryForm.reset();
          this.categoryService.categoriesChanged.emit();  

        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    }
  }
}
