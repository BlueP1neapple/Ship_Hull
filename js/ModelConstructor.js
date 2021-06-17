    var norm = new THREE.Vector3( 0, 0, 0 );
//------------------------------------------------------------------------------------------
    function siftOriginal(pnts3d){    
        var cout = 0; 
        for(var i = pnts3d.length; i--; ) {
          x = pnts3d[i].x;
          y = pnts3d[i].y;
          if (pnts3d[i].z > 0) {
                vertices[cout] = [x, y];
                vert.push(pnts3d[i]);
                cout++;
          }
        }
	var parent = window.parent.document.getElementById("Right_menu");
	parent = parent.contentDocument.getElementById("dateOutput0");
	parent.value = vert.length.toFixed(0);
//        smoothSurface(vert);
    }
//------------------------------------------------------------------------------------------
    function drawOriginal(pnts3d){    
        var x, y;

        var triangles = Delaunay.triangulate(vertices);
	vert = rotateEigenValue(vert);
	var parent = window.parent.document.getElementById("Right_menu");
	parent = parent.contentDocument.getElementById("dateOutput1");
	parent.value = triangles.length.toFixed(0);

        var geom = new THREE.Geometry();
        geom.colorsNeedUpdate = true;
        var counter = 0;
        for(var i = triangles.length; i; ) {
          --i; var v1 = vert[triangles[i]]; var c1 = getRGB(v1.z);
          --i; var v2 = vert[triangles[i]]; var c2 = getRGB(v2.z); 
          --i; var v3 = vert[triangles[i]]; var c3 = getRGB(v3.z);
          
          geom.vertices.push(v1);
          geom.vertices.push(v2);
          geom.vertices.push(v3);
          var ind1 = 3*counter;
          var ind2 = ind1 + 1;
          var ind3 = ind2 + 1;
          
                geom.faces.push( new THREE.Face3( ind1, ind2, ind3 ) );
                geom.faces[counter].vertexColors[0] = c1;
                geom.faces[counter].vertexColors[1] = c2;
                geom.faces[counter].vertexColors[2] = c3;
                counter++;
        }
        geom.mergeVertices();
        geom.computeFaceNormals();
        geom.computeVertexNormals();
	geom.computeBoundingBox();
	var material = new THREE.MeshPhongMaterial( { wireframe: false, vertexColors: THREE.VertexColors, side: THREE.DoubleSide } );
        return new THREE.Mesh( geom, material );
    }
//------------------------------------------------------------------------------------------
    function smoothSurface (vert) {
	for (var i = 1; i < vert.length - 1; i++) {
	    var vec1x = vert[i - 1].x - vert[i].x;
	    var vec1y = vert[i - 1].y - vert[i].y;
	    var vec1z = vert[i - 1].z - vert[i].z;
	    var vec2x = vert[i + 1].x - vert[i].x;
	    var vec2y = vert[i + 1].y - vert[i].y;
	    var vec2z = vert[i + 1].z - vert[i].z;
	    var vv1 = Math.sqrt(vec1x * vec1x + vec1y * vec1y + vec1z * vec1z);
	    var vv2 = Math.sqrt(vec2x * vec2x + vec2y * vec2y + vec2z * vec2z);
	    var acos = (vec1x * vec2x + vec1y * vec2y + vec1z * vec2z) / (vv1 * vv2);
	    if (acos < 0) {
		if (acos > -0.95) {
			vert[i].x = (vert[i - 1].x + vert[i + 1].x) / 2.0;
			vert[i].y = (vert[i - 1].y + vert[i + 1].y) / 2.0;
			vert[i].z = (vert[i - 1].z + vert[i + 1].z) / 2.0;
		}
	    }
		//alert (" i = " + i + "  acos = " + acos);
	}
    }
//------------------------------------------------------------------------------------------
    function getRGB (lev) {
	    
	    var poin = 0;
	    var level = lev;
	    //var level = (lev - zmin) / (zmax - zmin);
	    //alert("level = " + level);
	    
	    if (                level <= 0.05) poin = 1;
	    if (level >  0.05 && level <= 0.15) poin = 2;
	    if (level >  0.15 && level <= 0.3) poin = 3;
	    if (level >  0.3 && level <= 0.4) poin = 4;
	    if (level >  0.4 && level <= 0.5) poin = 5;
	    if (level >  0.5 && level <= 0.6) poin = 6;
	    if (level >  0.6 && level <= 0.7) poin = 7;
	    if (level >  0.7 && level <= 0.8) poin = 8;
	    if (level >  0.8 && level <= 0.9) poin = 9;
	    if (level >  0.9                ) poin = 10;

	    var rc = 0.0;
	    var gc = 0.0;
	    var bc = 0.0;
	    switch (poin) {
		    case 0:  rc = 0.0;         gc = 0.0;          bc = 50.0/255.0; break;
		    case 1:  rc = 0.0;         gc = 80.0/255.0;   bc = 0.0; break;
		    case 2:  rc = 57.0/255.0;  gc = 136.0/255.0;  bc = 0.0; break;
		    case 3:  rc = 141.0/255.0; gc = 208.0/255.0;  bc = 2.0/255.0; break;
		    case 4:  rc = 193.0/255.0; gc = 203.0/255.0;  bc = 7.0/255.0; break;
		    case 5:  rc = 247.0/255.0; gc = 222.0/255.0;  bc = 4.0/255.0; break;
		    case 6:  rc = 220.0/255.0; gc = 201.0/255.0;  bc = 31.0/255.0; break;
		    case 7:  rc = 191.0/255.0; gc = 156.0/255.0;  bc = 24.0/255.0; break;
		    case 8:  rc = 179.0/255.0; gc = 145.0/255.0;  bc = 36.0/255.0; break;
		    case 9:  rc = 156.0/255.0; gc = 123.0/255.0;  bc = 32.0/255.0; break;
		    case 10: rc = 143.0/255.0; gc = 103.0/255.0;  bc = 34.0/255.0; break;
	    }
    //var col = ~~ ( rc * 255 ) << 16 ^ ~~ ( gc * 255 ) << 8 ^ ~~ ( bc * 255 );
    //var col = new THREE.Color().setRGB(rc, gc, bc);	
    //alert("col = " + col.r + "|" + col.g + "|" + col.b );
    //var col = new THREE.Color().setRGB(0.10, 0.5, 0.65);
    var col = new THREE.Color().setRGB(0.6, 0.6, 0.8);
    return col;
    }
