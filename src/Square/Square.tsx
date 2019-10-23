import * as React from 'react';
import { ISquareState } from './ISquareState';
import { ISquareProps } from './ISquareProps';

class Square extends React.Component<ISquareProps, ISquareState> {
    public render(): JSX.Element {
        return (
            <div>
                <button onClick={() => this.props.onClick(this.props.index)} className="square">
                    {this.props.value}
                </button>
            </div>


        );
    }
}

export default Square;
