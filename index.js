const hexToRgb = (hex) => {

    let bigint = parseInt(hex.slice(1), 16);

    let r = (bigint >> 16) & 255;

    let g = (bigint >> 8) & 255;

    let b = bigint & 255;

    return `rgb(${r}, ${g}, ${b})`;

};

const blue = hexToRgb ('#BDE2F0');

const pink = hexToRgb ('#F8C4CC');

const header = document.getElementById('status');

const circles = document.getElementsByClassName('circle');

let started = false;

let player1 = false; 

let player2 = false;

function checkTie() {

    for (let i = 1; i <= 42; i++) {

        const circle = document.getElementById(String(i));

        if (circle.style.backgroundColor === '') {

            return false;

        }

    }

    return true;

}

function checkDirection (circle, direction, playerColor) {

    let circleID = Number(circle.id);

    let count = 0; 

    for (let step = 0; step < 4; step++) {

        let currentCircle = document.getElementById(String(circleID));
        
        if (!currentCircle || currentCircle.style.backgroundColor !== playerColor) {

            return false;

        }
        
        count++;
        
        circleID += direction.x * 7 + direction.y;

    }

    return count === 4;

}

function checkWin (playerColor) {

    const directions = [
        
        { x: 0, y: 1 },   // Vertical down

        { x: 1, y: 0 },   // Horizontal right

        { x: 1, y: 1 },   // Diagonal down-right

        { x: -1, y: 1 },  // Diagonal down-left

        { x: 0, y: -1 },  // Vertical up

        { x: -1, y: 0 },  // Horizontal left

        { x: -1, y: -1 }, // Diagonal up-left

        { x: 1, y: -1 }   // Diagonal up-right
    
    ];


    for (let i = 1; i <= 42; i++) {

        const circle = document.getElementById(String(i));
        
        if (circle.style.backgroundColor !== playerColor) continue;
        
        for (let direction of directions) {

            if (checkDirection(circle, direction, playerColor)) {

                return true; 

            }

        }

    }

    return false;

}

function fill (circle) {

    let circleID = Number(circle.id);

    if ( circle.style.backgroundColor === blue || circle.style.backgroundColor === pink ) {

        return;

    }

    if ( player1 ) {

        if ( circle.style.backgroundColor != blue && circle.style.backgroundColor != pink ) {

            if ( !(circleID >= 36 && circleID <= 42) ) {

                let lowerCircle = document.getElementById(String(circleID + 7));

                if ( lowerCircle.style.backgroundColor === blue || lowerCircle.style.backgroundColor === pink ) {

                    circle.style.backgroundColor = blue;

                    header.innerHTML = `<span> Player 2's Turn </span>`;

                    const headerText = document.getElementsByTagName('span')[0];
    
                    headerText.style.color = pink;
                
                    player1 = false;
    
                    player2 = true;

                }

            }

            else {

                circle.style.backgroundColor = blue;

                header.innerHTML = `<span> Player 2's Turn </span>`;

                const headerText = document.getElementsByTagName('span')[0];

                headerText.style.color = pink;
            
                player1 = false;

                player2 = true;

            }

            if ( checkWin(blue) ) {
                
                header.innerHTML = '<span> Player 1 Won! Press Any Key To Restart </span>';

                const headerText = document.getElementsByTagName('span')[0];

                headerText.style.color = hexToRgb('#496a75');

                document.getElementsByTagName('body')[0].style.backgroundColor = blue;
            
            }

            if ( checkTie() ) {

                header.innerHTML = `<span> It's a Tie! Press Any Key To Restart </span>`;

            }

        }

    }

    else {

        let circleID = Number(circle.id);

        if ( circle.style.backgroundColor != blue &&
            
            circle.style.backgroundColor != pink ) {

            if ( !(circleID >= 36 && circleID <= 42) ) {

                let lowerCircle = document.getElementById(String(circleID + 7));

                if ( lowerCircle.style.backgroundColor === blue ||
                    
                    lowerCircle.style.backgroundColor === pink ) {
                    
                    circle.style.backgroundColor = pink;

                    header.innerHTML = `<span> Player 1's Turn </span>`;
                    
                    const headerText = document.getElementsByTagName('span')[0];
    
                    headerText.style.color = blue;
                
                    player1 = true;
    
                    player2 = false;
            
                }

            }

            else {

                circle.style.backgroundColor = pink;

                header.innerHTML = `<span> Player 1's Turn </span>`;

                const headerText = document.getElementsByTagName('span')[0];

                headerText.style.color = blue;
            
                player1 = true;

                player2 = false;

            }

            if ( checkWin(pink) ) {
                
                header.innerHTML = '<span> Player 2 Won! Press Any Key To Restart </span>';

                const headerText = document.getElementsByTagName('span')[0];

                headerText.style.color = hexToRgb('#f78697');

                document.getElementsByTagName('body')[0].style.backgroundColor = pink;
            
            }

            if ( checkTie() ) {

                header.innerHTML = `<span> It's a Tie! Press Any Key To Restart </span>`;

            }

        }

    }
}

function restart () {

    started = false;

    player1 = false;

    player2 = false;

    document.getElementsByTagName('body')[0].style.backgroundColor = '#F6EDBB';

    header.innerHTML = '<span> Press Any Key To Start </span> <img src="Assets/images-3-removebg-preview.png" alt="connect4 logo">';

    const headerText = document.getElementsByTagName('span')[0];

    headerText.style.color = 'rgb(149, 119, 80)';

    for (let i = 0; i < circles.length; i++) {

        circles[i].style.backgroundColor = '';

    }

}

document.addEventListener ('keydown', () => {

    if (!started) {

        started = true;

        header.innerHTML = `<span> Player 1's Turn </span>`;

        const headerText = document.getElementsByTagName('span')[0];

        headerText.style.color = blue;
    
        player1 = true;
    
        for ( let i = 0; i < circles.length; i++ ) {
            
            circles[i].addEventListener('click', function () {
                
                if ( !checkWin(blue) && !checkWin(pink) ) {
    
                    fill(this);
                    
                }
            
            } );
        
        }
    
    }

    else if ( checkWin(blue) || checkWin(pink) ) {

        restart();

    }

})