//------------------------------------------------------------------------------------------
	function parseORIGINAL (str, mirror) {
		var temp = new Array();
		 var lines = str.split("\n");
	     alert( "lines.length " + lines.length);
		linestoread = lines.length;
	      alert( "linestoread = " + linestoread);
		var tokens_0 = lines[0].replace(/^\s+/, "").replace(/\s+/g," ").split(" ");
		var y_count = tokens_0.length;
		verticesCount = (linestoread - 1) * (y_count - 1);
		alert( "y_count = " + y_count +"  verticesCount = " + verticesCount);
		for (var i = 1; i < linestoread; i++) {
		    var line = lines[i];
		    var tokens = line.replace(/^\s+/, "").replace(/\s+/g," ").split(" ");
		    var xx = tokens[0];
		    for (var j = 1; j < y_count; j++) {
			var pin = new THREE.Vector3();
			var yy = tokens_0[j-1]; 
			pin.x = xx;
			pin.y = yy; 
			if (j < tokens.length)  pin.z = tokens[j];
			else 		        pin.z = 0;
			temp.push(pin);
		    }
		}
		if (mirror) {
		    var cout = 0;
		    for (var i = 1; i < linestoread - 1; i++) {
			for (var j = 0; j < y_count; j++) {
			    //alert( " verticesCount - y_count * i + j = " + (verticesCount - y_count * i + j) );
			    var tt = new THREE.Vector3();
			    tt.x =   temp[verticesCount - y_count * i + j ].x;
			    tt.y = - temp[verticesCount - y_count * i + j ].y;
			    tt.z =   temp[verticesCount - y_count * i + j ].z;
			    //alert( "tt.x = " + tt.x +"  tt.y = " + tt.y + "  tt.z = " + tt.z);
			    points3d.push(tt);
			    //alert( "x = " + points3d[cout].x +"  y = " + points3d[cout].y + "  z = " + points3d[cout].z);
			    cout++;
			}
		    }
		}
		for (var i = 0; i < temp.length; i++)  points3d.push(temp[i]);
		
		    //alert( " cout = " + cout + "points3d.length " + points3d.length);
		    verticesCount = points3d.length;
		    //alert( "verticesCount " + verticesCount);
		xmax = ymax = zmax = - 100000000;
		xmin = ymin = zmin = 100000000;
		for (var i = 0; i < verticesCount; i++) {
		    xmax = Math.max(xmax, points3d[i].x);
		    xmin = Math.min(xmin, points3d[i].x);
		    ymax = Math.max(ymax, points3d[i].y);
		    ymin = Math.min(ymin, points3d[i].y);
		    zmax = Math.max(zmax, points3d[i].z);
		    zmin = Math.min(zmin, points3d[i].z);
		}
		scale = zmax - zmin;
		//scale = Math.max(xmax, ymax);
		//alert( "scale = " + scale);
		for (var i = 0; i < verticesCount; i++) {
			points3d[i].x = points3d[i].x / scale;
			points3d[i].y = points3d[i].y / scale;
			points3d[i].z = points3d[i].z / scale;
		}
	      };
//------------------------------------------------------------------------------------------
	function parseMEASURES (str) {
	    var lines = str.split("\n");
		scale = 3500;
		xmax = ymax = zmax = - 100000000;
		xmin = ymin = zmin = 100000000;
	    for (var i = 0; i < lines.length - 1; i++) {
	       var tokens = lines[i].replace(/^\s+/, "").replace(/\s+/g," ").split(" ");
	       var pin = new THREE.Vector3();
	       var pip = new THREE.Vector3();
	       pin.x = tokens[0];// / scale;
	       pin.y = tokens[2];// / scale; 
	       pin.z = tokens[1];// / scale; 
	       cloud3d.push(pin);
		    xmax = Math.max(xmax, pin.x);
		    xmin = Math.min(xmin, pin.x);
		    ymax = Math.max(ymax, pin.y);
		    ymin = Math.min(ymin, pin.y);
		    zmax = Math.max(zmax, pin.z);
		    zmin = Math.min(zmin, pin.z);
	       data.push(pip.copy(pin));
	    }
		scale = (xmax - xmin) / 5;
	    //alert( "scale = " + scale);
 	   for (var i = 0; i < lines.length - 1; i++) {
			data[i].x = data[i].x / scale;
			data[i].y = data[i].y / scale;
			data[i].z = data[i].z / scale;
		}
 	   for (var i = 0; i < lines.length - 1; i++) {
			cloud3d[i].x = cloud3d[i].x / scale;
			cloud3d[i].y = cloud3d[i].y / scale;
			cloud3d[i].z = cloud3d[i].z / scale;
		}
	}
