import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RefreshIcon from '@material-ui/icons/Refresh';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


import './Game.css';


const useStyles = makeStyles({
    root: {
        width: 300,
    },
});
const Game = () => {
    return (
        <div className="game">
            <Typography variant="headline" className="Header" align="center">Tic Tac Toe</Typography>

            <Board />
        </div>
    );
};

const Board = () => {
    const initialSquars = [
        null, null, null,
        null, null, null,
        null, null, null,
    ]
    // const initialSquars = Array(9).fill(null);
    const [squars, setSquars] = useState(initialSquars);
    const [showsquars, setshowSquars] = useState(initialSquars);

    const [X, setX] = useState(true);

    const handleClickEvent = (i) => {
        const newSquare = [...squars];
        const newshowsquars = [...showsquars];

        const winnerDeclared = Boolean(calculateWinner(newSquare));
        const squareFilled = Boolean(newSquare[i]);
        if (winnerDeclared || squareFilled) {
            return;
        }
        newshowsquars[i] = X ? <CloseIcon style={{ fontSize: 100 }} color="primary" /> :
            <PanoramaFishEyeIcon style={{ fontSize: 80 }} color="secondary" />;
        newSquare[i] = X ? 'X' : 'O';

        setSquars(newSquare);
        setshowSquars(newshowsquars);
        setX(!X);
    }
    const renderSquare = (i) => {
        return (
            <Square value={showsquars[i]}
                onClickEvent={() => { handleClickEvent(i) }}
            />
        );
    }
    const winner = calculateWinner(squars);
    const End = isEnd(squars);
    let status;
    if (winner) {
         status = `Winner : ${winner}`;
    } else if (End) {
         status = 'Draw';
    } else {
         status = `Next player : ${X ? 'X' : 'O'}` ;
    }
    return (
        <div className="board" >
            <div className="status" >{status}</div>
            <div className="navigation">
                <SimpleBottomNavigation />
            </div>
            <Grid container>
                <Grid item xs={12} >
                    <div className="board-row">
                        {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

const Square = (props) => {
    return (
        <Button
            className="square"
            onClick={props.onClickEvent}>
            {props.value}
        </Button>

    )
}

function calculateWinner(squars) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
        const [a, b, c] = line;
        if (squars[a] && squars[a] === squars[b] && squars[b] === squars[c]) {
            return squars[a];
        }
    }
    return null;
}
function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <a href="Game.js" >Restart<BottomNavigationAction label="Restart" icon={<RefreshIcon style={{ fontSize: 30 }} />} /></a>
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Help<BottomNavigationAction label="Favorites" icon={<HelpOutlineIcon style={{ fontSize: 30 }} />} /></a>
        </BottomNavigation>
    );
}
function isEnd(squars) {
    return squars.filter(x => x === null).length === 0;
}
export default Game;
