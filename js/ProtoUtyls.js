//==========================================================================================
    function createQuadroRoom (len, wid, hig) {
				var geometry = new THREE.BoxGeometry( len, wid, hig, 4, 4, 4);
                                var materials = [];
    geometry.uvsNeedUpdate = true;
    geometry.dynamic = true;
    var materialArray = [];
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));/*./textures/Masonry.Stone.Onyx.Blue.jpg*/
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( ceiling,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( floor,{} ), side: THREE.BackSide }));/*./textures/wood-floor.jpg*/
    var material = new THREE.MeshFaceMaterial(materialArray);
 
				for ( var i = 0; i < geometry.faces.length; i += 2 ) {
					var hex =/* Math.random() **/ 0xeeeeee;
					geometry.faces[ i ].color.setHex( hex );
					geometry.faces[ i + 1 ].color.setHex( hex );
				}

				geometry.computeFaceNormals();
                            	geometry.computeVertexNormals();
                                var cube1 = new THREE.Mesh( geometry, material );
                                cube1.castShadow = true;
                                cube1.receiveShadow = true;
				cube1.name = 1111;
				cube1.position = new THREE.Vector3(0, 0, hig/2);
				collidableMeshList.push(cube1);
                            //var points = [];
                            //points[0] = new THREE.Vector3(-len/2, -wid/2,  0);
                            //points[1] = new THREE.Vector3( len/2, -wid/2,  0);
                            //points[2] = new THREE.Vector3( len/2,  wid/2,  0);
                            //points[3] = new THREE.Vector3(-len/2,  wid/2,  0);
                            //RoomFloorlGeometry = new THREE.ConvexGeometry(points);
				return cube1;
	
    }
//==========================================================================================
    function createDoor (ln, wd, acolor, textur) {
                            var rectangle = new THREE.Mesh(
                                    new THREE.PlaneGeometry( ln, wd ),
                                    new THREE.MeshBasicMaterial({ opacity: 1.0, transparent: true,
                                                                color: acolor, map: textur, side: THREE.BackSide})
                            );
	return rectangle;
    }

//==========================================================================================
    function createSimpleRoom (ln, wd, hg) {
	var points = [];
	points[0] = new THREE.Vector3( ln/2,  0,  -hg/2);
	points[1] = new THREE.Vector3( ln/2, wd,  -hg/2);
	points[2] = new THREE.Vector3(-ln/2, wd,  -hg/2);
	points[3] = new THREE.Vector3(-ln/2,  0,  -hg/2);
	points[4] = new THREE.Vector3( ln/2,  0,   hg/2);
	points[5] = new THREE.Vector3( ln/2, wd,   hg/2);
	points[6] = new THREE.Vector3(-ln/2, wd,   hg/2);
	points[7] = new THREE.Vector3(-ln/2,  0,   hg/2);
	var hullGeometry = new THREE.ConvexGeometry(points);
    hullGeometry.dynamic = true;
    var materialArray = [];
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));/*./textures/Masonry.Stone.Onyx.Blue.jpg*/
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( walls,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( ceiling,{} ), side: THREE.BackSide }));
    materialArray.push(new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture( floor,{} ), side: THREE.BackSide }));/*./textures/wood-floor.jpg*/
    var material = new THREE.MeshFaceMaterial(materialArray);
	var rectangle = new THREE.Mesh(hullGeometry, material);
                            rectangle.castShadow = true;
                            rectangle.receiveShadow = true;
                            rectangle.name = 1111;
                            rectangle.position = new THREE.Vector3(0, 0, hg/2);
                            collidableMeshList.push(rectangle);
	return rectangle;
    }
//==========================================================================================
    function createRectangle (ln, wd, acolor, textur) {
	var points = [];
	points[0] = new THREE.Vector3( ln/2,  0,  -0.0001);
	points[1] = new THREE.Vector3( ln/2, wd,  -0.0001);
	points[2] = new THREE.Vector3(-ln/2, wd,  -0.0001);
	points[3] = new THREE.Vector3(-ln/2,  0,  -0.0001);
	points[4] = new THREE.Vector3( ln/2,  0,   0.0001);
	points[5] = new THREE.Vector3( ln/2, wd,   0.0001);
	points[6] = new THREE.Vector3(-ln/2, wd,   0.0001);
	points[7] = new THREE.Vector3(-ln/2,  0,   0.0001);
	var hullGeometry = new THREE.ConvexGeometry(points);
	var meshMaterial = new THREE.MeshBasicMaterial({color: acolor, map: textur, transparent: true, opacity: 0.9});
	meshMaterial.side = THREE.DoubleSide;
	var rectangle = new THREE.Mesh(hullGeometry, meshMaterial);
	return rectangle;
    }
