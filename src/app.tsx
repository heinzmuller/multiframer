import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { debounce } from 'lodash'

const styles = {
    wrapper: {
        height: '100%',
        display: 'flex',
        flex: '1 1 auto',
    },
    frame: {
        flex: '1 1 auto',
        position: 'relative',
        border: 'solid 2px #222',
    },
    navigator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: '#222',
        zIndex: 2,
        padding: 10,
        display: 'flex',
    },
    iframe: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 47px)',
        marginTop: 47
    },
    input: {
        border: 'solid 2px #444',
        borderRadius: 3,
        background: 'transparent',
        flex: '1',
        marginRight: 10,
        padding: '5px 10px',
        color: '#aaa',
        outline: 'none',
    },
    button: {
        border: 'solid 2px #444',
        borderRadius: 3,
        background: 'transparent',
        color: '#aaa',
        width: 30,
        cursor: 'pointer',
    }
}

class App extends React.Component<any, any> {
    state = {
        frames: [
            "http://localhost:9001/iframe.html?selectedKind=%5BMagazine%5D%20List&selectedStory=Default"
        ]
    }

    constructor() {
        super()

        this._setFrames = debounce(this._setFrames, 1000)
    }

    _setFrames = (frames: any) => {
        this.setState({ frames })
    }

    _handleOnChange = (e: any) => {
        const {
            dataset: {
                frame
            },
            value
         } = e.target

         const frames = [...this.state.frames]

         frames[frame] = value

         this._setFrames(frames)
    }

    _addFrame = () => {
        const frames = [...this.state.frames]
        frames.push(frames[0])
        this.setState({ frames })
    }

    render() {
        const { frames } = this.state

        return (
            <div style={styles.wrapper}>
                {frames.map((frame, index) => (
                    <div key={index} style={styles.frame}>
                        <div style={styles.navigator}>
                            <input
                                data-frame={index}
                                defaultValue={frame}
                                type="text"
                                style={styles.input}
                                onChange={this._handleOnChange}
                            />
                            <button onClick={this._addFrame} style={styles.button}>+</button>
                        </div>
                        <iframe
                            frameBorder={0}
                            src={frame}
                            style={styles.iframe}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
