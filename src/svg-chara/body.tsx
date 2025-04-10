import { JSX } from "react";
import type { Point, Chara } from "./types";

interface Body {
  headAttachment: Point;
  armAttachment: Point;
  legAttachment: Point;
  element: JSX.Element
}

const TORSO_MIN_HEIGHT = 50;
const TORSO_MAX_HEIGHT = 80;

const SHOULDER_MIN_WIDTH = 25;
const SHOULDER_MAX_WIDTH = 50;

const HIP_MIN_WIDTH = 25;
const HIP_MAX_WIDTH = 50;

export function getBody(chara: Chara): Body {
  const torsoHeight = (TORSO_MAX_HEIGHT - TORSO_MIN_HEIGHT) * (chara.torsoHeight / 100) + TORSO_MIN_HEIGHT
  const yOffset = torsoHeight / 2;

  const shoulderWidth = (SHOULDER_MAX_WIDTH - SHOULDER_MIN_WIDTH) * (chara.shoulderWidth / 100) + SHOULDER_MIN_WIDTH;
  const shoulderXOffset = shoulderWidth / 2;

  const hipWidth = (HIP_MAX_WIDTH - HIP_MIN_WIDTH) * (chara.hipWidth / 100) + HIP_MIN_WIDTH;
  const hipXOffset = hipWidth / 2;

  const headAttachment = {
    x: 0,
    y: -yOffset,
  };

  const armAttachment = {
    x: -shoulderXOffset,
    y: -yOffset,
  };

  const legAttachment = {
    x: -hipXOffset,
    y: -torsoHeight,
  };

  // Path goes from bottom left around to bottom right and closes
  const pathInstructions = [
    `M ${-hipXOffset} ${yOffset}`,
    `L ${-shoulderXOffset} ${-yOffset}`,
    `L ${shoulderXOffset} ${-yOffset}`,
    `L ${hipXOffset} ${yOffset}`,
    'Z',
  ]
  const d = pathInstructions.join(' ');

  const element = (
    <path
      d={d}
      fill={chara.bodyColor}
    />
  );

  return {
    headAttachment,
    armAttachment,
    legAttachment,
    element,
  };
}