//==========================================================================================
	function ArrowHelperMy  ( dir, origin, length, red, green, blue ) {
	var arrow = new THREE.Object3D();
	arrow.position = origin;

	var p1 = new THREE.Vector3( -length * dir.x, -length * dir.y, -length * dir.z );
	var p2 = new THREE.Vector3(  length * dir.x,  length * dir.y,  length * dir.z );
	var p3 = calcMiddle(p1, p2);
	p3.x += 0.3;
	p3.y += 0.3;
	p3.z += 0.3;
	var norma = new THREE.Vector3(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);
	var first = new THREE.Vector3();
	first.crossVectors(dir, norma).normalize();
	norma.crossVectors(first, dir ).normalize();
	var xm = 1.0;//xmax/scale;
	var dd = xm/400;// 0.01/scale;
	var ll = xm/30;//0.5/scale;
	var rr = xm/150;//0.05/scale;
	var cylinder  = generatePointer( p1,  p2, dd, red, green, blue);
	arrow.add( cylinder );


	var coneGeometry = new THREE.CylinderGeometry( 0, rr, ll, 16, 1 );
	var matr = new THREE.Matrix4(first.x, first.y, first.z, 0.1,
				     dir.x,   dir.y,   dir.z,   0.1,
				     norma.x, norma.y, norma.z, 0.1,
				     p2.x,    p2.y,    p2.z,    1);
	matr.transpose();
	coneGeometry.applyMatrix( matr );
	var acolor = new THREE.Color();
	acolor.r = red;
	acolor.g = green;
	acolor.b = blue;
	//alert("acolor = " + acolor.r + " | " + acolor.g + " | " + acolor.b + " | ");
	
	var cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color: acolor } ) );
	//cone.matrixAutoUpdate = false;
	//cone.setDirection( dir );
	arrow.add( cone );

	return arrow;

}
//=============================================================================
			function AxesArrows () {
				var AxesGroup = new THREE.Object3D();
				var dir1 = new THREE.Vector3( 1, 0, 0 );
				var origin1 = new THREE.Vector3( 0, 0, 0 );
				var length1 = 1.0;//xmax/scale;
				var hex1 = 0xff0000;
				var arrowHelper1 = ArrowHelperMy( dir1, origin1, length1, 1, 0, 0 );
				AxesGroup.add( arrowHelper1 );

				var dir2 = new THREE.Vector3( 0, 1, 0 );
				var origin2 = new THREE.Vector3( 0, 0, 0 );
				var length2 = 1.0;//xmax/scale;
				var hex2 = 0x00ff00;
				var arrowHelper2 = ArrowHelperMy( dir2, origin2, length2, 0, 1, 0 );
				AxesGroup.add( arrowHelper2 );
			    
				var dir3 = new THREE.Vector3( 0, 0, 1 );
				var origin3 = new THREE.Vector3( 0, 0, 0 );
				var length3 = 1.0;//xmax/scale;
				var hex3 = 0x0000ff;
				var arrowHelper3 = ArrowHelperMy( dir3, origin3, length3, 0, 0, 1 );
				AxesGroup.add( arrowHelper3 );
				return AxesGroup;
			}
//==========================================================================================
    function calcMiddle(p1, p2) {
	var x = (p1.x + p2.x) / 2;
	var y = (p1.y + p2.y) / 2;
	var z = (p1.z + p2.z) / 2;
	return new THREE.Vector3(x,y,z);
    }
