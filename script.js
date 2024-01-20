document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    const width=8;
    const squares=[];
    let  score=0;
    const scoredisplay=document.getElementById('score');
    const candycolours=[
        'url(red-candy.png)','url(blue-candy.png)','url(green-candy.png)','url(orange-candy.png)','url(purple-candy.png)','url(yellow-candy.png)'
    ]
    //create board
    function createboard(){
        for(let i=0;i<width*width;i++)
        {
           const square=document.createElement('div');
           square.setAttribute('draggable',true);
           square.setAttribute('id',i)
           let randomcolour=Math.floor(Math.random()*candycolours.length);
           square.style.backgroundImage=candycolours[randomcolour];
           grid.appendChild(square);
           squares.push(square);
        }
    }
    createboard();
    let colourbeingdragged;
    let colourbeingreplaced;
    let squareidbeingdragged;
    let squareidbeingreplaced;
 //drag the candies
 squares.forEach(square=>square.addEventListener('dragstart',dragStart))
 squares.forEach(square=>square.addEventListener('dragend',dragEnd))
 squares.forEach(square=>square.addEventListener('dragover',dragOver))
 squares.forEach(square=>square.addEventListener('dragenter',dragEnter))
 squares.forEach(square=>square.addEventListener('dragleave',dragLeave))
 squares.forEach(square=>square.addEventListener('drop',dragDrop))

 function dragStart(){
    colourbeingdragged=this.style.backgroundImage;
    squareidbeingdragged=parseInt(this.id);
    
 }

 
 function dragOver(e){
    e.preventDefault();
    


 }
 function dragEnter(e){
        e.preventDefault();
  
 }
 function dragLeave(){
  this.style.backgroundImage='';
 }
 function dragDrop(){
    colourbeingreplaced=this.style.backgroundImage;
   
    squareidbeingreplaced=parseInt(this.id);
    this.style.backgroundImage=colourbeingdragged;
    squares[squareidbeingdragged].style.backgroundImage=colourbeingreplaced;
 }
 function dragEnd(){
 
    //what is valid move?
    let validmoves=[squareidbeingdragged-1,squareidbeingdragged-width,squareidbeingdragged+1,squareidbeingdragged+width];
   let validmove=validmoves.includes(squareidbeingreplaced);
   if (squareidbeingreplaced && validmove){
    squareidbeingreplaced=null;
   } else if (squareidbeingreplaced && !validmove){
    squares[squareidbeingreplaced].style.backgroundImage=colourbeingreplaced;
    squares[squareidbeingdragged].style.backgroundImage=colourbeingdragged;
   } else squares[squareidbeingdragged].style.backgroundImage=colourbeingdragged;
 }
 function movedown(){
    for (i=0;i<55;i++){
        if (squares[i+width].style.backgroundImage===''){
            squares[i+width].style.backgroundImage=squares[i].style.backgroundImage;
            squares[i].style.backgroundImage='';
            const firstrow=[0,1,2,3,4,5,6,7];
            const isfirstrow=firstrow.includes(i);
            if (isfirstrow && (squares[i].style.backgroundImage==='')){
                let randomcolour=Math.floor(Math.random()*candycolours.length);
                squares[i].style.backgroundImage=candycolours[randomcolour];
            }
        }
    }
}

//checking for matches
//checking for row of three

function checkrowforfour(){
    for (i=0;i<60;i++){
        let rowoffour=[i,i+1,i+2,i+3];
        let decidedcolor=squares[i].style.backgroundImage;
        const isblank=squares[i].style.backgroundImage==='';
        const notvalid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
        if (notvalid.includes(i)) continue
        if(rowoffour.every(index=>squares[index].style.backgroundImage===decidedcolor && !isblank)){
            score+=4;
            scoredisplay.innerHTML=score;
            rowoffour.forEach(index=>{
                squares[index].style.backgroundImage=''
            })
        }
    }
}
checkrowforfour()
function checkcolumnforfour(){
    for (i=0;i<39;i++){
        let columnoffour=[i,i+width,i+width*2,i+width*3];
        let decidedcolor=squares[i].style.backgroundImage;
        const isblank=squares[i].style.backgroundImage==='';

        if(columnoffour.every(index=>squares[index].style.backgroundImage===decidedcolor && !isblank)){
            score+=4;
            scoredisplay.innerHTML=score;
            columnoffour.forEach(index=>{
                squares[index].style.backgroundImage=''
            })
        }
    }
}
checkcolumnforfour();
function checkrowforthree(){
    for (i=0;i<61;i++){
        let rowofthree=[i,i+1,i+2];
        let decidedcolor=squares[i].style.backgroundImage;
        const isblank=squares[i].style.backgroundImage==='';
        const notvalid=[6,7,14,15,22,23,30,31,38,46,47,54,55];
        if (notvalid.includes(i)) continue
        if(rowofthree.every(index=>squares[index].style.backgroundImage===decidedcolor && !isblank)){
            score+=3;
            scoredisplay.innerHTML=score;
            rowofthree.forEach(index=>{
                squares[index].style.backgroundImage=''
            })
        }
    }
}
checkrowforthree();
function checkcolumnforthree(){
    for (i=0;i<47;i++){
        let columnofthree=[i,i+width,i+width*2];
        let decidedcolor=squares[i].style.backgroundImage;
        const isblank=squares[i].style.backgroundImage==='';

        if(columnofthree.every(index=>squares[index].style.backgroundImage===decidedcolor && !isblank)){
            score+=3;
            scoredisplay.innerHTML=score;
            columnofthree.forEach(index=>{
                squares[index].style.backgroundImage='';
            })
        }
    }
}
checkcolumnforthree();




window.setInterval(function(){
   
   checkrowforfour();
   checkcolumnforfour();
   checkrowforthree();
   checkcolumnforthree();
   movedown();
},100);









})