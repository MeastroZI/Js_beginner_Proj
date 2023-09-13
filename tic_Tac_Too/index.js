let box = document.getElementsByClassName("box")
let string = ""
let count = 1
let gameBoard = document.getElementById("gameBoard")
let btn = document.getElementById("reset")
let info = document.getElementById("InfoText")
btn.addEventListener("click",()=>{
    reset()
    if (btn.innerText=="Reset") {
        btn.innerText="Start"
        info.innerText=""
        gameBoard.style.display="none"
      
    }
    else{
        btn.innerText="Reset"
        info.innerText="Lets begin the game 🤼‍♂️🤼‍♀️!!"
        gameBoard.style.display="grid"
        
    }
})
Array.from(box).forEach((items)=>{
    items.addEventListener("click",(e)=>{
        if (e.target.innerText=="") {
            
            e.target.innerText=changeTurn()
            win()
        }
        
    })
})

function changeTurn (){
    if (count%2!=0) {
        count++
        string="X"
        info.innerText=`0's Turn`
        return "X"
    }
    else{
        count++
        string="0"
        info.innerText=`X's Turn`
        return "0"
    }
}

function win(){
    let box = document.getElementsByClassName("box")
    let Wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    
    Wins.forEach((e)=>{
        
        // console.log(box[1].innerText)
        if ((box[e[0]].innerText==string)&&(box[e[1]].innerText==box[e[2]].innerText)&&box[e[0]].innerText==box[e[1]].innerText) {
            // console.log(string , "Win the Match🎉🎉🎉!!")
            info.innerText = `${string} Win the Match🎉🎉🎉!!!!`
            
            
        }
        
    })
}
function reset(){
    let box = document.getElementsByClassName("box")
    Array.from(box).forEach((e)=>{
        e.innerText=""
        
    })
}


