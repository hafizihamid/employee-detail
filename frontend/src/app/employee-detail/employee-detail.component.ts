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
  editEmployeeForm: FormGroup;
  isSubmitted = false;
  employeeInput = false;
  employeeInputEdit = false;
  employeesEdit: any;
  editForm: number;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.createEmployeeForm();
    this.employeeFormEdit();
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

  employeeFormEdit() {
    this.editEmployeeForm = this.formBuilder.group({
      first_name_edit: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
        ],
      ],
      last_name_edit: ['', [Validators.required]],
      email_edit: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      phone_no_edit: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      join_date_edit: ['', [Validators.required]],
      job_title_edit: ['', [Validators.required]],
      manager_id_edit: ['', [Validators.required]],
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
      .subscribe((response) => {
        this.getList();
        this.employeeInput = !this.employeeInput;
      });
  }

  editEmployee(id) {
    this.editForm = id;
    this.employeeInputEdit = !this.employeeInputEdit;
    this.employeeService.getEmployeeDetail(id).subscribe((response) => {
      this.employeesEdit = response.data;
      this.editEmployeeForm.patchValue({
        first_name_edit: this.employeesEdit.first_name,
        last_name_edit: this.employeesEdit.last_name,
        email_edit: this.employeesEdit.email,
        phone_no_edit: this.employeesEdit.phone_no,
        join_date_edit: this.employeesEdit.join_date,
        job_title_edit: this.employeesEdit.job_title,
        manager_id_edit: this.employeesEdit.manager_id,
      });
    });
  }

  get first_name_edit(): FormControl {
    return this.editEmployeeForm.get('first_name_edit') as FormControl;
  }

  get last_name_edit(): FormControl {
    return this.editEmployeeForm.get('last_name_edit') as FormControl;
  }

  get email_edit(): FormControl {
    return this.editEmployeeForm.get('email_edit') as FormControl;
  }

  get phone_no_edit(): FormControl {
    return this.editEmployeeForm.get('phone_no_edit') as FormControl;
  }

  get join_date_edit(): FormControl {
    return this.editEmployeeForm.get('join_date_edit') as FormControl;
  }

  get job_title_edit(): FormControl {
    return this.editEmployeeForm.get('job_title_edit') as FormControl;
  }

  get manager_id_edit(): FormControl {
    return this.editEmployeeForm.get('manager_id_edit') as FormControl;
  }

  onSubmitEdit() {
    const data = {
      first_name: this.editEmployeeForm.value.first_name_edit,
      last_name: this.editEmployeeForm.value.last_name_edit,
      email: this.editEmployeeForm.value.email_edit,
      phone_no: this.editEmployeeForm.value.phone_no_edit,
      join_date: this.editEmployeeForm.value.join_date_edit,
      job_title: this.editEmployeeForm.value.job_title_edit,
      manager_id: this.editEmployeeForm.value.manager_id_edit,
    };

    this.employeeService
      .updateEmployee(this.editForm, data)
      .subscribe((response) => {
        this.getList();
        this.employeeInputEdit = !this.employeeInputEdit;
      });
  }
}
