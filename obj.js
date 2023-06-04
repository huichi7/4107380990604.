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