import { useState } from 'react';
import type { Chara } from './svg-chara/types';

export const MAX_HAT_TYPE = 0;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function constrainParameter(value: number) {
  return clamp(Math.round(value), 0, 100);
}

function constrainHatType(value: number) {
  return clamp(Math.round(value), 0, MAX_HAT_TYPE);
}

function constrainColor(value: string) {
  const color = value.replace(/[^0-9a-fA-F]/g, '');
  if (color.length === 6) {
    return `#${color}`;
  } else if (color.length === 3) {
    return `#${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
  } else {
    return '#000000';
  }
}

function randomParameter() {
  return Math.floor(Math.random() * 101);
}

function randomColor() {
  return `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0')}`;
}

function randomHatType() {
  return Math.floor(Math.random() * (MAX_HAT_TYPE + 1));
}

function defaultChara(): Chara {
  return {
    shoulderWidth: 50,
    hipWidth: 50,
    torsoHeight: 50,
    fatness: 50,
    bodyColor: '#909090',
    armLength: 50,
    legLength: 50,
    brainSize: 50,
    jawHeight: 50,
    jawWidth: 50,
    chinWidth: 50,
    hatType: 0,
    hatColor: '#909090',
    eyeColor: '#909090',
    eyeSpread: 50,
    eyeSize: 50,
    eyeRaise: 50,
    eyebrowSize: 50,
    eyebrowRaise: 50,
    mouthSize: 50,
    mouthRaise: 50,
    expressiveness: 50,
  }
}

function randomChara(): Chara {
  return {
    shoulderWidth: randomParameter(),
    hipWidth: randomParameter(),
    torsoHeight: randomParameter(),
    fatness: randomParameter(),
    bodyColor: randomColor(),
    armLength: randomParameter(),
    legLength: randomParameter(),
    brainSize: randomParameter(),
    jawHeight: randomParameter(),
    jawWidth: randomParameter(),
    chinWidth: randomParameter(),
    hatType: randomHatType(),
    hatColor: randomColor(),
    eyeColor: randomColor(),
    eyeSpread: randomParameter(),
    eyeSize: randomParameter(),
    eyeRaise: randomParameter(),
    eyebrowSize: randomParameter(),
    eyebrowRaise: randomParameter(),
    mouthSize: randomParameter(),
    mouthRaise: randomParameter(),
    expressiveness: randomParameter(),
  }
}

export function useCharaState() {
  const [chara, setChara] = useState(defaultChara())

  const setParameters = (chara: Chara) => {
    setChara((prev) => ({ ...prev, ...chara }));
  }
  const reset = () => {
    setChara(defaultChara());
  }
  const randomize = () => {
    setChara(randomChara());
  }

  const setShoulderWidth = (value: number) => {
    setChara((prev) => ({ ...prev, shoulderWidth: constrainParameter(value) }));
  }
  const setHipWidth = (value: number) => {
    setChara((prev) => ({ ...prev, hipWidth: constrainParameter(value) }));
  }
  const setTorsoHeight = (value: number) => {
    setChara((prev) => ({ ...prev, torsoHeight: constrainParameter(value) }));
  }
  const setFatness = (value: number) => {
    setChara((prev) => ({ ...prev, fatness: constrainParameter(value) }));
  }
  const setBodyColor = (value: string) => {
    setChara((prev) => ({ ...prev, bodyColor: constrainColor(value) }));
  }
  const setArmLength = (value: number) => {
    setChara((prev) => ({ ...prev, armLength: constrainParameter(value) }));
  }
  const setLegLength = (value: number) => {
    setChara((prev) => ({ ...prev, legLength: constrainParameter(value) }));
  }
  const setBrainSize = (value: number) => {
    setChara((prev) => ({ ...prev, brainSize: constrainParameter(value) }));
  }
  const setJawHeight = (value: number) => {
    setChara((prev) => ({ ...prev, jawHeight: constrainParameter(value) }));
  }
  const setJawWidth = (value: number) => {
    setChara((prev) => ({ ...prev, jawWidth: constrainParameter(value) }));
  }
  const setChinWidth = (value: number) => {
    setChara((prev) => ({ ...prev, chinWidth: constrainParameter(value) }));
  }
  const setHatType = (value: number) => {
    setChara((prev) => ({ ...prev, hatType: constrainHatType(value) }));
  }
  const setHatColor = (value: string) => {
    setChara((prev) => ({ ...prev, hatColor: constrainColor(value) }));
  }
  const setEyeColor = (value: string) => {
    setChara((prev) => ({ ...prev, eyeColor: constrainColor(value) }));
  }
  const setEyeSpread = (value: number) => {
    setChara((prev) => ({ ...prev, eyeSpread: constrainParameter(value) }));
  }
  const setEyeSize = (value: number) => {
    setChara((prev) => ({ ...prev, eyeSize: constrainParameter(value) }));
  }
  const setEyeRaise = (value: number) => {
    setChara((prev) => ({ ...prev, eyeRaise: constrainParameter(value) }));
  }
  const setEyebrowSize = (value: number) => {
    setChara((prev) => ({ ...prev, eyebrowSize: constrainParameter(value) }));
  }
  const setEyebrowRaise = (value: number) => {
    setChara((prev) => ({ ...prev, eyebrowRaise: constrainParameter(value) }));
  }
  const setMouthSize = (value: number) => {
    setChara((prev) => ({ ...prev, mouthSize: constrainParameter(value) }));
  }
  const setMouthRaise = (value: number) => {
    setChara((prev) => ({ ...prev, mouthRaise: constrainParameter(value) }));
  }
  const setExpressiveness = (value: number) => {
    setChara((prev) => ({ ...prev, expressiveness: constrainParameter(value) }));
  }

  return {
    chara,
    setParameters,
    reset,
    randomize,
    setShoulderWidth,
    setHipWidth,
    setTorsoHeight,
    setFatness,
    setBodyColor,
    setArmLength,
    setLegLength,
    setBrainSize,
    setJawHeight,
    setJawWidth,
    setChinWidth,
    setHatType,
    setHatColor,
    setEyeColor,
    setEyeSpread,
    setEyeSize,
    setEyeRaise,
    setEyebrowSize,
    setEyebrowRaise,
    setMouthSize,
    setMouthRaise,
    setExpressiveness,
  }
}

export type CharaStateType = ReturnType<typeof useCharaState>;
