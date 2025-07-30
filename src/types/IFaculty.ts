export interface IDepartment {
  id: number;
  name: string;
  abbrev: string;
  code: string;
  faculty_id: string;
  created_at: string;
  updated_at: string;
}

export interface IFaculty {
  id: number;
  name: string;
  abbrev: string;
  created_at: string;
  updated_at: string;
  departments: IDepartment[];
}
