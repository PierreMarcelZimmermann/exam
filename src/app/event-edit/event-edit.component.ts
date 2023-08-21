import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { CategoryService } from '../category.service';
import { Category } from '../category.interface';
import { Event } from '../event.interface';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent {
  eventForm: FormGroup;
  allCategories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.eventForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      location: [''],
      organizer: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['Free', Validators.required],
      allday: [false],
      webpage: [''],
      categories: [[], Validators.required]
    });

    this.route.params.subscribe(params => {
      const eventId = +params['id'];
      this.loadEvent(eventId);
    });

    this.loadAllCategories();
  }

  loadEvent(eventId: number) {
    this.dataService.getEventByID(eventId).subscribe(event => {
      // Populate the form controls with event data
      this.eventForm.patchValue(event);
  
      // Set selected category IDs
      const selectedCategoryIds = event.categories.map(category => category.id);
      this.eventForm.get('categories')?.patchValue(selectedCategoryIds);
  
      // Set the start date and time in the form
      const startDate = new Date(event.start);
      const startTime = this.getTimeString(startDate);
      this.eventForm.get('startDate')?.setValue(startDate);
      this.eventForm.get('startTime')?.setValue(startTime);
  
      // Set the end date and time in the form
      const endDate = new Date(event.end);
      const endTime = this.getTimeString(endDate);
      this.eventForm.get('endDate')?.setValue(endDate);
      this.eventForm.get('endTime')?.setValue(endTime);
    });}
  
  
  private getTimeString(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

  updateEvent() {
    if (this.eventForm.valid) {
      const updatedEvent: Event = this.eventForm.value;

      this.dataService.updateEvent(updatedEvent.id, updatedEvent).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }

  private formatDateTime(date: Date, time: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const [rawHours, minutes, period] = time.split(/:| /);
    const hours = parseInt(rawHours) + (period === 'PM' ? 12 : 0);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}`;
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const isAllDay = this.eventForm.value.allday;
      const startDate = this.eventForm.value.startDate;
      const endDate = this.eventForm.value.endDate;
  
      let startDateTime: string;
      let endDateTime: string;
  
      if (isAllDay) {
        // For all-day events, set start time to 00:00 and end time to 23:59
        startDateTime = this.formatDateTime(startDate, '00:00');
        endDateTime = this.formatDateTime(endDate, '23:59');
      } else {
        startDateTime = this.formatDateTime(startDate, this.eventForm.value.startTime);
        endDateTime = this.formatDateTime(endDate, this.eventForm.value.endTime);
      }
  
      console.log('startDateTime:', startDateTime);
      console.log('endDateTime:', endDateTime);
  
      const updatedEvent: Event = {
        ...this.eventForm.value,
        start: startDateTime,
        end: endDateTime,
        categories: this.eventForm.value.categories.map((categoryId: number) => ({ id: categoryId })),
      };
  
      console.log('updatedEvent:', updatedEvent);
  
      this.dataService.updateEvent(updatedEvent.id, updatedEvent).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
  
  
}
