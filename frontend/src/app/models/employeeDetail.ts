export interface EmployeeDetail {
  status_code: string;
  data: Employee[];
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  join_date: string;
  job_title: string;
  manager_id: number;
  created_at: Date;
  updated_at: Date;
}
