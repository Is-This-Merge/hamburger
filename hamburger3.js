const canvas=document.getElementById("canvas");
const ctx=canvas.getContext('2d');
const gravity=0.2;
const friction=0.5;
const e=0.5;

let select_location=false;
let selectedX=300;
let selectedY=0;
let CurrentColor="brown";


const ingredients=[];

class Ingredient 
{
    constructor(x,y,color) 
    {
        this.x=x;
        this.y=y;
        this.vx=(Math.random()-0.5)*friction;
        this.vy=0;
        this.weight=100;
        this.height=30; 
        this.color=color;
        this.isStatic=false;
    }

    update()
    {
        if(this.isStatic==true)
            return;
        this.vx+=Math.random()*0.1-0.05;
        this.vy+=gravity;
        this.x+=this.vx;
        this.y+=this.vy;  

        for (const other of ingredients)
        {
            if (other === this || !other.isStatic) continue;

            const horizontalOverlap =
                this.x < other.x + other.weight &&
                this.x + this.weight > other.x;
            const verticalCollision =
                this.y + this.height >= other.y &&
                this.y < other.y;

        if (horizontalOverlap && verticalCollision) {
            this.y = other.y - this.height;
            this.Stop();
            break;
        }
        }

        if(this.y+this.height>canvas.height)
        {
            this.y=canvas.height-this.height;
            this.Stop();
            return;
        }     
    }

    Stop()
    {
        this.vx=0;
        this.vy=0;
        this.isStatic=true;
    }

    draw()
    {
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.weight, this.height);
        ctx.fill();
    }
}
        
function animate ()
{
     ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    ingredients.forEach(function(item) 
    {
    
        item.update();
        item.draw();
    });
    requestAnimationFrame(animate); //얘가 재귀함수 느낌인 것 같은데 잘 이해가 안 됨. AI가 추천해준 거라..
}

        

animate();





// const fall=document.getElementById("fallbutton");
// fall.addEventListener("click", function fallbutton()
// {
//     console.log("낙하 버튼 클릭");
//     const item= new Ingredient(selectedX,selectedY,CurrentColor);
//     ingredients.push(item);
// });

const bread=document.getElementById("bread");
bread.addEventListener("click", function()
{
    console.log("빵 버튼 클릭");
    CurrentColor="#f6c04a";
    const item= new Ingredient(selectedX,selectedY,CurrentColor);
    ingredients.push(item);
});
const patty=document.getElementById("patty");
patty.addEventListener("click", function()
{
    console.log("패티 버튼 클릭");
    CurrentColor="#8d6c24";
    const item= new Ingredient(selectedX,selectedY,CurrentColor);
    ingredients.push(item);
});
const lettuce=document.getElementById("lettuce");
lettuce.addEventListener("click", function()
{
    console.log("양상추 버튼 클릭");
    CurrentColor="#4caf50";
    const item= new Ingredient(selectedX,selectedY,CurrentColor);
    ingredients.push(item);
});
const cheese=document.getElementById("cheese");
cheese.addEventListener("click", function()
{
    console.log("치즈 버튼 클릭");
    CurrentColor="#ffeb3b";
    const item= new Ingredient(selectedX,selectedY,CurrentColor);
    ingredients.push(item);
});



const locationButton=document.getElementById("locationbutton");
const pos_text=document.getElementById("pos");
locationButton.addEventListener("click", function()
{
    select_location=true;
    pos_text.textContent="낙하 위치를 클릭하여 지정하세요.";
});
canvas.addEventListener("click", function(event)
{
    console.log("낙하 위치 지정 버튼 클릭");
    if(select_location==true) {
        selectedX=event.offsetX;
        selectedY=event.offsetY;
        document.getElementById("pos").textContent=`x: ${selectedX}, y: ${selectedY}`;
        select_location=false;
    }
});
