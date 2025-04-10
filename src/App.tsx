import { SvgChara } from './svg-chara/SvgChara'
import { CharaControls } from './CharaControls'
import { CharaStateType, useCharaState } from './charaState'

interface SideControlsProps {
  charaState: CharaStateType;
}
function SideControls({ charaState }: SideControlsProps) {
  return (
    <>
      <div className="row side-input-row">
        <label>Pose</label>
        <select>
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

  return (
    <>
      <div id="desktop">
        <div className="card">
          <div className="row" id="toprow">
            <div className="column svgchara charalarge">
              <SvgChara chara={charaState.chara} />
            </div>
            <div className="column">
              <div className="row svgchara charasmall">
                <SvgChara chara={charaState.chara} />
              </div>
              <SideControls charaState={charaState} />
            </div>
          </div>
          <CharaControls charaState={charaState} />
        </div>
      </div>
      <div id="mobile">
        <div id="topscreen">
          <div className="svgchara" id="charamobile">
            <SvgChara chara={charaState.chara} />
          </div>
        </div>
        <div id="bottomscreen">
          <SideControls charaState={charaState} />
          <CharaControls charaState={charaState} />
        </div>
      </div>
    </>
  )
}

export default App