//=============================================================================
			function generatePointer( p1, p2,rad, r, g, b) {
				var x = (p1.x + p2.x) / 2;
				var y = (p1.y + p2.y) / 2;
				var z = (p1.z + p2.z) / 2;
				var len = Math.sqrt((p2.x - p1.x)*(p2.x - p1.x)+
						    (p2.y - p1.y)*(p2.y - p1.y)+
						    (p2.z - p1.z)*(p2.z - p1.z));
				var geometry1 = new THREE.CylinderGeometry( rad/*/scale*/, rad/*/scale*/, len, 32 );

				var material = new THREE.MeshPhongMaterial( {transparent: true});
				material.emissive.setRGB( 0.1, 0.1, 0.1 );
				material.specular.setRGB( 0.1, 0.1, 0.1 );
				material.color.setRGB( r, g, b );
				//material.specular.setRGB( r, g, b );
				var cylinder = new THREE.Mesh( geometry1, material );
				cylinder.position.set(x, y, z );
//----------------Cylinder rotation-----------------------------------------
				var alignVector=new THREE.Vector3((p2.x - p1.x),(p2.y - p1.y),(p2.z - p1.z));
				alignVector.cross( new THREE.Vector3( 0, 1, 0 ) );
				alignVector.normalize();
				var cylinderQuaternion = new THREE.Quaternion();
				cylinderQuaternion.setFromAxisAngle(alignVector, -Math.acos((p2.y - p1.y)/len));
				//cylinder.useQuaternion = true;
				cylinder.quaternion=cylinderQuaternion;
				return cylinder;
//--------------------------------------------------------------------------
			}
//=============================================================================
		function createBoundingBox(bBox) {
                        //bBox.max.x += gap/2;
                        //bBox.max.y += gap/2;
                        //bBox.max.z += gap/2;
                        //bBox.min.x -= gap/2;
                        bBox.min.y -= 0.0001;
                        bBox.max.x += 0.0001;
                        bBox.max.y += 0.0001;
                        bBox.max.z += 0.0001;
                        bBox.min.x -= 0.0001;
                        bBox.min.y -= 0.0001;
			var points = [];
			points[0] = new THREE.Vector3(bBox.min.x, bBox.min.y,  bBox.min.z);
			points[1] = new THREE.Vector3(bBox.max.x, bBox.min.y,  bBox.min.z);
			points[2] = new THREE.Vector3(bBox.max.x, bBox.max.y,  bBox.min.z);
			points[3] = new THREE.Vector3(bBox.min.x, bBox.max.y,  bBox.min.z);
			points[4] = new THREE.Vector3(bBox.min.x, bBox.min.y,  bBox.max.z);
			points[5] = new THREE.Vector3(bBox.max.x, bBox.min.y,  bBox.max.z);
			points[6] = new THREE.Vector3(bBox.max.x, bBox.max.y,  bBox.max.z);
			points[7] = new THREE.Vector3(bBox.min.x, bBox.max.y,  bBox.max.z);
			var hullGeometry = new THREE.ConvexGeometry(points);
			var meshMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, transparent: true, opacity: 0.4, blending: THREE.NormalBlending});
			meshMaterial.side = THREE.FrontSide;
			var cube = new THREE.Mesh(hullGeometry, meshMaterial);
                        bBox.min.z = Zoffset;
			cube.userData = bBox.size().x + " " + bBox.size().y + " " + bBox.size().z + " " +  bBox.min.x+ " " +  bBox.min.y+ " " +  bBox.min.z;
			cube.name = '0000';
			return cube;
		}
//==========================================================================================
		function LoadElement (url, Zo) {
			if (url == '') return;
                        Zoffset = Zo;
			var loader = new THREE.ColladaLoader();
			loader.load( url, function (  geometry, materials ) {
				var object = geometry.scene;
                                var skin = geometry.skins[ 0 ];
                                objects++;
				object.name = '3333';
				object.userData = objects;
				var bBox = new THREE.Box3().setFromObject(object);
				var cube = createBoundingBox(bBox);
                                collidableMeshList.push(cube);
                                cube.id = objects;
                                object.position.z = Zoffset;
                                cube.position.z = Zoffset;
                                for(i in object.children){
                                    object.children[i].castShadow = true;
                                    object.children[i].receiveShadow = true;
                                }
				scene.add(object);

			} );
		}
//==========================================================================================
    function rotateVector (vec, cam) {
         var ret = new THREE.Vector3();
         var p3  = new THREE.Vector3(1, 0, 0);
         var p2  = new THREE.Vector3(0, 0, 0);
         var p1  = cam.position;
         p1.z = 0;
         var angle = calcSimpleAngle (p1, p2, p3);
         ret.x =  vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
         ret.y =  vec.x * Math.sin(angle) + vec.y * Math.cos(angle);
         ret.z = Zoffset;
         return ret;
    }
