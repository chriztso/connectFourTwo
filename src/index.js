import React from 'react'
import ReactDOM from 'react-dom'
import { throwStatement } from '@babel/types';

class Square extends React.Component{
    constructor(props){
        super(props); 
    } 
    render(){
        const {handleClick, x, value} = this.props;
        const styleOne = {width: '30px', height: '30px', backgroundColor : value === null ? 'white' : (value === 1 ? 'black': 'red'), position: 'relative', 'left': '10px', 'top': '10px', border: '1px solid black', borderRadius: '50%'}
        return (
            <div style={{width: '50px', height: '50px', backgroundColor : 'yellow'}}>
                <div style ={styleOne} onClick={() => {handleClick(x)}}>

                </div>

            </div>
        )
    }
}

class Board extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            board: [[null, null, null, null, null, null, null], 
                     [null, null, null, null, null, null, null], 
                     [null, null, null, null, null, null, null], 
                     [null, null, null, null, null, null, null], 
                     [null, null, null, null, null, null, null], 
                     [null, null, null, null, null, null, null], 
                   ], 
            player: 1,
            winnerColor: null
        }
        this.handleClick = this.handleClick.bind(this)
        this.checkRows = this.checkRows.bind(this)
        this.checkColumns = this.checkColumns.bind(this)
        this.restartGame = this.restartGame.bind(this)
    }
    handleClick(column){
        const {board, player} = this.state; 
        for(var i = board.length-1; i >= 0; i--){
            if(board[i][column] === null){
                board[i][column] = player; 
                break;
            }
        }
        this.setState({board: board})
        var numOne = this.checkRows(board)
        var numTwo = this.checkColumns(board);
        if(numOne ){
            this.setState({winnerColor: numOne})
            return;
        }
        if(numTwo){
            this.setState({winnerColor: numTwo})
            return;
        }
        this.setState({player: this.state.player === 1 ? 2 : 1})
    }
    checkRows(){
        const {board} = this.state;
        for(var i = board.length-1; i >= 0; i--){
            var counter = 1; 
            for(var j = 0; j < board[i].length-1; j++){
                if(board[i][j] !== null && board[i][j] === board[i][j+1]){
                    counter++;
                    if(counter === 4){
                        return board[i][j];
                    }
                } else{
                    counter = 1
                }
            }
        }
        return false;
    }
    checkColumns(){
        const {board} = this.state;
        for(var i = 0; i < board[0].length; i++){
            var counter = 1; 
            for(var j = 5; j >= 0; j--){
                if(board[j][i] !== null && board[j][i] === board[j-1][i]){
                    counter++;
                    if(counter === 4){
                        return board[j][i];
                    }
                } else{
                    counter = 1
                }
            }
        }
        return false;
    }
    restartGame(){
        this.setState({board: [[null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null], 
            [null, null, null, null, null, null, null], 
          ]})
    }
    render(){
        const {board, player, winnerColor} = this.state
        const winner = this.checkRows(board);
        const winnerTwo =  this.checkColumns(board) 
        const winnerColorText = winnerColor === 1 ? 'black': 'red'
        let status;
        if(winner || winnerTwo){
            status = `WINNER!!!! ${winnerColorText}`
        } else{
            status = `NEXT PLAYER ${player}`
        }
        return (
            <div>
              {status} {(winner || winnerTwo) && <button onClick={this.restartGame}>Restart</button>}
              <div style={{flexDirection: 'row', display: 'flex'}}>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][0]} x={0} handleClick={this.handleClick}/>
                      <Square value={board[1][0]} x={0} handleClick={this.handleClick}/>
                      <Square value={board[2][0]} x={0} handleClick={this.handleClick}/>
                      <Square value={board[3][0]} x={0} handleClick={this.handleClick}/>
                      <Square value={board[4][0]} x={0} handleClick={this.handleClick}/>
                      <Square value={board[5][0]} x={0} handleClick={this.handleClick}/>
                  </div>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][1]} x={1} handleClick={this.handleClick}/>
                      <Square value={board[1][1]} x={1} handleClick={this.handleClick}/>
                      <Square value={board[2][1]} x={1} handleClick={this.handleClick}/>
                      <Square value={board[3][1]} x={1} handleClick={this.handleClick}/>
                      <Square value={board[4][1]} x={1} handleClick={this.handleClick}/>
                      <Square value={board[5][1]} x={1} handleClick={this.handleClick}/>
                  </div>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][2]} x={2} handleClick={this.handleClick}/>
                      <Square value={board[1][2]} x={2} handleClick={this.handleClick}/>
                      <Square value={board[2][2]} x={2} handleClick={this.handleClick}/>
                      <Square value={board[3][2]} x={2} handleClick={this.handleClick}/>
                      <Square value={board[4][2]} x={2} handleClick={this.handleClick}/>
                      <Square value={board[5][2]} x={2} handleClick={this.handleClick}/>
                  </div>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][3]} x={3} handleClick={this.handleClick}/>
                      <Square value={board[1][3]} x={3} handleClick={this.handleClick}/>
                      <Square value={board[2][3]} x={3} handleClick={this.handleClick}/>
                      <Square value={board[3][3]} x={3} handleClick={this.handleClick}/>
                      <Square value={board[4][3]} x={3} handleClick={this.handleClick}/>
                      <Square value={board[5][3]} x={3} handleClick={this.handleClick}/>
                  </div>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][4]} x={4} handleClick={this.handleClick}/>
                      <Square value={board[1][4]} x={4} handleClick={this.handleClick}/>
                      <Square value={board[2][4]} x={4} handleClick={this.handleClick}/>
                      <Square value={board[3][4]} x={4} handleClick={this.handleClick}/>
                      <Square value={board[4][4]} x={4} handleClick={this.handleClick}/>
                      <Square value={board[5][4]} x={4} handleClick={this.handleClick}/>
                  </div>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][5]} x={5} handleClick={this.handleClick}/>
                      <Square value={board[1][5]} x={5} handleClick={this.handleClick}/>
                      <Square value={board[2][5]} x={5} handleClick={this.handleClick}/>
                      <Square value={board[3][5]} x={5} handleClick={this.handleClick}/>
                      <Square value={board[4][5]} x={5} handleClick={this.handleClick}/>
                      <Square value={board[5][5]} x={5} handleClick={this.handleClick}/>
                  </div>
                  <div style={{flexDirection: 'column', display: 'flex'}}>
                      <Square value={board[0][6]} x={6} handleClick={this.handleClick}/>
                      <Square value={board[1][6]} x={6} handleClick={this.handleClick}/>
                      <Square value={board[2][6]} x={6} handleClick={this.handleClick}/>
                      <Square value={board[3][6]} x={6} handleClick={this.handleClick}/>
                      <Square value={board[4][6]} x={6} handleClick={this.handleClick}/>
                      <Square value={board[5][6]} x={6} handleClick={this.handleClick}/>
                  </div>
              </div>
            </div>
        )
    }
}


ReactDOM.render(<Board />, document.getElementById('root'))