//import  Two from "two.js";
import Two from "./node_modules/two.js/build/two.module.js"

export class RBTnode{
    constructor(val, color){
        this.val    = val
        this.color  = color
        this.right  = null
        this.left   = null
        this.parent = null

        this.textSize = 20
        this.circRad = 20

        this.outLine = null
    }


    SetColor(color){
        this.color = color

    }

    GetGrandParent(){

        const parentNode = this.parent


        if (parentNode) {
            return parentNode.parent 
            
        }

        return null
    }

    GetUncle(outLine=false){
        var uncle = null
        var cur_node = this

        while (!uncle || !cur_node ) {
            let parentNode  = cur_node.parent
            let grandParent = parentNode.parent
            if (grandParent) {
                uncle      = (grandParent.right === parentNode ) ?  grandParent.left   : grandParent.right
                
            }else{
                return
            }
            cur_node = parentNode   
        }


        // console.log(uncle);

        if (uncle && outLine ) {
            console.log('ran');
            uncle.outLine = true
        }

        return uncle





    }


    
    
    GetCirc(){
        const black = 'rgb(0,0,0)'
        const red   = 'rgb(255,0,0)' 
        var two = new Two()
        
        var circ = two.makeCircle(0,0,this.circRad)

        var circText = two.makeText(`${this.val}`,0,0)
        circText.size = this.textSize

        circText.fill = "white"
    
        circ.fill =  (this.color === 'b') ? black : red ;


        if(!this.outLine){
            circ.noStroke()
        }else{
            circ.stroke = "blue"
            circ.linewidth= 5
        }

        var group = two.makeGroup(circ,circText)

        return group
    }
    

    Print(){
        return `(${this.val}, ${this.color})`
    }


    // LeftRotate(){
    //     const rightChild     = this.right
    //     const rightLeftChild = rightChild.left
    //     // const leftChild      = this.left
    //     rightChild.left      = this
    //     this.right           = rightLeftChild

    
    // }


    // RightRotate(){
    //     const leftChild      = this.left
        
        
    //     if (!leftChild) {
    //         const leftRightChild = null
    //     }else{
    //         const leftRightChild = leftChild.right
    //     }
    //     // const leftChild      = this.left


    //     if (!leftRightChild) {
            
    //     }else{
    //         leftChild.right      = this
    //     }
    //     this.left            = leftRightChild

    // }


}

