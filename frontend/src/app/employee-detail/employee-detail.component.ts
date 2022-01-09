import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Employee } from '../models/employeeDetail';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employees: Employee[] = [];
  isModalActive: boolean = false;
  firstName: string;
  employeeId: number;
  employeeForm: FormGroup;
  isSubmitted = false;
  employeeInput = false;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.createEmployeeForm();
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.employeeService.getEmployees().subscribe((response) => {
      this.employees = response.data;
    });
  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
        ],
      ],
      last_name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phone_no: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      join_date: ['', [Validators.required]],
      job_title: ['', [Validators.required]],
      manager_id: ['', [Validators.required]],
    });
  }

  get first_name(): FormControl {
    return this.employeeForm.get('first_name') as FormControl;
  }

  get last_name(): FormControl {
    return this.employeeForm.get('last_name') as FormControl;
  }

  get email(): FormControl {
    return this.employeeForm.get('email') as FormControl;
  }

  get phone_no(): FormControl {
    return this.employeeForm.get('phone_no') as FormControl;
  }

  get join_date(): FormControl {
    return this.employeeForm.get('join_date') as FormControl;
  }

  get job_title(): FormControl {
    return this.employeeForm.get('job_title') as FormControl;
  }

  get manager_id(): FormControl {
    return this.employeeForm.get('manager_id') as FormControl;
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  deleteConfirmation(id: number, first_name: string) {
    this.employeeId = id;
    this.firstName = first_name;
    this.isModalActive = true;
  }

  delete() {
    this.employeeService
      .deleteEmployee(this.employeeId)
      .subscribe((response) => {
        this.isModalActive = false;
        this.getList();
      });
  }

  showEmployeeForm() {
    this.employeeInput = !this.employeeInput;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.employeeService
      .createEmployee(this.employeeForm.value)
      .subscribe((response) => {});
  }
}
