import type { Chara, Pose } from "./types";

interface Point {
  x: number;
  y: number;
}

// Units: The full image is 200x200
const TORSO_MIN_HEIGHT = 50;
const TORSO_MAX_HEIGHT = 80;

const SHOULDER_MIN_WIDTH = 20;
const SHOULDER_MAX_WIDTH = 55;

const HIP_MIN_WIDTH = 20;
const HIP_MAX_WIDTH = 55;

const SKINNY_HIPMOD = -2;
const FAT_HIPMOD = 5;
const SKINNY_SHOULDERMOD = -2;
const FAT_SHOULDERMOD = 1;
const BELLY_PEAK_UP = 20; // Location of belly peak, up from hip, in percent
const BELLY_END = 40; // end of belly, up from hip, in percent
const SKINNY_BELLYIN = 5;
const FAT_BELLYOUT = 15;


const LEG_MIN_LENGTH = 40;
const LEG_MAX_LENGTH = 60;
const LEG_IN = 10; // In from hip to leg attachment, in percent

const ARM_MIN_LENGTH = 30;
const ARM_MAX_LENGTH = 50;
const ARM_DROP = 15; // Drop from shoulder to arm attachment, in percent
const SHOULDER_IN = 30; // Percent of top of torso that is rounded for each shoulder

const FRAME_MARGIN = 5;

function lerpScalar(percent: number, min: number, max: number): number {
  return (max - min) * (percent / 100) + min;
}

function lerpPoint(percent: number, min: Point, max: Point): Point {
  return {
    x: lerpScalar(percent, min.x, max.x),
    y: lerpScalar(percent, min.y, max.y),
  };
}

function polarToPoint(origin: Point, angle: number, distance: number): Point {
  return {
    x: origin.x + Math.cos(degToRad(angle)) * distance,
    y: origin.y - Math.sin(degToRad(angle)) * distance, // SVG y is inverted from math y
  };
}

function getAngle(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.atan2(dy, dx);
}

function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

