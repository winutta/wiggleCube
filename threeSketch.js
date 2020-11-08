function main(){

	//set up renderer and scene
	const canvas = document.getElementById("c");
	const renderer = new THREE.WebGLRenderer({canvas,antialias:true});
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.setClearColor(0x000000,1);// a nice burnt orange color
	
	const scene = new THREE.Scene();

	//create camera
	const fov = 75;
	const aspect = window.innerWidth/window.innerHeight;
	const near = 0.1;
	const far = 2000;
	const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
	camera.position.z = 40;

	//make cube
	const w = 20;
 	const h = 20;
    const geometry = new THREE.BoxGeometry( w,h,h, 200,200,200);

    const material = new THREE.ShaderMaterial( {
                uniforms: {
                iTime: { type: 'f', value: 0.0 },
           		res: {value: new THREE.Vector2(window.innerWidth,window.innerHeight)},
                },
                vertexShader: document.getElementById("vertexShader").textContent,
                fragmentShader: document.getElementById("fragmentShader").textContent,
                transparent:true,
                side: THREE.DoubleSide,
            });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,0,0);
    scene.add(cube);
    
    //add mouse movement controls
	const controls = new THREE.OrbitControls(camera, canvas);
	controls.target.set(0, 0, 0);
	controls.update();

	//render
	function render(time){
		material.uniforms.iTime.value = time;
		renderer.render(scene,camera);

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);

}

main();