//=============================================================================
		function getXmlHttp() {
		    var xmlhttp;
		    try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		    } catch (e) {
			try {
			    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
			    xmlhttp = false;
			}
		    }
		    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
			xmlhttp = new XMLHttpRequest();
		    }
		    return xmlhttp;
		}
//=============================================================================
	function rotateEigenValue(atoms) {
	    this.Ix;
	    this.Iy;
	    this.Iz;
	    this.A = [[0,0,0],
		      [0,0,0],
		      [0,0,0]];
	    this.mass = 1.0;
	    this.massa = 0.0;
	    this.xc = 0;
	    this.yc = 0;
	    this.zc = 0;
	    for ( var j = 0; j < atoms.length - 1; j ++ ) {
				xc += atoms[j].x * mass;
				yc += atoms[j].y * mass;
				zc += atoms[j].z * mass;
				massa += mass;
			}
			xc /=  massa;
			yc /=  massa;
			zc /=  massa;
	    for ( var i = 0; i < atoms.length - 1; i ++ ) {
		var xa = atoms[i].x - xc;
		var ya = atoms[i].y - yc;
		var za = atoms[i].z - zc;
		A[0][0]+= mass * (ya * ya + za * za);
		A[0][1]-= mass * xa * ya;
		A[2][0]-= mass * xa * za;
		A[1][1]+= mass * (xa * xa + za * za);
		A[2][1]-= mass * ya * za;
		A[2][2]+= mass * (xa * xa + ya * ya);
		atoms[i].x = xa;
		atoms[i].y = ya;
		atoms[i].z = za;
		}
	    A [1][0] = A [0][1];
	    A [0][2] = A [2][0];
	    A [1][2] = A [2][1];
	    var ev = numeric.eig(A);
	    SortPrincipalsAscending(ev);
	    Ix = ev.lambda.x[0];
	    Iy = ev.lambda.x[1];
	    Iz = ev.lambda.x[2];
	    var first =new THREE.Vector3(ev.E.x[0][0],ev.E.x[1][0],ev.E.x[2][0]);
	    var second=new THREE.Vector3(ev.E.x[0][1],ev.E.x[1][1],ev.E.x[2][1]);
	    var norma  =new THREE.Vector3(ev.E.x[0][2],ev.E.x[1][2],ev.E.x[2][2]);
	    var third = new THREE.Vector3();
	    third.crossVectors( second, norma );
	    ev.E.x[0][0]  = third.x;
	    ev.E.x[1][0]  = third.y;
	    ev.E.x[2][0]  = third.z;
	    if ((ev.E.x[0][0]*ev.E.x[1][1]*ev.E.x[2][2]) != 0) {
		for ( var i = 0; i < atoms.length; i ++ ) {
		    var a = atoms[i].x * ev.E.x[0][0] + atoms[i].y * ev.E.x[1][0] + atoms[i].z * ev.E.x[2][0];
		    var b = atoms[i].x * ev.E.x[0][1] + atoms[i].y * ev.E.x[1][1] + atoms[i].z * ev.E.x[2][1];
		    var c = atoms[i].x * ev.E.x[0][2] + atoms[i].y * ev.E.x[1][2] + atoms[i].z * ev.E.x[2][2];
		    atoms[i].x = a;
		    atoms[i].y = b;
		    atoms[i].z = c;
		}
	    }
	    return atoms;
	}
//=============================================================================
	function getCenter(atoms) {
	    var xci = 0;
	    var yci = 0;
	    var zci = 0;
	    massa = 0;
	    for ( var j = 0; j < atoms.length - 1; j ++ ) {
				xci += atoms[j].x;
				yci += atoms[j].y;
				zci += atoms[j].z;
				massa ++;
			}
			xci /=  massa;
			yci /=  massa;
			zci /=  massa;
	return new THREE.Vector3(xci, yci, zci)
	}
//=============================================================================
	function getEigenValueMatrix(atoms) {
	    this.Ix;
	    this.Iy;
	    this.Iz;
	    this.A = [[0,0,0],
		      [0,0,0],
		      [0,0,0]];
	    this.mass = 1.0;
	    this.massa = 0.0;
	    this.xc = 0;
	    this.yc = 0;
	    this.zc = 0;
	    for ( var j = 0; j < atoms.length - 1; j ++ ) {
				xc += atoms[j].x * mass;
				yc += atoms[j].y * mass;
				zc += atoms[j].z * mass;
				massa += mass;
			}
			xc /=  massa;
			yc /=  massa;
			zc /=  massa;
	    for ( var i = 0; i < atoms.length - 1; i ++ ) {
		var xa = atoms[i].x - xc;
		var ya = atoms[i].y - yc;
		var za = atoms[i].z - zc;
		A[0][0]+= mass * (ya * ya + za * za);
		A[0][1]-= mass * xa * ya;
		A[2][0]-= mass * xa * za;
		A[1][1]+= mass * (xa * xa + za * za);
		A[2][1]-= mass * ya * za;
		A[2][2]+= mass * (xa * xa + ya * ya);
		//atoms[i].x = xa;
		//atoms[i].y = ya;
		//atoms[i].z = za;
		}
	    A [1][0] = A [0][1];
	    A [0][2] = A [2][0];
	    A [1][2] = A [2][1];
	    var ev = numeric.eig(A);
	    SortPrincipalsAscending(ev);
	    Ix = ev.lambda.x[0];
	    Iy = ev.lambda.x[1];
	    Iz = ev.lambda.x[2];
	    var first =new THREE.Vector3(ev.E.x[0][0],ev.E.x[1][0],ev.E.x[2][0]);
	    var second=new THREE.Vector3(ev.E.x[0][1],ev.E.x[1][1],ev.E.x[2][1]);
	    var norma  =new THREE.Vector3(ev.E.x[0][2],ev.E.x[1][2],ev.E.x[2][2]);
	    var third = new THREE.Vector3();
	    third.crossVectors( second, norma );
	    ev.E.x[0][0]  = third.x;
	    ev.E.x[1][0]  = third.y;
	    ev.E.x[2][0]  = third.z;
	    return ev.E.x;
	}
