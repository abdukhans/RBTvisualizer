import Two from "./node_modules/two.js/build/two.module.js"
import {RBTnode } from "./RBTnode.js"

const radians = (deg) =>  (Math.PI/180)*deg



export class RBT {
    constructor(){
        this.height = 0
        this.root = null

        this.displayAngle = 60
        this.branchLength = 400
        this.easeAngle         = 0.7
        this.easeBranch        = 0.6 
    }



    UncleIsRed(node,outLine=false){

        const uncle = node.GetUncle(outLine)

        if (!uncle) {

            return false
            
        }

        //uncle.outLine = true

        return uncle.color === 'r'

    }

    UncleIsBlack(node,outLine=false){

        const uncle = node.GetUncle(outLine)

        if (!uncle) {

            return false
            
        }

        //uncle.outLine = true

        return uncle.color === 'b'

    }


    #IsTriangle(node){
        const grandParent = node.GetGrandParent()
        const grandRight  = grandParent.right
        const grandLeft   = grandParent.left

        if (grandRight) {
            if (grandRight.left === node) {
                return true
            }
        }

        if(grandLeft){
            if (grandLeft.right === node) {
                return true
                
            }

        }


        return false


    }
    
    #IsLine(node){

        const grandParent = node.GetGrandParent()
        const grandRight  = grandParent.right
        const grandLeft   = grandParent.left

        if (grandRight) {
            if (grandRight.right === node) {
                return true
            }
        }

        if(grandLeft){
            if (grandLeft.left === node) {
                return true
                
            }

        }


        return false

    }


    #Fix(node){

        if (this.root === node) {
            node.color = 'b'

            this.height ++ 


            return

        } else if(node.parent.color === 'b'){

            return

        }
        
        else if (this.UncleIsRed(node)) {
            const grandParent = node.GetGrandParent()
            const parentNode  = node.parent
            const uncleNode   = node.GetUncle()
            if (grandParent) {
                grandParent.color = 'r'
                parentNode.color  = 'b'
                uncleNode.color   = 'b' 

                this.#Fix(grandParent)   
            }    
        }else if (this.UncleIsBlack(node)){

            const grandParent = node.GetGrandParent()
            const parentNode  = node.parent

            // Triangle subcase 
            if ( this.#IsTriangle(node)) {
                // node === grandParent.right.left || node === grandParent.left.right 
                // nodeDIr = true, means that node is a right child and false means
                // it is a left child
                const nodeRight =  (parentNode.right === node)  ? true : false


                if (nodeRight) {
                    this.RotateLeft(parentNode)   
                }else{
                    this.RotateRight(parentNode)
                }




                this.#Fix(parentNode)
            }else if( this.#IsLine(node)){

                // (node === node.GetGrandParent().right.right || node === node.GetGrandParent().left.left )
                // Line sub case


                const grandParent = node.GetGrandParent()
                const nodeRight =   (grandParent.right === parentNode)  ? true : false

                 if (nodeRight) {
                    this.RotateLeft(grandParent)   
                }else{
                    this.RotateRight(grandParent)
                }


                parentNode.color = 'b'
                grandParent.color = 'r'








            }




        }



    }
    Insert(node){
        this.TestInsert(node)

        node.color = 'r'


        this.#Fix(node)

       




        // TODO insertion
    }


    TestInsert(node){
        
        let cur_node = this.root
        let par_node  = cur_node
        let cur_depth = 0 
        if (!this.root) {
            this.root = node
            this.height = 0

            return
            
        }

        while (cur_node) {
            
            if (cur_node.val > node.val) {
               
                if (!cur_node.left) {
                    par_node = cur_node
                    cur_node.left = node
                    cur_depth += 1
                    break
                }
                cur_node = cur_node.left


            }else{
                if (!cur_node.right) {
                    par_node = cur_node
                    cur_node.right = node
                    cur_depth += 1 
                    break
                }
                cur_node = cur_node.right
            }

            cur_depth += 1 

        }

        node.parent = par_node

    
        // if (cur_depth > this.height) {
        //     this.height = cur_depth            
        // }


    }

    RotateLeft(node){
        
        const rightChild      = node.right
        const rightLeftChild  = rightChild.left
        const parentNode      = node.parent
        node.right            = rightLeftChild


        if (rightLeftChild) {
            rightLeftChild.parent = node
        }

        
        if (!parentNode) {
            this.root = rightChild
        }else if (node === parentNode.left) {
            parentNode.left = rightChild
        }else{
            parentNode.right = rightChild
        }
            
        rightChild.parent = parentNode 
        rightChild.left   = node 
        node.parent       = rightChild


    }

    RotateRight(node){

        console.log(node);
        const leftChild      = node.left

        const leftRightChild = leftChild.right
        const parentNode     = node.parent
        node.left            = leftRightChild 


        if (leftRightChild) {
            leftRightChild.parent = node
        }




        if (!parentNode) {
            this.root = leftChild     
        }else if (node === parentNode.left){

            parentNode.left = leftChild
        }else{
            parentNode.right = leftChild
        }
        
        
        leftChild.parent = parentNode
        leftChild.right  = node 
        node.parent      = leftChild
    }

    DisplayTree(x,y){
        return this.#DispAllNodes(this.root,x,y,this.displayAngle,this.branchLength,this.easeAngle,this.easeBranch)
    }

    #DispAllNodes(node,x,y,angle,len,ease,branchEase){

        const two  = new Two()


        
        if(!node){
            return
        }

        
        const nodeBranch = two.makeGroup()
        const nodeCirc   = node.GetCirc()
        
        nodeCirc.translation = new Two.Vector(x,y)



        const runPos = Math.abs(Math.sin(radians(angle)))*len

        const risePos =  Math.abs(Math.cos(radians(angle)))*len
        //const riseNeg = -risePos

        const rightBranchLine = two.makeLine(x,y, x+runPos,y+risePos)
        const leftBranchLine  = two.makeLine(x,y, x-runPos,y+risePos)

        rightBranchLine.fill = 'black'
        rightBranchLine.linewidth = 2

        leftBranchLine.fill = 'black'
        leftBranchLine.linewidth = 2
        const newAngle = ease*angle
        const newLen  = len*branchEase 


        const leftSubTree  = this.#DispAllNodes(node.left,x-runPos,y+risePos,newAngle,newLen,ease,branchEase)
        const rightSubTree = this.#DispAllNodes(node.right, x+runPos,y+risePos,newAngle,newLen,ease ,branchEase )


        if (node.right && node.left ) {

            nodeBranch.add(rightBranchLine,leftBranchLine)
            nodeBranch.add(nodeCirc)

            return two.makeGroup(nodeBranch,rightSubTree,leftSubTree)


            
        }else if (node.right){
            nodeBranch.add(rightBranchLine)
            nodeBranch.add(nodeCirc)
            
            
            return two.makeGroup(nodeBranch,rightSubTree)



        }else if (node.left){
            nodeBranch.add(leftBranchLine)
            nodeBranch.add(nodeCirc)
            return two.makeGroup(nodeBranch,leftSubTree)
        }


        return nodeCirc
    }

    PrintTree(num_spaces){

        
    }
    




}



const n1 = new RBTnode(2,'b')
const n2 = new RBTnode(1,'b')
const n3 = new RBTnode(20,'b')
const n4 = new RBTnode(11,'b')
const n5 = new RBTnode(90,'b')
const n6 = new RBTnode(10,'b')
const n7 = new RBTnode(15,'b')
const n8 = new RBTnode(14,"b")






const arr = [n1,n2,n3,n4,n5,n6,n7,n8, new RBTnode(16,'b'), new RBTnode(15,'b'), new RBTnode(17,'b'),  new RBTnode(15,'b')]




export const rbt = new RBT()




export const circN1 = n1.GetCirc()

for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    rbt.Insert(element)

    
}

//rbt.RotateLeft(n1)
//rbt.RotateRight(n1)

//n2.color = 'b'



//console.log(rbt.UncleIsRed(n5));


//rbt.RotateRight(n3)
//console.log(n2);







console.log(rbt);