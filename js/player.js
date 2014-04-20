var mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
var floor = 1;
var jump = "false";
document.addEventListener('mousemove', onMouseMove, false); 
var keyboard = new KeyboardState();
var clock = new THREE.Clock();
var PI_2 = Math.PI / 2;


function create_camera()
{
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(camera);
        camera.position.set(0,20,1000);
//        camera.lookAt(scene.position);  

}

function camera_control(speed, gravity, limits)
{
        
        keyboard.update();
        speed = 4;
        var moveDistance = speed * clock.getDelta();
        console.log(speed);

        if ( keyboard.pressed("W") )
                camera.translateZ( -moveDistance );

        if ( keyboard.pressed("S") )
                camera.translateZ(  moveDistance );

        if ( keyboard.pressed("A") )
                camera.translateX( -moveDistance );

        if ( keyboard.pressed("D") )
                camera.translateX( moveDistance );

        if ( keyboard.pressed("left") )
                camera.rotation.y += .05;

        if ( keyboard.pressed("right") )
                camera.rotation.y -= .05;

        //jump
        if ( keyboard.pressed("space") && jump == "false"){  
                gun_bang();
                camera.position.y += .2;
                if (camera.position.y > 3){
                    jump = "true";
                }
        }
        //


        if ( keyboard.down("R") )
                mesh.material.color = new THREE.Color(0xff0000);
        if ( keyboard.up("R") )
                mesh.material.color = new THREE.Color(0x0000ff);


        //Limit Level Size
        if ( camera.position.x > limits ){
            camera.position.x = limits;
        }
        else if ( camera.position.x < -limits )
        {
            camera.position.x = -limits;
        }
        else if ( camera.position.z > limits )
        {
            camera.position.z = limits;
        }
        else if(camera.position.z < -limits)
        {
            camera.position.z = -limits;
        }
        //

        //keep camera above floor
        if (camera.position.y < floor)
        {
            camera.position.y = floor;
        }else if (camera.position.y > floor)
        {
            camera.position.y-=moveDistance;
        }else{
            jump = "false";
        }

}


        var onMouseMove = function ( event ) {

                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

                camera.rotation.y -= movementX * 0.002;
//                pitchObject.rotation.x -= movementY * 0.002;

//                pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

        };

