import type { CharaStateType } from './charaState';
import { MAX_HAT_TYPE } from './charaState';

interface ParameterInputProps {
  labelText: string;
  value: number;
  setter: (value: number) => void;
}
function ParameterInput({labelText, value, setter}: ParameterInputProps) {
  return (
    <div className="row input-row">
      <label>{labelText}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setter(Number(e.currentTarget.value))}
      />
    </div>
  )
}

interface ColorInputProps {
  labelText: string;
  value: string;
  setter: (value: string) => void;
}
function ColorInput({labelText, value, setter}: ColorInputProps) {
  return (
    <div className="row input-row">
      <label>{labelText}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => setter(e.currentTarget.value)}
      />
    </div>
  )
}

interface HatInputProps {
  labelText: string;
  value: number;
  setter: (value: number) => void;
}
function HatInput({labelText, value, setter}: HatInputProps) {
  return (
    <div className="row input-row">
      <label>{labelText}</label>
      <input
        type="number"
        min="0"
        max={MAX_HAT_TYPE}
        value={value}
        onChange={(e) => setter(Number(e.currentTarget.value))}
      />
    </div>
  )
}

interface CharaControlsProps {
  charaState: CharaStateType;
}
export function CharaControls({ charaState }: CharaControlsProps) {
  return (
    <div className="row" id="controls">
      <div className="column control-set">
        <div className="row">
          <h2 className="control-header">Body</h2>
        </div>
        <ParameterInput labelText="Shoulder width" value={charaState.chara.shoulderWidth} setter={charaState.setShoulderWidth} />
        <ParameterInput labelText="Hip width" value={charaState.chara.hipWidth} setter={charaState.setHipWidth} />
        <ParameterInput labelText="Fatness" value={charaState.chara.fatness} setter={charaState.setFatness} />
        <ParameterInput labelText="Torso height" value={charaState.chara.torsoHeight} setter={charaState.setTorsoHeight} />
        <ParameterInput labelText="Arm length" value={charaState.chara.armLength} setter={charaState.setArmLength} />
        <ParameterInput labelText="Leg length" value={charaState.chara.legLength} setter={charaState.setLegLength} />
        <ColorInput labelText="Body color" value={charaState.chara.bodyColor} setter={charaState.setBodyColor} />
      </div>
      <div className="column control-set">
        <div className="row">
          <h2 className="control-header">Head</h2>
        </div>
        <ParameterInput labelText="Brain size" value={charaState.chara.brainSize} setter={charaState.setBrainSize} />
        <ParameterInput labelText="Jaw height" value={charaState.chara.jawHeight} setter={charaState.setJawHeight} />
        <ParameterInput labelText="Jaw width" value={charaState.chara.jawWidth} setter={charaState.setJawWidth} />
        <ParameterInput labelText="Chin width" value={charaState.chara.chinWidth} setter={charaState.setChinWidth} />
        <ParameterInput labelText="Posture" value={charaState.chara.posture} setter={charaState.setPosture} />
        <HatInput labelText="Hat type" value={charaState.chara.hatType} setter={charaState.setHatType} />
        <ColorInput labelText="Hat color" value={charaState.chara.hatColor} setter={charaState.setHatColor} />
      </div>
      <div className="column control-set">
        <div className="row">
          <h2 className="control-header">Face</h2>
        </div>
        <ParameterInput labelText="Eye spread" value={charaState.chara.eyeSpread} setter={charaState.setEyeSpread} />
        <ParameterInput labelText="Eye size" value={charaState.chara.eyeSize} setter={charaState.setEyeSize} />
        <ParameterInput labelText="Eye raise" value={charaState.chara.eyeRaise} setter={charaState.setEyeRaise} />
        <ParameterInput labelText="Eyebrow size" value={charaState.chara.eyebrowSize} setter={charaState.setEyebrowSize} />
        <ParameterInput labelText="Eyebrow raise" value={charaState.chara.eyebrowRaise} setter={charaState.setEyebrowRaise} />
        <ParameterInput labelText="Mouth size" value={charaState.chara.mouthSize} setter={charaState.setMouthSize} />
        <ParameterInput labelText="Mouth raise" value={charaState.chara.mouthRaise} setter={charaState.setMouthRaise} />
        <ParameterInput labelText="Expressiveness" value={charaState.chara.expressiveness} setter={charaState.setExpressiveness} />
        <ColorInput labelText="Eye color" value={charaState.chara.eyeColor} setter={charaState.setEyeColor} />
      </div>
    </div>
  )
}