//=============================================================================
    function originalMeshbyEV() {
	scene.add(mesh);
	var distan = Math.sqrt(getDistanceFromMesh(mesh, cloud3d)) * scale;
	var parent = window.parent.document.getElementById("Right_menu");
	parent = parent.contentDocument.getElementById("dateOutput3");
	parent.value = distan.toFixed(2);
    }
//=============================================================================
    function showHidePoints() {
	if (!showhide) {scene.add(pointcloud); showhide = true}
	else	      {scene.remove(pointcloud); showhide = false}
    }
//=============================================================================
    function addMeasure() {
	if (!showmes) {scene.add(pointcloud3); showmes = true}
	else	     {scene.remove(pointcloud3); showmes = false}
    }
/*/------------------------------------------------------------------------------------------
    function drawPointCloud(pnts3d, colora, tex){
	sprite = [THREE.ImageUtils.loadTexture( "blackcross.png" ),
		      THREE.ImageUtils.loadTexture( "redcross.png" ),
		      THREE.ImageUtils.loadTexture( "yellowpoint.png" )];
	var geomet =  new THREE.Geometry();
	var size = 35;
	for( var jj = 0; jj < pnts3d.length; jj++ ) geomet.vertices.push( pnts3d );	
	var materi = new THREE.PointCloudMaterial( {  size: size, map: sprite[tex], blending: THREE.AdditiveBlending, depthTest: true, transparent : false  } );
	materi.color.setHSL( 0.95, 0.1, 0.5 );
	return new THREE.PointCloud( geomet, materi );
    }*/
//------------------------------------------------------------------------------------------
    function drawPointCloud(pnts3d, colora, tex){
	var colors = new Float32Array( pnts3d.length*3 );
	var positions = new Float32Array( pnts3d.length*3 );
	var size = 0.015;
	for( var jj = 0; jj < pnts3d.length; jj++ ) {
			var intensity = 100;
			positions[ 3 * jj ] = pnts3d[jj].x;
			positions[ 3 * jj + 1 ] = pnts3d[jj].y;
			positions[ 3 * jj + 2 ] = pnts3d[jj].z;
			colors[ 3 * jj ] = colora.r * intensity;
			colors[ 3 * jj + 1 ] = colora.g * intensity;
			colors[ 3 * jj + 2 ] = colora.b * intensity;
	}
	
	var sprite = [THREE.ImageUtils.loadTexture( "js/blackcross.png" ),
		      THREE.ImageUtils.loadTexture( "js/redcross.png" ),
		      //THREE.ImageUtils.loadTexture( "js/yellowpoint.png" ),
		      THREE.ImageUtils.loadTexture( "js/greencircle.jpg" ),
		      THREE.ImageUtils.loadTexture( "js/bluetriangle.jpg" )];
	var geomet = new THREE.BufferGeometry();
	geomet.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geomet.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	geomet.computeBoundingBox();
	geomet.verticesNeedUpdate = true;
	var materi = new THREE.PointCloudMaterial( {  size: size, map: sprite[tex], blending: THREE.AdditiveBlending, depthTest: true, transparent : false  } );
	var particle = new THREE.PointCloud( geomet, materi );
	//colors.splice(0, pnts3d.length*3);
	//positions.splice(0, pnts3d.length*3);
	return particle;
    }
//=============================================================================
    function rotateModelbyEV() {
	scene.remove(pointcloud1);
	var temp = new Array();
	temp = rotatebyEVMatrix (cloud3d, matri);
	pointcloud1 = drawPointCloud(temp, new THREE.Color( 1,0,0 ),1);
	pointcloud1.name = "Cloud1";
	scene.add(pointcloud1);
/* 	var ce = getCenter(cloud3d)
	var ma = new THREE.Matrix4();
	////alert(" position =" + pointcloud1.geometry.getAttribute ( 'position' ).length);
	//ma.set(matri[0][0], matri[1][0], matri[2][0],-ce.x,
	//       matri[0][1], matri[1][1], matri[2][1],-ce.y,
	//       matri[0][2], matri[1][2], matri[2][2],-ce.z,
	//       0,0,0,1);
	ma.set(1, 0, 0,-ce.x,
	       0, 1, 0,-ce.y,
	       0, 0, 1,-ce.z,
	       0, 0, 0, 1);
	pointcloud1.geometry.applyMatrix ( ma );
	ma.set(matri[0][0], matri[1][0], matri[2][0],0,
	       matri[0][1], matri[1][1], matri[2][1],0,
	       matri[0][2], matri[1][2], matri[2][2],0,
	       0,0,0,1);
	pointcloud1.geometry.applyMatrix ( ma );
	render;*/
  }
