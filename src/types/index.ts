export interface VideoItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  views: number;
  likes: number;
  comments: number;
  ctr: number; // Click-through rate %
  avgRetentionPct: number;
  duration: string;
  publishedAt: string;
  seoScore: number;
  status: 'optimized' | 'flagged' | 'monitoring';
  category: string;
}

export interface OptimizationResult {
  optimizedTitles: Array<{
    title: string;
    score: number;
    rationale: string;
  }>;
  recommendedDescription: string;
  recommendedTags: string[];
  recommendedCategory: string;
  thumbnailConcept: {
    visualDescription: string;
    overlayText: string;
    colorPalette: string;
  };
  seoScore: number;
  predictedMetrics: {
    ctrIncreaseEstimate: string;
    searchImpressionBoost: string;
    avgRetentionImpact: string;
  };
  temporalContext?: {
    location: string;
    currentTime: string;
    optimalUploadSchedule: string;
    timingAdvice: string;
  };
  agentFeedback: string;
}

export interface ChannelStats {
  channelName: string;
  channelHandle: string;
  subscriberCount: number;
  totalViews: number;
  totalVideos: number;
  avgCtr: number;
  avgRetention: number;
  weeklyGrowth: string;
}

export interface AutonomousDecision {
  step: number;
  agent: string;
  action: string;
  finding: string;
  confidence: number;
}
