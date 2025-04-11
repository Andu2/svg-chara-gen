import { SvgChara } from './svg-chara/SvgChara'
import { CharaControls } from './CharaControls'
import { CharaStateType, useCharaState } from './charaState'
import { useState } from 'react';

interface SideControlsProps {
  charaState: CharaStateType;
  pose: number;
  setPose: (pose: number) => void;
}
function SideControls({ charaState, pose, setPose }: SideControlsProps) {
  return (
    <>
      <div className="row side-input-row">
        <label>Pose</label>
        <select value={pose} onChange={(e) => setPose(Number(e.currentTarget.value))}>
          <option value="0">Pose 1</option>
        </select>
      </div>
      <div className="row side-input-row">
        <button onClick={() => charaState.reset()}>Reset</button>
        <button onClick={() => charaState.randomize()}>Randomize</button>
      </div>
    </>
  )
}

function App() {
  const charaState = useCharaState()
  const [pose, setPose] = useState(0)

  return (
    <>
      <div id="desktop">
        <div className="card">
          <div className="row" id="toprow">
            <div className="column svgchara charalarge">
              <SvgChara chara={charaState.chara} pose={pose} />
            </div>
            <div className="column">
              <div className="row svgchara charasmall">
                <SvgChara chara={charaState.chara} pose={pose} />
              </div>
              <SideControls charaState={charaState} pose={pose} setPose={setPose} />
            </div>
          </div>
          <CharaControls charaState={charaState} />
        </div>
      </div>
      <div id="mobile">
        <div id="topscreen">
          <div className="svgchara" id="charamobile">
            <SvgChara chara={charaState.chara} pose={pose} />
          </div>
        </div>
        <div id="bottomscreen">
          <SideControls charaState={charaState} pose={pose} setPose={setPose} />
          <CharaControls charaState={charaState} />
        </div>
      </div>
    </>
  )
}

export default App
