export interface Task {
  // until we've saved the task in the api server it won't have an id so ,this question mark after the id helps to prevent errors for the frontend.
  id?: number;
  text: string;
  remainder: boolean;
  day: string;
}
