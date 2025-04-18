export interface Chara {
  shoulderWidth: number;
  hipWidth: number;
  fatness: number;
  torsoHeight: number;
  bodyColor: string;
  armLength: number;
  legLength: number;
  brainSize: number;
  jawHeight: number;
  jawWidth: number;
  chinWidth: number;
  posture: number;
  hatType: number;
  hatColor: string;
  eyeColor: string;
  eyeSpread: number;
  eyeSize: number;
  eyeRaise: number;
  eyebrowSize: number;
  eyebrowRaise: number;
  mouthSize: number;
  mouthRaise: number;
  expressiveness: number;
}

export enum Pose {
  Neutral = 0,
}