//=============================================================================
	function rotatebyEVMatrix (atoms, matrix) {
	    var temp = atoms.slice(0);
	    if (eigen_key) return temp;
	    if ((matrix[0][0]*matrix[1][1]*matrix[2][2]) != 0) {
		for ( var i = 0; i < atoms.length; i ++ ) {
		temp[i].x = temp[i].x - xc;
		temp[i].y = temp[i].y - yc;
		temp[i].z = temp[i].z - zc;
		    var a = temp[i].x * matrix[0][0] + temp[i].y * matrix[1][0] + temp[i].z * matrix[2][0];
		    var b = temp[i].x * matrix[0][1] + temp[i].y * matrix[1][1] + temp[i].z * matrix[2][1];
		    var c = temp[i].x * matrix[0][2] + temp[i].y * matrix[1][2] + temp[i].z * matrix[2][2];
		    temp[i].x = a;
		    temp[i].y = b;
		    temp[i].z = c;
		}
	    }
	    eigen_key = true;
	    return temp;
	}
//================================================================================
	function SortPrincipalsAscending(ev) {
	    for ( var i = 2; i >= 0; i -- ) {
		for ( var j = 0; j < i+1; j ++ ) {
		    if (ev.lambda.x[j] > ev.lambda.x[i]) {
			var temp = ev.lambda.x[j];
			ev.lambda.x[j] = ev.lambda.x[i];
			ev.lambda.x[i] = temp;
			for ( var k = 0; k < 3; k ++ ) {
			    temp = ev.E.x[k][j];
			    ev.E.x[k][j] = ev.E.x[k][i];
			    ev.E.x[k][i] = temp;
			}
                    }
		}
	    }
	}
//=============================================================================
//    function rotatebyMatrix4loc(cloud3d, matr) {
//	alert(" cloud3d.length = " + cloud3d.length);
//	for ( var i = 0; i < cloud3d.length; i ++ ) {
//	    var a = cloud3d[i].x * matr[0] + cloud3d[i].y * matr[4] + cloud3d[i].z * matr[8];
//	    var b = cloud3d[i].x * matr[1] + cloud3d[i].y * matr[5] + cloud3d[i].z * matr[9];
//	    var c = cloud3d[i].x * matr[2] + cloud3d[i].y * matr[6] + cloud3d[i].z * matr[10];
//	    cloud3d[i].x = a;
//	    cloud3d[i].y = b;
//	    cloud3d[i].z = c;
//	}
//	alert(" cloud3d.length once again = " + cloud3d.length);
//	return cloud3d;
//    }
//=============================================================================
    function rotateaboutXbyMatrix4() {
	//////var matr = new THREE.Matrix4();
	//////matr.set(1, 0, 0, 0,
	//////	 0,-1, 0, 0,
	//////	 0, 0,-1, 0,
	//////	 0, 0, 0, 1);
	//////pointcloud1.geometry.applyMatrix ( matr );
	var matr = [1, 0, 0, 0,
		 0,-1, 0, 0,
		 0, 0,-1, 0,
		 0, 0, 0, 1];
	scene.remove(pointcloud1);
	for ( var i = 0; i < cloud3d.length; i ++ ) {
	    var a = cloud3d[i].x * matr[0] + cloud3d[i].y * matr[4] + cloud3d[i].z * matr[8];
	    var b = cloud3d[i].x * matr[1] + cloud3d[i].y * matr[5] + cloud3d[i].z * matr[9];
	    var c = cloud3d[i].x * matr[2] + cloud3d[i].y * matr[6] + cloud3d[i].z * matr[10];
	    cloud3d[i].x = a;
	    cloud3d[i].y = b;
	    cloud3d[i].z = c;
	}
	pointcloud1 = drawPointCloud(cloud3d, new THREE.Color( 1,0,0 ), 1);
	scene.add(pointcloud1);
	var distan = Math.sqrt(getDistanceFromMesh(mesh, cloud3d)) * scale;
	var parent = window.parent.document.getElementById("Right_menu");
	parent = parent.contentDocument.getElementById("dateOutput4");
	parent.value = distan.toFixed(2);
	pointcloud2 = drawPointCloud(mirror, new THREE.Color( 0.5,0.5,0 ), 2);
	scene.add( pointcloud2 );
   }
//=============================================================================
    function rotateaboutYbyMatrix4() {
	var matr = [ -1, 0, 0, 0,
		     0, 1, 0, 0,
		     0, 0,-1, 0,
		     0, 0, 0, 1];
	scene.remove(pointcloud1);
	scene.remove(pointcloud2);
	for ( var i = 0; i < cloud3d.length; i ++ ) {
	    var a = cloud3d[i].x * matr[0] + cloud3d[i].y * matr[4] + cloud3d[i].z * matr[8];
	    var b = cloud3d[i].x * matr[1] + cloud3d[i].y * matr[5] + cloud3d[i].z * matr[9];
	    var c = cloud3d[i].x * matr[2] + cloud3d[i].y * matr[6] + cloud3d[i].z * matr[10];
	    cloud3d[i].x = a;
	    cloud3d[i].y = b;
	    cloud3d[i].z = c;
	}
	pointcloud1 = drawPointCloud(cloud3d, new THREE.Color( 1,0,0 ), 1);
	scene.add(pointcloud1);
	var distan = Math.sqrt(getDistanceFromMesh(mesh, cloud3d)) * scale;
	var parent = window.parent.document.getElementById("Right_menu");
	parent = parent.contentDocument.getElementById("dateOutput4");
	parent.value = distan.toFixed(2);
   }
