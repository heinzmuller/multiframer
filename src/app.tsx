import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { debounce } from 'lodash'

interface IProps {
    url: string;
}

interface IState {
    frames: string[][];
    settings: boolean;
    spacing: number;
}

class App extends React.Component<IProps, IState> {
    state = {
        frames: [
            [this.props.url]
        ],
        spacing: 2,
        settings: false
    }

    constructor(props: IProps) {
        super(props)

        this._setFrames = debounce(this._setFrames, 1000)
    }

    private _setFrames = (frames: string[][]) => {
        this.setState({ frames })
    }

    private _handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {
            dataset: {
                frame,
                row,
            },
            value
         } = e.currentTarget

         const frames = [...this.state.frames]

         if(row && frame) {
            frames[row][frame] = value
            this._setFrames(frames)
         }
    }

    private _setFrameLayout = (e: React.FormEvent<HTMLButtonElement>) => {
        const { url } = this.props
        const { layout } = e.currentTarget.dataset

        switch(layout) {
            case "6":
                return this.setState({ frames: [[url, url, url],[url, url, url]] })

            case "4":
                return this.setState({ frames: [[url, url],[url, url]] })

            case "3":
                return this.setState({ frames: [[url, url, url]] })

            case "2":
                return this.setState({ frames: [[url, url]] })

            case "1":
            default:
                return this.setState({ frames: [[url]] })
        }
    }

    public render(): JSX.Element {
        const {
            frames,
            settings,
            spacing,
        } = this.state

        return (
            <div className="wrapper">
                <style>{`
                    :root {
                        --spacing: ${spacing}px
                    }
                `}</style>
                {settings && (
                    <div id="settings" onClick={e => e.target === e.currentTarget && this.setState({ settings: false })}>
                        <div id="settings-content">
                            <h2>Layouts</h2>
                            <ul>
                                <li>
                                    <button data-layout="1" onClick={this._setFrameLayout}>
                                        <svg width="22px" height="22px" viewBox="0 0 22 22">
                                            <rect id="1-frame" fill="#000000" x="0" y="0" width="22" height="22" rx="2"></rect>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button data-layout="2" onClick={this._setFrameLayout}>
                                        <svg width="22px" height="22px" viewBox="0 0 22 22">
                                            <g id="2-frames" fill="#000000">
                                                <rect id="Rectangle-2" x="0" y="0" width="10" height="22" rx="2"></rect>
                                                <rect id="Rectangle-2" x="12" y="0" width="10" height="22" rx="2"></rect>
                                            </g>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button data-layout="3" onClick={this._setFrameLayout}>
                                        <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
                                            <g id="3-frames" fill="#000000">
                                                <rect id="Rectangle-2" x="0" y="0" width="6" height="22" rx="2"></rect>
                                                <rect id="Rectangle-2" x="8" y="0" width="6" height="22" rx="2"></rect>
                                                <rect id="Rectangle-2" x="16" y="0" width="6" height="22" rx="2"></rect>
                                            </g>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button data-layout="4" onClick={this._setFrameLayout}>
                                        <svg width="22px" height="22px" viewBox="0 0 22 22">
                                            <g id="4-frames" fill="#000000">
                                                <rect id="Rectangle-2" x="0" y="0" width="10" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="12" y="0" width="10" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="0" y="12" width="10" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="12" y="12" width="10" height="10" rx="2"></rect>
                                            </g>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button data-layout="6" onClick={this._setFrameLayout}>
                                        <svg width="22px" height="22px" viewBox="0 0 22 22">
                                            <g id="6-frames" fill="#000000">
                                                <rect id="Rectangle-2" x="0" y="0" width="6" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="8" y="0" width="6" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="16" y="0" width="6" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="0" y="12" width="6" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="8" y="12" width="6" height="10" rx="2"></rect>
                                                <rect id="Rectangle-2" x="16" y="12" width="6" height="10" rx="2"></rect>
                                            </g>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                            <h2>Spacing</h2>
                            <input type="number" value={spacing} onChange={(e) => this.setState({ spacing: parseInt(e.target.value) })} />
                            <button id="close-settings" onClick={() => this.setState({ settings: false })}>Close</button>
                        </div>
                    </div>
                )}
                {frames.map((rows, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {rows.map((frame, frameIndex) => (
                            <div className="frame" key={frameIndex}>
                                <div className="navigator">
                                    <input
                                        data-frame={frameIndex}
                                        data-row={rowIndex}
                                        defaultValue={frame}
                                        type="text"
                                        onChange={this._handleOnChange}
                                    />
                                    <button onClick={() => this.setState({ settings: true })}>
                                        <svg viewBox="0 0 64 64">
                                            <g>
                                                <circle cx="32" cy="32" r="4.167"/>
                                                <path d="M55.192,27.87l-5.825-1.092c-0.354-1.178-0.818-2.308-1.392-3.371l3.37-4.927c0.312-0.456,0.248-1.142-0.143-1.532   l-4.155-4.156c-0.391-0.391-1.076-0.454-1.532-0.143l-4.928,3.372c-1.094-0.59-2.259-1.063-3.473-1.42l-1.086-5.794   c-0.103-0.543-0.632-0.983-1.185-0.983h-5.877c-0.553,0-1.082,0.44-1.185,0.983l-1.097,5.851c-1.165,0.356-2.282,0.82-3.334,1.392   l-4.866-3.329c-0.456-0.312-1.142-0.248-1.532,0.143l-4.156,4.156c-0.391,0.391-0.454,1.076-0.143,1.532l3.35,4.896   c-0.564,1.052-1.021,2.168-1.371,3.331L8.808,27.87c-0.542,0.103-0.982,0.632-0.982,1.185v5.877c0,0.553,0.44,1.082,0.982,1.185   l5.82,1.091c0.355,1.188,0.823,2.328,1.401,3.399l-3.312,4.842c-0.312,0.456-0.248,1.142,0.143,1.532l4.155,4.156   c0.391,0.391,1.076,0.454,1.532,0.143l4.84-3.313c1.041,0.563,2.146,1.021,3.299,1.375l1.097,5.852   c0.103,0.542,0.632,0.982,1.185,0.982h5.877c0.553,0,1.082-0.44,1.185-0.982l1.086-5.796c1.201-0.354,2.354-0.821,3.438-1.401   l4.902,3.354c0.456,0.312,1.142,0.248,1.532-0.143l4.155-4.154c0.391-0.391,0.454-1.076,0.143-1.532l-3.335-4.874   c0.589-1.084,1.063-2.237,1.423-3.44l5.819-1.091c0.542-0.103,0.982-0.632,0.982-1.185v-5.877   C56.175,28.502,55.734,27.973,55.192,27.87z M32,42.085c-5.568,0-10.083-4.515-10.083-10.086c0-5.567,4.515-10.083,10.083-10.083   c5.57,0,10.086,4.516,10.086,10.083C42.086,37.57,37.569,42.085,32,42.085z"/>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                                <iframe frameBorder="0" src={frame} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

ReactDOM.render(
    <App url="https://svt.se/" />,
    document.getElementById('app')
)
