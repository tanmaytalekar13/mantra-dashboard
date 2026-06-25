export interface PBLRecord {
  // Identity
  "What is the name of your school?"?: string;
  "What is your school's synthetic school code?"?: string;
  "What is the name of your district?"?: string;
  "Block Details"?: string;

  // Participation & Evidence
  "Did your school participate in PBL this month?"?: string;
  "Was evidence submitted this month?"?: string;

  // Grades & Subjects
  "Which grades participated?"?: string;
  "Which subjects were covered?"?: string;

  // Derived numeric fields
  "Derived: Total enrollment across Classes 6-8"?: string | number;
  "Derived: Total attendance across PBL Science and Math sessions"?: string | number;
  "Derived: Overall PBL attendance rate"?: string | number;
  "Derived: Risk status"?: string;

  // Injected by loader
  month?: string;

  // Catch-all for any other CSV columns
  [key: string]: string | number | undefined;
}