//=============================================================================
    function rotateaboutZbyMatrix4() {
	var matr = [ -1, 0, 0, 0,
		     0,-1, 0, 0,
		     0, 0, 1, 0,
		     0, 0, 0, 1];
	scene.remove(pointcloud1);
	scene.remove(pointcloud2);
	for ( var i = 0; i < cloud3d.length; i ++ ) {
	    var a = cloud3d[i].x * matr[0] + cloud3d[i].y * matr[4] + cloud3d[i].z * matr[8];
	    var b = cloud3d[i].x * matr[1] + cloud3d[i].y * matr[5] + cloud3d[i].z * matr[9];
	    var c = cloud3d[i].x * matr[2] + cloud3d[i].y * matr[6] + cloud3d[i].z * matr[10];
	    cloud3d[i].x = a;
	    cloud3d[i].y = b;
	    cloud3d[i].z = c;
	}
	pointcloud1 = drawPointCloud(cloud3d, new THREE.Color( 1,0,0 ), 1);
	scene.add(pointcloud1);
	var distan = Math.sqrt(getDistanceFromMesh(mesh, cloud3d)) * scale;
	var parent = window.parent.document.getElementById("Right_menu");
	parent = parent.contentDocument.getElementById("dateOutput4");
	parent.value = distan.toFixed(2);
   }
//================================================================================
    function closestToManifold(verts, cloud3d) {
	var di = 10000000; ii = 0;
	for ( var i = 0; i < verts.length - 1; i ++ ) {
	    if (verts[i].distanceTo(cloud3d) < di) ii = i;
	    di = Math.min(di, verts[i].distanceTo(cloud3d));
	}
	mirror.push(verts[ii]);
	return di;
    }				
//================================================================================
// Calculates a distance between point and plane
    function distancePointPlane(sPos,  anorma, dp) {
	    return (anorma.x*sPos.x + anorma.y*sPos.y + anorma.z*sPos.z + dp/1.0);
    }
//================================================================================
    function getDistanceFromMesh(mesh2, cloud3d) {
	var trgls = mesh2.geometry.faces;
	var verts = mesh2.geometry.vertices;
	var di = 0;
	mirror.splice(0, mirror.length);
	springs.splice(0, springs.length);
	scene.remove(lines);
	var distance = 0; cout = 0; maxdist = - 100000000;
        for(var i = 0; i < cloud3d.length-1; i ++ ) {
	    var didi = 10000000;
	    for ( var j = 0; j < trgls.length-1; j ++ ) {
		var trian = new THREE.Triangle(verts[trgls[j].a], verts[trgls[j].b], verts[trgls[j].c]);
		var plan = trian.plane();
		var po = plan.projectPoint(cloud3d[i]);
		var dis = po.distanceTo(cloud3d[i]);
		    di = plan.distanceToPoint(cloud3d[i]);
		if (trian.containsPoint (po)) {
		    didi = Math.min(di, didi);
		    if (!isNaN(didi)) { mirror.push(po); springs.push(new THREE.Vector2(i, cout)); cout++; }
		}
	    }
	    if (didi == 10000000) {
		di = closestToManifold(verts, cloud3d[i]);
		springs.push(new THREE.Vector2(i, cout)); cout++;
	    }
	maxdist = Math.max(maxdist, di);
	}
	distance = calcDistance();
	return distance;
    }
//================================================================================
    function calcDistance() {
	var dista = 0;
	var maxl = -1000;
        for(var i = 0; i < springs.length; i ++ ) {
	    var lin = new THREE.Line3(cloud3d[springs[i].x], mirror[springs[i].y]);
	     maxl = Math.max(maxl,lin.distance ());
	     dista += lin.distanceSq () ;
	}
	//alert (" dista = " + dista + " maxl = " + maxl*scale);
	return dista ;
    }
//================================================================================
    function drawLines() {
	var materia = new THREE.LineBasicMaterial( { color: new THREE.Color().setRGB(0, 0, 0), linewidth: 1 } )
	geometry = new THREE.Geometry();
	var lenin = 0;
	    for ( i = 0; i < springs.length; i ++ ) {
		geometry.vertices.push( cloud3d[springs[i].x] );
		geometry.vertices.push( mirror[springs[i].y] );
		lenin += new THREE.Line3(cloud3d[springs[i].x], mirror[springs[i].y]).distance ();
	    }
	lines = new THREE.Line( geometry, materia, THREE.LinePieces );
	scene.add( lines );
    }
//================================================================================
    function getFarVertex() {
	var maxLength = -1000000;
	farvertex = 0;
        for(var i = 0; i < cloud3d.length; i ++ ) {
	    var lin = cloud3d[i].length();//new THREE.Line3(cloud3d[i], new THREE.Vector3(0,0,0)).distance ();
	    if (lin > maxLength) {farvertex = i; maxLength = lin;}
	}
	norm = cloud3d[farvertex];
	return maxLength;
    }