//==========================================================================================
    function calcSimpleAngle (p1, p2, p3) {
            var p4  = new THREE.Vector3(0, 0, 1);
            p1.sub(p2).normalize();
            p3.sub(p2).normalize();
            var ac = p1.dot(p3);
            var ze = p3.cross(p1);
            var as = ze.length();
	    var angle = 0.0;
	    if (ac >= -0.999999) angle = Math.atan(as / (1.0 + ac)) * 2;
	    else angle = Math.PI * 2;
            if (p4.dot(ze) < 0) angle = - angle;
        return angle;
    }
//==========================================================================================
    function calcBoxDump(length, vect, normal) {
       var ret = new THREE.Vector3(0, 0, 0);
       var len = vect.length();
       var realvect = new THREE.Vector3(0, 0, 0);
       realvect.copy(vect);
       realvect.setLength(length);
       vect.sub(realvect);
       vect.addScalar(gap);
       if (vect.dot(normal) <= 0)  vect.negate();
       vect.projectOnVector(normal);
       ret.copy(vect);
//       							statsNode.innerHTML = 'dot = ' + dot
//								+ '<br>'
//								+ 'normal.x: ' + normal.x
//								+ '<br>'
//								+ 'normal.y: ' + normal.y
//								+ '<br>'
//								+ 'ret.x: ' + ret.x
//								+ '<br>'
//								+ 'ret.y: ' + ret.y;
       return ret;
    }
//==========================================================================================
    function calcApart(intersected, collided, constrains) {
       var center1 = getGeomeryCentre(intersected);
       var center2 = getGeomeryCentre(collided);
       center2.sub(center1);
       							statsNode.innerHTML = 
								  'center2.x: ' + center2.x
								+ '<br>'
								+ 'center2.y: ' + center2.y
								+ '<br>'
								+ 'center2.z: ' + center2.z;
    }
//==========================================================================================
    function getGeomeryCentre(obj) {
       var vect = new THREE.Vector3(0,0, 0);
       for ( var vertexIndex = 0; vertexIndex < obj.geometry.vertices.length; vertexIndex++ ) {
         vect.add(obj.geometry.vertices[vertexIndex]);
       }
       vect.divideScalar (obj.geometry.vertices.length);
       return vect.add(obj.position);
    }
//==========================================================================================
    function calcRoomDump(originPoint, delt) {
        //alert("originPoint = " + originPoint.x + " | " + originPoint.y + " | ");
        //alert("delt = " + delt.x + " | " + delt.y + " | ");
       var ret = new THREE.Vector3(0, 0, 0);
       ret.copy(originPoint);
       var cube = collidableMeshList[0]; 
        var xmax =  originPoint.x + delt.x*2;  
        var xmin =  originPoint.x;   
        var ymax =  originPoint.y + delt.y*2;   
        var ymin =  originPoint.y;
        //alert("xmin = " + xmin);
        if (xmax >=  len/2) ret.x =  len/2 - gap - delt.x*2;
        if (xmin <= -len/2) ret.x = -len/2 + gap;
        if (ymax >=  wid/2) ret.y =  wid/2 - gap - delt.y*2;
        if (ymin <= -wid/2) ret.y = -wid/2 + gap;
        //alert("ret = " + ret.x + " | " + ret.y + " | ");
        return ret;
    }
//==========================================================================================
    function onChangeZoffset(value) {
        Zoffset = value / 1000;
        alert ("Zoffset = " + Zoffset);
    }
//=============================================================================
			function addShadowedLight( x, y, z, color, intensity ) {

				var directionalLight = new THREE.DirectionalLight( color, intensity );
				directionalLight.position.set( x, y, z )
				scene.add( directionalLight );

				directionalLight.castShadow = true;
				//directionalLight.shadowCameraVisible = true;

				var d = len/2;
				directionalLight.shadowCameraLeft = -d;
				directionalLight.shadowCameraRight = d;
				directionalLight.shadowCameraTop = d;
				directionalLight.shadowCameraBottom = -d;

				directionalLight.shadowCameraNear = 1;
				directionalLight.shadowCameraFar = 10;

				directionalLight.shadowMapWidth = 1024;
				directionalLight.shadowMapHeight = 1024;

				directionalLight.shadowBias = -0.005;
				directionalLight.shadowDarkness = 0.5;
			}
