//定義一個飛彈(bullet)物件的class

class Bullet{
    constructor(args){
        this.r = args.r || 10 //設計飛彈有大有小時，就傳參數args.r來設定飛彈大小，沒有傳參數就以10為準
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