//================================================================================
    function getRotMatrix(i) {
        var vec = new THREE.Vector3( 0, 0, 0 );
	var tang = new THREE.Vector3( 0, 0, 0 );
	var nor  = new THREE.Vector3( 0, 0, 0 )
	vec.copy(norm);
	tang.copy(norm); // stable point
	nor.copy(cloud3d[i]);// target point
	var koef = nor.length() / lenta;
	tang.normalize ();
	nor.normalize ();
	tang.cross(nor);
	tsin = tang.length();// sin of angle between two vectors to points
	vec.normalize ();
	tcos = vec.dot(nor);// cos of angle between two vectors to points
	nor.copy(tang); // vector about that we rotate 
	var a = [(nor.x*nor.x + (1 - nor.x*nor.x)*tcos)*koef,
		 (nor.x*nor.y*(1 - tcos) - nor.z*tsin)*koef,
		 (nor.x*nor.z*(1 - tcos) + nor.y*tsin)*koef,
		 (nor.x*nor.y*(1 - tcos) + nor.z*tsin)*koef,
		 (nor.y*nor.y + (1 - nor.y*nor.y)*tcos)*koef,
		 (nor.y*nor.z*(1 - tcos) - nor.x*tsin)*koef,
		 (nor.x*nor.z*(1 - tcos) - nor.y*tsin)*koef,
		 (nor.y*nor.z*(1 - tcos) + nor.x*tsin)*koef,
		 (nor.z*nor.z + (1 - nor.z*nor.z)*tcos)*koef];
	 return a;
    }
//================================================================================
    function getFitMatrix() {
	var matr1 = [[0, 0, 0, 0, 0, 0],
		     [0, 0, 0, 0, 0, 0],
		     [0, 0, 0, 0, 0, 0],
		     [0, 0, 0, 0, 0, 0],
		     [0, 0, 0, 0, 0, 0],
		     [0, 0, 0, 0, 0, 0]];
	var right = [0,0,0,0,0,0];
	lenta = getFarVertex();
	for ( i = 0; i < springs.length; i ++ ) {
	    var a = getRotMatrix(springs[i].x);
	    matr1[0][0] += a[0] * a[0] + a[3] * a[3] + a[6] * a[6];
	    matr1[0][1] += a[1] * a[0] + a[4] * a[3] + a[7] * a[6];
	    matr1[0][2] += a[2] * a[0] + a[5] * a[3] + a[8] * a[6];
	    matr1[0][3] += a[0];
	    matr1[0][4] += a[3];
	    matr1[0][5] += a[6];
	    right[0] -= a[0] * (cloud3d[springs[i].x].x - mirror[springs[i].y].x) +
			a[3] * (cloud3d[springs[i].x].y - mirror[springs[i].y].y) +
			a[6] * (cloud3d[springs[i].x].z - mirror[springs[i].y].z);
	    matr1[1][0] += a[0] * a[1] + a[3] * a[4] + a[6] * a[7];
	    matr1[1][1] += a[1] * a[1] + a[4] * a[4] + a[7] * a[7];
	    matr1[1][2] += a[2] * a[1] + a[5] * a[4] + a[8] * a[7];
	    matr1[1][3] += a[1];
	    matr1[1][4] += a[4];
	    matr1[1][5] += a[7];
	    right[1] -= a[1] * (cloud3d[springs[i].x].x - mirror[springs[i].y].x) +
			a[4] * (cloud3d[springs[i].x].y - mirror[springs[i].y].y) +
			a[7] * (cloud3d[springs[i].x].z - mirror[springs[i].y].z);
	    matr1[2][0] += a[0] * a[2] + a[3] * a[5] + a[6] * a[8];
	    matr1[2][1] += a[1] * a[2] + a[4] * a[5] + a[7] * a[8];
	    matr1[2][2] += a[2] * a[2] + a[5] * a[5] + a[8] * a[8];
	    matr1[2][3] += a[2];
	    matr1[2][4] += a[5];
	    matr1[2][5] += a[8];
	    right[2] -= a[2] * (cloud3d[springs[i].x].x - mirror[springs[i].y].x) +
			a[5] * (cloud3d[springs[i].x].y - mirror[springs[i].y].y) +
			a[8] * (cloud3d[springs[i].x].z - mirror[springs[i].y].z);
	    matr1[3][0] += a[0];
	    matr1[3][1] += a[1];
	    matr1[3][2] += a[2];
	    matr1[3][3] += 1;
	    matr1[3][4] += 0;
	    matr1[3][5] += 0;
	    right[3] -= cloud3d[springs[i].x].x;
	    matr1[4][0] += a[3];
	    matr1[4][1] += a[4];
	    matr1[4][2] += a[5];
	    matr1[4][3] += 0;
	    matr1[4][4] += 1;
	    matr1[4][5] += 0;
	    right[4] -= cloud3d[springs[i].x].y;
	    matr1[5][0] += a[6];
	    matr1[5][1] += a[7];
	    matr1[5][2] += a[8];
	    matr1[5][3] += 0;
	    matr1[5][4] += 0;
	    matr1[5][5] += 1;
	    right[5] -= cloud3d[springs[i].x].z;
	}
	var Ainv = numeric.inv(matr1);
	var delta = numeric.dot(Ainv,right);
	matr1.splice(0, matr1.length);
	right.splice(0, right.length);
	Ainv.splice(0, Ainv.length);
	return delta;
    }