//=============================================================================
	function onChangeWallPaper(wall_paper) {
            var texture = new THREE.ImageUtils.loadTexture( wall_paper,{} );
            for ( var i = 0; i < 4; i++ ) {
                if (i == 0 || i == 1) collidableMeshList[0].material.materials[i].map = rotateTexture(wall_paper);  
		else collidableMeshList[0].material.materials[i].map = texture;
                collidableMeshList[0].material.materials[i].map.wrapS = THREE.RepeatWrapping;
                collidableMeshList[0].material.materials[i].map.wrapT = THREE.RepeatWrapping;
                collidableMeshList[0].material.materials[i].map.repeat.set( 16, 16 );
            }
		render();
	}
//=============================================================================
	function onChangeFloor(floor) {
		collidableMeshList[0].material.materials[5].map = new THREE.ImageUtils.loadTexture( floor,{} );
                collidableMeshList[0].material.materials[5].map.wrapS = THREE.RepeatWrapping;
                collidableMeshList[0].material.materials[5].map.wrapT = THREE.RepeatWrapping;
                collidableMeshList[0].material.materials[5].map.repeat.set( 12, 12 );
		render();
	}
//=============================================================================
                            function rotateTexture(texture1) {
                                 var img = new Image();
                                 img.src = texture1;
                                 var imgWidth = imgHeight = img.width;
                                 var mapCanvas = document.createElement( 'canvas' );
                                 mapCanvas.width = mapCanvas.height = img.width;
                                 var ctx = mapCanvas.getContext( '2d' );
                                 ctx.translate( imgWidth / 2, imgHeight / 2 );
                                 ctx.rotate( Math.PI / 2 );
                                 ctx.translate( -imgWidth / 2, -imgHeight / 2 );
                                 ctx.drawImage( img, 0, 0, imgWidth, imgHeight );
                                 var text = new THREE.Texture( mapCanvas );
                                 text.needsUpdate = true;
                                 return text;
                            }
//=============================================================================
                            function onPushDoor(texture2) {
                                 var img = new Image();
                                 img.src = texture2;
                                 var ondoortexture = new THREE.ImageUtils.loadTexture( texture2,{} );
                                 var ratio = img.width / img.height;
                                 var hi = 2.1;
                                 var wi = hi * ratio;
                                 var door = createDoor (wi, hi, 0xffffff, ondoortexture);
                                 //alert ("door = " + door);
                                 door.rotation.x = Math.PI/2;
                                 door.position.y = -wid/2 + 0.001;
                                 door.position.z = hi/2;
                                 door.name = '2222';
                                 scene.add( door );
                            }
//=============================================================================
                            function onPushWindow(texture3) {
                                 var img = new Image();
                                 img.src = texture3;
                                 var ondoortexture = new THREE.ImageUtils.loadTexture( texture3,{} );
                                 var ratio = img.width / img.height;
                                 var hi = 1.1;
                                 var wi = hi * ratio;
                                 var window = createDoor (wi, hi, 0xffffff, ondoortexture);
                                 //alert ("door = " + door);
                                 window.rotation.x = Math.PI/2;
                                 window.position.y = -wid/2 + 0.001;
                                 window.position.z = hi/2 + 0.9;
                                 window.name = '2222';
                                 scene.add( window );
                            }
//=============================================================================
	function onPlanView() {
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 2.6*hig;
		camera.up = new THREE.Vector3( 0, -1, 0 );
		render();
	}
	function onSideView() {
		camera.position.x = 1.1*len;
		camera.position.y = 0;
		camera.position.z = hig/2;
		camera.up = new THREE.Vector3( 0, 0, 1 );
		render();
	}
	function onFrontView() {
		camera.position.x = 0;
		camera.position.y = 1.5*wid;
		camera.position.z = hig/2;
		camera.up = new THREE.Vector3( 0, 0, 1 );
		render();
	}
	function onIzomView() {
		camera.position.x = 0;
		camera.position.y = 1.1*wid;
		camera.position.z = hig/2;
		camera.up = new THREE.Vector3( 0, 0, 1 );
		render();
	}
//=============================================================================
