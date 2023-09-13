console.log("index.js is running")
let input = document.getElementById("input")
let string = ""
let keys = document.getElementsByClassName("num")

Array.from(keys).forEach((items)=>{
    items.addEventListener("click",(e)=>{
        
        console.log(string)
        if(e.target.innerText=="="){
            console.log("= is clicked")
            string=eval(string)
            input.value=string
            
        }
        else if(e.target.innerText=="CLEAR")
        {
            console.log("Clear is clicked")
            string=""
            input.value=string
        }
        else if(e.target.innerText=="DEL"){
            string=string.slice(0,-1)
            input.value=string
        }
        // else if(e.target.innerText=="%"){
            //     string=eval(string)
            // }
           
        else{
            string=string+e.target.innerText
            // console.log(e.target.innerText)
            input.value=string
            // console.log(string)

        }
    })
})