//================================================================================

    function fitbySGM() {
	var old_dist = 10000000;
	var iter = 0;
	var epsil = 1;
	var start = new Date();
	var parent = window.parent.document.getElementById("Right_menu");
	do {
	    var delta = getFitMatrix();
	    var check = new Array(springs.length);
	    for ( i = 0; i < springs.length; i++ ) {
		check[i] = 0;
		for ( j = 0; j < i; j++ ) 
		    if (springs[i].x == springs[j].x) check[i] = 1;
	    }
	    for ( i = 0; i < springs.length; i++ ) {
		if (check[i] == 0) {
		    var aa = getRotMatrix(springs[i].x);
		    cloud3d[springs[i].x].x += aa[0] * delta[0] + aa[1] * delta[1] + aa[2] * delta[2] + delta[3];
		    cloud3d[springs[i].x].y += aa[3] * delta[0] + aa[4] * delta[1] + aa[5] * delta[2] + delta[4];
		    cloud3d[springs[i].x].z += aa[6] * delta[0] + aa[7] * delta[1] + aa[8] * delta[2] + delta[5];
		}
	    }
	    var distan = Math.sqrt(getDistanceFromMesh(mesh, cloud3d)) * scale;
	    epsil = Math.abs(old_dist - distan) / old_dist;
	    old_dist = distan;
	    iter++;
		if (iter > 0) break;
	} while (epsil > 0.001);
	epsil *= 100;
	var end = new Date();
    var parent0 = parent.contentDocument.getElementById("dateOutput4");
    parent0.value = distan.toFixed(2);
    alert ("parent0 = " + parent0 + "distan = " + distan);
	var parent1 = parent.contentDocument.getElementById("dateOutput5");
	parent1.value = iter.toFixed(0);
	var parent2 = parent.contentDocument.getElementById("dateOutput6");
	parent2.value = epsil.toFixed(4);
	var parent3 = parent.contentDocument.getElementById("dateOutput7");
	var tim = (end.getTime() - start.getTime())/1000;
	parent3.value = tim.toFixed(2);
	scene.remove(pointcloud1);
	scene.remove(pointcloud2);
	pointcloud1 = drawPointCloud(cloud3d, new THREE.Color( 0.5,0,1 ), 1); 
	scene.add(pointcloud1);
	pointcloud2 = drawPointCloud(mirror, new THREE.Color( 0.5,0.5,0 ), 2);
	scene.add( pointcloud2 );
    }
//================================================================================
			//var MoleculeGroup = new THREE.Object3D();
//				spritey.position = newpos;
//				cyl.name = "Elevation";
//				spritey.name = "Sprite";
// 		//MoleculeGroup.remove(MoleculeGroup.getObjectByName("Elevation", false));		
		//MoleculeGroup.remove(MoleculeGroup.getObjectByName("Sprite", false));		
//================================================================================
var userRange1 , userRange2;
 function getUserRange(){
 	var parent = window.parent.document.getElementById("Right_menu");
	userRange1 = parent.contentDocument.getElementById("from").value;
	userRange2 = parent.contentDocument.getElementById("to").value;
 	//userRange1 = document.getElementById('from').value;
 	//userRange2 = document.getElementById('to').value;
 	console.log(userRange1);
 	console.log(userRange2);
 }
 function Test() {
	var step = 5000, length = xmax / scale - xmin  / scale;
 	var space = length / step;
 	var step = 0;
 	var userStep = 0;

 	var range1;
 	var range2;
 	if(userRange1 == null){
 		range1 = 600;
 		range2 = 900;
 		userStep = 5;
 	} else {
 		range1 = Number(userRange1);
 		range2 = Number(userRange2);
 		userStep = Math.floor((userRange2 - userRange1) / 300)
 		console.log(userStep);
 		console.log(range1);
 		console.log(range2);
 	}
 	var a = [];
 	
 		while(step < userStep/*14*/){
 		for (var i = range1/**/; i < range1 + 300/* step - 200*/; i++ ) {
 //		for (var i = 0/**/; i < 600/*2500step - 200*/; i++ ) {
  			points3d.splice(0, points3d.length);
			var count   = xmax / scale - space * i;
			var count_1 = xmax / scale - space * (i + 1);
			for (var j = 0; j < cloud3d.length; j++ ) {
 				if (cloud3d[j].x < count && cloud3d[j].x > count_1) {
 			 		points3d.push(cloud3d[j]) ;
 				}
 			}
 			if (points3d.length > 30) {

				var v1 = new THREE.Vector3( points3d[0].x, 0, -0.3 );
				points3d.unshift(v1);

				if (!BubbleSort(points3d)) {alert(" false = ")};
//				points3d.shift();

 

			pointcloud3 = drawPointCloud(points3d, new THREE.Color( 0,1,0 ), 3);
			scene.add( pointcloud3 );
			for (var k = 1; k < points3d.length; k++ ) {
				var pp = [points3d[k].x, points3d[k].y, points3d[k].z];
				pts.push(pp);
				
			}
			
			var interpCurve = verb.geom.NurbsCurve.byPoints( pts, 3);
			addCurveToScene( interpCurve.toThreeGeometry() );
			curve.push(interpCurve);
			pts.splice(0, pts.length);
			}

		}

		var srf = verb.geom.NurbsSurface.byLoftingCurves( curve, 3 );
		addMeshToScene( srf.toThreeGeometry() );
	 	step++;
	 	range1 = range1 + 300;
	 	a[step] = srf;

	console.log(step);

	 }

}
 

function BubbleSort(mass)       // mass - массив, который нужно
{                            // отсортировать по возрастанию.
	var n = false;
	var v1 = new THREE.Vector3( 0, 0, 0 );
	var distan = 0.0;
 	for (var k1 = 0; k1 < mass.length; k1++ ) {
		v1 = mass[k1];
		var closest = -1;
		var dist = 1000000.0;
		for (var k2 = k1+1; k2 < mass.length; k2++ ) {
			distan = v1.distanceTo(mass[k2]);
			if (distan < dist) {dist = distan; closest = k2;}
		}
		if(closest != -1) {
			v1 = mass[k1+1];
			mass[k1+1] = mass[closest];
			mass[closest] = v1;
		}
	}
	n = true;
    return n;    // На выходе сортированный по возрастанию массив mass.
}
