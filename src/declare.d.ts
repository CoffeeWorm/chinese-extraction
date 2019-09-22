export interface file {
  path: string;
  numbers: number;
  chinese: string[];
}

export interface files {
  [key: string]: file;
}
