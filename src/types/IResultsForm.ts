export interface IResultsForm {
  reg_number: string;
  session: string;
  semester: string;
  results: { course_code: string; score: number }[];
}
