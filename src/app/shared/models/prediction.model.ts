export interface PredictionRequest {
  sentence1?: string;
  sentence2?: string;
}

export interface PredictionResult {
  correctnessPercentage?: number;
}