export interface CharaDrawPoints {
  leftShoulderPeak: Point;
  rightShoulderPeak: Point;
  leftHip: Point;
  rightHip: Point;
  leftArmAttachment: Point; // is also shoulder start
  rightArmAttachment: Point; // is also shoulder start
  leftLegAttachment: Point;
  rightLegAttachment: Point;
  leftShoulderEnd: Point;
  rightShoulderEnd: Point;
  leftElbow: Point;
  rightElbow: Point;
  leftHand: Point;
  rightHand: Point;
  leftKnee: Point;
  rightKnee: Point;
  leftFoot: Point;
  rightFoot: Point;
  headMidpoint: Point;
}
export function getDrawPoints(chara: Chara, pose: Pose): CharaDrawPoints {
  const torsoHeight = lerpScalar(chara.torsoHeight, TORSO_MIN_HEIGHT, TORSO_MAX_HEIGHT);
  const hipY = torsoHeight / 2;

  const shoulderWidth = lerpScalar(chara.shoulderWidth, SHOULDER_MIN_WIDTH, SHOULDER_MAX_WIDTH);
  let rightShoulderX = shoulderWidth / 2;

  const hipWidth = lerpScalar(chara.hipWidth, HIP_MIN_WIDTH, HIP_MAX_WIDTH);
  let rightHipX = hipWidth / 2;

  if (chara.fatness < 50) {
    const skinnyness = ((50 - chara.fatness) / 50) * 100;
    rightShoulderX = lerpScalar(skinnyness, rightShoulderX, rightShoulderX + SKINNY_SHOULDERMOD);
    rightHipX = lerpScalar(skinnyness, rightHipX, rightHipX + SKINNY_HIPMOD);
  } else if (chara.fatness > 50) {
    const fatness = ((chara.fatness - 50) / 50) * 100;
    rightShoulderX = lerpScalar(fatness, rightShoulderX, rightShoulderX + FAT_SHOULDERMOD);
    rightHipX = lerpScalar(fatness, rightHipX, rightHipX + FAT_HIPMOD);
  }

  const leftShoulderPeak = { x: -rightShoulderX, y: -hipY };
  const rightShoulderPeak = { x: rightShoulderX, y: -hipY };
  const leftHip = { x: -rightHipX, y: hipY };
  const rightHip = { x: rightHipX, y: hipY };
  const leftArmAttachment = lerpPoint(ARM_DROP, leftShoulderPeak, leftHip);
  const rightArmAttachment = lerpPoint(ARM_DROP, rightShoulderPeak, rightHip);
  const leftLegAttachment = lerpPoint(LEG_IN, leftHip, rightHip);
  const rightLegAttachment = lerpPoint(LEG_IN, rightHip, leftHip);
  const leftShoulderEnd = lerpPoint(SHOULDER_IN, leftShoulderPeak, rightShoulderPeak);
  const rightShoulderEnd = lerpPoint(SHOULDER_IN, rightShoulderPeak, leftShoulderPeak);

  const armLength = lerpScalar(chara.armLength, ARM_MIN_LENGTH, ARM_MAX_LENGTH);
  const humerusLength = armLength / 2;
  const forearmLength = armLength - humerusLength;
  const leftElbow = polarToPoint(leftArmAttachment, 245, humerusLength);
  const rightElbow = polarToPoint(rightArmAttachment, 295, humerusLength);
  const leftHand = polarToPoint(leftElbow, 235, forearmLength);
  const rightHand = polarToPoint(rightElbow, 305, forearmLength);

  const legLength = lerpScalar(chara.legLength, LEG_MIN_LENGTH, LEG_MAX_LENGTH);
  const thighLength = legLength / 2;
  const calfLength = legLength - thighLength;
  const leftKnee = polarToPoint(leftLegAttachment, 245, thighLength);
  const rightKnee = polarToPoint(rightLegAttachment, 295, thighLength);
  const leftFoot = polarToPoint(leftKnee, 255, calfLength);
  const rightFoot = polarToPoint(rightKnee, 285, calfLength);

  const headMidpoint = {
    x: 0,
    y: rightShoulderPeak.y - 10,
  }

  const points = {
    leftShoulderPeak,
    rightShoulderPeak,
    leftHip,
    rightHip,
    leftArmAttachment,
    rightArmAttachment,
    leftLegAttachment,
    rightLegAttachment,
    leftShoulderEnd,
    rightShoulderEnd,
    leftElbow,
    rightElbow,
    leftHand,
    rightHand,
    leftKnee,
    rightKnee,
    leftFoot,
    rightFoot,
    headMidpoint,
  };

  // TODO: Consider other points
  const lowestY = Math.max(leftFoot.y, rightFoot.y);
  const lowerAmount = 100 - (lowestY + FRAME_MARGIN);

  for (const point of Object.values(points)) {
    point.y += lowerAmount;
  }

  return points;
}



// // This calculation allows angleMagnitude to be any number;
// // the resulting angle will be between -90 and 90 degrees
// function calculateLegAngle(angleMagnitude: number): number {
//   const sign = angleMagnitude < 0 ? -1 : 1;
//   angleMagnitude = Math.abs(angleMagnitude);
//   return (angleMagnitude / (angleMagnitude + 100)) * 90 * sign;
// }

// export function getLegs(chara: Chara, pose: Pose, legAttachment: Point): Legs {
//   let legAngleMagnitude = 10;

//   const foot: Point = {
//     x: legAttachment.x + 5,
//     y: legAttachment.y + 10,
//   }

//   const rightLeg = (
//     <path
//       d={`M ${legAttachment.x} ${legAttachment.y} L ${foot.x} ${foot.y}`}
//       strokeWidth={5}
//     />
//   )

//   const leftLeg = (
//     <path
//       d={`M ${-legAttachment.x} ${legAttachment.y} L ${-foot.x} ${foot.y}`}
//       strokeWidth={5}
//     />
//   )

//   return { leftLeg, rightLeg };
// }