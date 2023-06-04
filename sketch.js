let points =  [[2,2],[3,3],[2,3],[4,4],[3,5],[2,4],[3,6],[6,5],[8,6],[9,6],[7,4],[8,4],[8,3],[9.54,3.34],[9,2],[7,1],[6,-6],[3,-6],[4,-3],[-3,-3],[-4,-6],[-7,-6],[-6,1],[-7,5],[-6,7],[-4,7],[-5,5],[-4,2],[2,2]]

var fill_colors = "f0ead2-dde5b6-adc178-a98467-6c584c".split("-").map(a=>"#"+a)
var line_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)

//設定points所有點的物件變數
var ball //把目前要處理的物件，暫存到ball變數內
var balls =[] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定飛彈的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到bullet變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//分數
var score = 0 //設定一個值初始為0
//設定砲台位移
var shipP


function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)
  for(var i=0;i<20;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<15;i=i+1){
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
  background(220);

  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }

  }

  //圖形的顯示(points)
  for(let ball of balls){ //只要是陣列的方式，都可以利用此方式處理
    ball.draw()
    ball.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)         
        score = score + 1 //每按到一個，加一分
      }
    }
  }
  //飛彈的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>5 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        // monsters.splice(monsters.indexOf(monster),1) //從倉庫monsters裡取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)         
        score = score - 1 //每按到一個，扣一分
        monster.dead = true
      }
    }
   }

  push()
    fill(255)
    textSize(70)
    text(score,60,50) //在座標為(60,50)，顯示score內容
  pop()

  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    noStroke()
    rotate(angle)
    fill("#1d3557")
    ellipse(0,0,50)
    fill("#fca311")
    triangle(-25,25,-25,-25,50,0) //設定三個點，畫成三角形
  pop() //設定恢復原樣
}

function mousePressed(){ //按一下產生一個飛彈
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
  bullets.push(bullet)
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
    bullets.push(bullet)
  }
}
class Obj{ //宣告一個類別，針對一個畫的圖案
  constructor(args){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
    // this.p = args.p || { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置，||(or)，當產生一個物件時，有傳位置參數的話使用該參數，若沒有傳參數就以||後面的設定產出
    this.p = args.p || createVector(random(0,width),random(0,height)) //效果等同上面那行，把原本的{x:..., y:...}改成"向量"方式呈現

    // this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
    this.v = createVector(random(-1,1),random(-1,1)) //效果等同上面那行，把原本的{x:..., y:...}改成"向量"方式呈現

    this.size = random(10,20) //描述為該物件的放大倍率
    this.color = random(fill_colors) //充滿顏色
    this.stroke = random(line_colors) //外框線條顏色
  }

  draw(){ //畫出單一個物件形狀
    push() //執行後，依照以下設定
      translate(this.p.x,this.p.y) //以讓物件位置為原點
      scale(this.v.x<0?-1:1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
      fill(this.color)
      stroke(this.stroke)
      strokeWeight(4)
      beginShape()
        for(var k=0;k<points.length;k=k+1){
          // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
          // vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endShape()，會把所有點連在一起，要把上面迴圈points.length-1的-1留著
          curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
        }
      endShape()
    pop() //執行後，回到原始的設定
  }

  update(){ //圖形的移動
    // this.p.x = this.p.x + this.v.x //現在的位置(x)加上現在的速度(x)
    // this.p.y = this.p.y + this.v.y //現在的位置(y)加上現在的速度(y)
    this.p.add(this.v) //設定好向量後才能使用(CreateVector)，可以取代上面兩行指令，效果不變
    //向量sub==>減號

    //知道滑鼠的位置，並建立一個滑鼠的向量
    // let mouseV = createVector(mouseX,mouseY) //把滑鼠的位置轉換成一個向量值
    // let delta = mouseV.sub(this.p).limit(this.v.mag()*1.5) //sub計算滑鼠所在位置向量(mouseV)到物件向量(this.p)的距離，limit(this.v.mag())意思為每次距離縮短(慢慢移動)，mag意思為取得大小，*1.5為速度加快幾倍
    // this.p.add(delta)

    if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
      this.v.x = -this.v.x //把x軸的速度方向改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
      this.v.y = -this.v.y //把y軸的速度方向改變
    }
  }

  isBallInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
    let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
    if(d<13*this.size){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
      return true //傳回true的值
    }else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
      return false //傳回false值
    }
  }
}
var monster_colors = "000f08-1c3738-4d4847-f4fff8-8baaad".split("-").map(a=>"#"+a)


class Monster{ //宣告一個怪物類別，名稱為Monster
    constructor(args){
        this.r = args.r || random(50,100) //設計怪物的主體，就傳參數args.r來設定怪物大小，沒有傳參數就以10為準
        this.p = args.p || createVector(random(0+this.r,width-this.r),random(0+this.r,height-this.r)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數，就會利用亂數(-1,1)
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //活著
        this.timenum = 0 //延長時間
    }
    draw(){ //畫出元件
      if(this.dead == false){
        push()
          translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
          fill(this.color)
          noStroke()
          ellipse(0,0,this.r)
          if(this.mode=="happy"){
            fill(255)
            ellipse(0,0,this.r/2)
            fill(0)
            ellipse(0,0,this.r/3)
          }
          else{
            fill(255)
            arc(0,0,this.r/2,this.r/2,0,PI)
            fill(0)
            arc(0,0,this.r/3,this.r/3,0,PI)
          }
          stroke(this.color)
          strokeWeight(4)
          noFill()
        //   line(this.r/2,0,this.r,0)
          for(var j=0;j<10;j++){
            rotate(PI/5)
            beginShape()
            for(var i=0;i<(this.r/2);i++){
                vertex(this.r/2+i,sin(i/5+frameCount/10)*20)
            }
            endShape()
          }

        pop() //恢復原點到整個視窗左上早
      }
      else{ //怪物死亡畫面
        this.timenum = this.timenum+1
        push()
          translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
          fill(this.color)
          noStroke()
          ellipse(0,0,this.r)
          stroke(0)
          line(-this.r/2,0,this.r/2,0)

          stroke(this.color)
          strokeWeight(4)
          noFill()
        //   line(this.r/2,0,this.r,0)
          for(var j=0;j<10;j++){
            rotate(PI/5)
            line(this.r/2,0,this.r,0)
          }
        pop()
      }

    }

    update(){//計算出移動元件後的位置
        this.p.add(this.v)

        if(this.p.x<=0+this.r || this.p.x>=width-this.r){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0+this.r || this.p.y>=height-this.r){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
        }

        isMonsterInRanger(x,y){ //功能:判斷飛彈位置是否移動到此物件的範圍內
          let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
          if(d<this.r/2){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
            return true //傳回true的值
          }else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
            return false //傳回false值
          }
        }

    }
    //定義一個飛彈(bullet)物件的class

class Bullet{
  constructor(args){
      this.r = args.r || 50 //設計飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有傳參數就以50為準
      // this.p = args.p || createVector(width/2,height/2) //建立一個向量
      this.p = args.p || shipP.copy() //建立一個向量
      this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
      this.color = args.color || "#90e0ef"

  }
  draw(){ //畫出物件程式碼
      push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
      pop()

  }
  update(){ //計算出移動後的位置
      this.p.add(this.v)

  }

}