//import Two from "two.js"
// import {rbt} from "./rbt.js"


import Two from "./node_modules/two.js/build/two.module.js"
import {rbt,circN1,RBT} from "./rbt.js"


var params = {
                fullscreen: true
            };

            

            
            var elem = document.body;
            var two = new Two(params).appendTo(elem);

            // console.log(rbt);

            //var vect = new Two.Vector(300 , 300)


            //console.log(vect);
            
            
            //circN1.translation = vect
            //two.add(circN1)

            // Two.js has convenient methods to make shapes and insert them into the scene.
            // var radius = 50;
            // var x = two.width * 0.5 + 300;
            // var y = two.height * 0.5 - radius * 1.25;
            // var circle = two.makeCircle(x, y, radius);

 

        

            //console.log(circle);



            

            // y = two.height * 0.5 + radius * 1.25;
            // var width = 100;
            // var height = 100;
            // var rect = two.makeRectangle(x, y, width, height);

            // // The object returned has many stylable properties:
            // circle.fill = '#FF8000';
            // // And accepts all valid CSS color:
            // circle.stroke = 'orangered';
            // circle.linewidth = 5;
            // rect.fill = 'rgb(0, 0, 0)';

            
            // rect.opacity = 0.75;
            // rect.noStroke();
            // two.clear()
            // Don’t forget to tell two to draw everything to the screen

            var tree = rbt.DisplayTree(900,50)

            var tree2 = new RBT()

            //tree.translation = new Two.Vector(300,300)

            two.add(tree)

            //console.log(tree);

            two.update();

            //console.log(two);