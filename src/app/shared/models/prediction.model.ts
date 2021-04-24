export interface PredictionRequest {
  firstSentence?: string;
  secondSentence?: string;
}

export interface PredictionResult {
  correctnessPercentage?: number;
}
