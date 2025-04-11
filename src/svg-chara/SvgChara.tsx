import { getDrawPoints } from './points';
import type { Chara, Pose } from './types';

interface SvgCharaProps {
  chara: Chara;
  pose: Pose;
}
export function SvgChara({ chara, pose }: SvgCharaProps) {
  const dp = getDrawPoints(chara, pose);

  // Path goes from bottom left around to bottom right and closes
  const bodyPathInstructions = [
    `M ${dp.leftHip.x} ${dp.leftHip.y}`,
    `L ${dp.leftArmAttachment.x} ${dp.leftArmAttachment.y}`,
    `Q ${dp.leftShoulderPeak.x} ${dp.leftShoulderPeak.y} ${dp.leftShoulderEnd.x} ${dp.leftShoulderEnd.y}`,
    `L ${dp.rightShoulderEnd.x} ${dp.rightShoulderEnd.y}`,
    `Q ${dp.rightShoulderPeak.x} ${dp.rightShoulderPeak.y} ${dp.rightArmAttachment.x} ${dp.rightArmAttachment.y}`,
    `L ${dp.rightHip.x} ${dp.rightHip.y}`,
    'Z',
  ]
  const bodyD = bodyPathInstructions.join(' ');

  const leftArmPathInstructions = [
    `M ${dp.leftArmAttachment.x} ${dp.leftArmAttachment.y}`,
    `L ${dp.leftElbow.x} ${dp.leftElbow.y}`,
    `L ${dp.leftHand.x} ${dp.leftHand.y}`,
  ]
  const leftArmD = leftArmPathInstructions.join(' ');
  const rightArmPathInstructions = [
    `M ${dp.rightArmAttachment.x} ${dp.rightArmAttachment.y}`,
    `L ${dp.rightElbow.x} ${dp.rightElbow.y}`,
    `L ${dp.rightHand.x} ${dp.rightHand.y}`,
  ]
  const rightArmD = rightArmPathInstructions.join(' ');

  const leftLegPathInstructions = [
    `M ${dp.leftLegAttachment.x} ${dp.leftLegAttachment.y}`,
    `L ${dp.leftKnee.x} ${dp.leftKnee.y}`,
    `L ${dp.leftFoot.x} ${dp.leftFoot.y}`,
  ]
  const leftLegD = leftLegPathInstructions.join(' ');
  const rightLegPathInstructions = [
    `M ${dp.rightLegAttachment.x} ${dp.rightLegAttachment.y}`,
    `L ${dp.rightKnee.x} ${dp.rightKnee.y}`,
    `L ${dp.rightFoot.x} ${dp.rightFoot.y}`,
  ]
  const rightLegD = rightLegPathInstructions.join(' ');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-100 -100 200 200"
      stroke="black"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <path d={leftLegD} />
      <path d={rightLegD} />
      <path d={leftArmD} />
      <path d={rightArmD} />
      <path d={bodyD} fill={chara.bodyColor} />
      <ellipse cx={dp.headMidpoint.x} cy={dp.headMidpoint.y} rx="15" ry="23" fill="#fff" />
    </svg>
  );
}