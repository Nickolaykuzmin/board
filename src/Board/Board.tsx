import * as React from 'react';
import { IBoardState } from './IBoardState';
import { IBoardProps } from './IBoardProps';
import Square from '../Square/Square';
import styles from './Board.module.scss';

class Board extends React.Component<IBoardProps, IBoardState> {
    constructor(props: Readonly<IBoardProps>) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }

    renderSquare(i: number) {
        return <Square onClick={this.onHandleClick} value={this.state.squares[i]} index={i}/>
    }

    calculateWinner(squares: Array<string>) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    onHandleClick = (index: number) => {
        if (this.calculateWinner(this.state.squares)) {
            return;
        }

        const squares = this.state.squares.slice();
        if (squares[index]) {
          return
        }

        squares[index] = this.state.xIsNext ? 'X' : 'O';
        this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    };

    public render(): JSX.Element {
        let status;

        const winner = this.calculateWinner(this.state.squares);
        if (winner) {
            status = `Winner ${winner}`;
        } else {
            status = `Next player:  ${(this.state.xIsNext ? 'X' : 'O')}`;
        }

        return (
            <div className={`${styles.board}`}>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <button onClick={this.clearBoard}>Clear Board</button>
            </div>
        );
    }

    clearBoard = () => {
      this.setState({squares: Array(9).fill(null)})
    }
}

export default Board;
