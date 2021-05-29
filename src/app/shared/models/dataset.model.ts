export interface Dataset {
  id?: number;
  sentence1?: string;
  sentence2?: string;
  score?: number;
  isSimilar?: boolean;
  createdDate?: Date;
}
