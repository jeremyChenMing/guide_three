import React, { Component } from "react";
import {
  AmbientLight,
  // AxesHelper,
  // BoxGeometry,
  BufferGeometry,
  // CanvasTexture, 
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  // GridHelper,
  Group,
  LatheGeometry,
  Line,
  LineCurve3,
  LineDashedMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  OrthographicCamera,
  Path,
  Scene,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import { Interaction } from "three.interaction";
import "./FloorTwo.less";

import { LiftIcon, ToiletIcon } from "../../static/icon/icons"; // NurseryIcon
import pathArray from "./floor-two-path";
import { getGeometryBox } from '../../utils/threeUtils';
import DateBox from "../../component/dateBox/DateBox";

const navList = [
  {
    name: '税务窗口 ➀',
    number: 0
  },
  {
    name: '税务窗口 ➁',
    number: 1
  },
  {
    name: '税务窗口 ➂',
    number: 2
  },
  {
    name: '社保窗口 ➀',
    number: 3
  },
  {
    name: '社保窗口 ➁',
    number: 4
  },
  {
    name: '预审区',
    number: 5
  },
  {
    name: '信访接待室',
    number: 6
  },
  {
    name: '政务值班室',
    number: 7
  },
  {
    name: '大宗客户室',
    number: 8
  },
  {
    name: '洽谈室',
    number: 9
  }
];
let cubeArray = [
  {
    name: 'meshC3',
    pathIndex: 0,
    isNav: true,
    title: '税务窗口 ➀'
  },
  {
    name: 'meshC6',
    pathIndex: 1,
    isNav: true,
    title: '税务窗口 ➁'
  },
  {
    name: 'meshB2',
    pathIndex: 2,
    isNav: true,
    title: '税务窗口 ➂'
  },
  {
    name: 'meshA7',
    pathIndex: 3,
    isNav: true,
    title: '社保窗口 ➀'
  },
  {
    name: 'meshD2',
    pathIndex: 4,
    isNav: true,
    title: '社保窗口 ➁'
  },
  {
    name: 'meshC1',
    pathIndex: 5,
    isNav: true,
    title: '预审区'
  },
  {
    name: 'meshD4',
    pathIndex: 6,
    isNav: true,
    title: '信访接待室'
  },
  {
    name: 'groupD5',
    pathIndex: 7,
    isNav: true,
    title: '政务值班室'
  },
  {
    name: 'groupA4',
    pathIndex: 8,
    isNav: true,
    title: '大宗客户室'
  },
  {
    name: 'meshA5',
    pathIndex: 9,
    isNav: true,
    title: '洽谈室'
  },
  {
    name: 'meshA9',
    pathIndex: 14,
    isNav: false,
    title: ''
  },
  {
    name: 'meshA2',
    pathIndex: 15,
    isNav: false,
    title: ''
  },
  {
    name: 'meshA1',
    pathIndex: 12,
    isNav: false,
    title: ''
  },
  {
    name: 'meshC4',
    pathIndex: 13,
    isNav: false,
    title: ''
  },

];
let prevMesh;
let currentMesh;
class FloorTwo extends Component {
  constructor(props) {
    super(props);
    this.scene = new Scene();
    // this.scene.background = new Color('rgb(0,140,0)');
    // this.scene.fog = new Fog(0xa0a0a0, 200, 1000);
    // this.camera = new PerspectiveCamera(45, 1.75, 1, 2000);
    this.camera = new OrthographicCamera(-700, 700, 400, -400, 1, 2000);
    this.camera.position.set(0, 400, 500);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(0, 0, 0);
    this.renderer = Window.renderer = Window.renderer ?
      Window.renderer
      :
      new WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: true
      });
    // this.renderer.setClearAlpha(0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.autoClear = true;
    this.renderer.setSize(1500, 900);
    // 允许阴影投射
    this.renderer.shadowMap.enabled = true;
    //第三方库给对象添加事件
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);

    //坐标轴辅助
    // let axes = new AxesHelper(400);
    // this.scene.add(axes);

    this.scene.add(new AmbientLight(0x555555));

    this.light = new DirectionalLight(0xffffff, 1);
    this.light.position.set(0, 700, 500);
    this.light.castShadow = true;
    //告诉平行光需要开启阴影投射
    this.light.castShadow = true;

    // this.light1 = new PointLight(0xffffff);
    // this.light1.position.set(0, 600, 600);
    // this.scene.add(this.light1);
    // this.light.shadow.camera.top = 180;
    // this.light.shadow.camera.bottom = -100;
    // this.light.shadow.camera.left = -120;
    // this.light.shadow.camera.right = 120;



    this.scene.add(this.light);

    /*this.pointLight = new PointLight(0xffffff);
    this.pointLight.position.set(-70, 300, 600);
    this.pointLight.shadow.mapSize.width = 5120; // 必须是 2的幂，默认值为 512
    this.pointLight.shadow.mapSize.height = 5120; // 必须是 2的幂，默认值为 512
    this.pointLight.castShadow = true;
    this.scene.add(this.pointLight);*/

    // this.renderer.setClearColor(0xFFFFFF, 1.0);

    /*this.light = new PointLight(0xffffff);
    this.light.position.set(0, 0, 300);
    this.scene.add(this.light);*/
    //网格
    // this.helper = new GridHelper(1500, 150, 0xff0000, 0x00ff00);
    // this.scene.add(this.helper);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.state = {
      currentIndex: 1,
      currentNav: null,
      currentFastNav: null,
      title: '前台',
      currentCurve: null,
      personCurrentXY: { x: 0, y: 0 },
      currentPositionPaths: [],
      isShowTips: false
    };
  }
  init = () => {
    let { scene, camera, renderer } = this;
    this.createFloor();
    this.initGeometryBoxOne();
    this.initGeometryBoxTwo();
    this.initGeometryBoxThree();
    this.initGeometryBoxFour();
    this.addClickEvent();
    // this.initControl();
    renderer.render(scene, camera);
  };
  initGeometryBoxOne = () => {
    let { scene } = this;
    let boxA1 = getGeometryBox(
      60,
      80,
      80,
      '0x577ED8',
      'meshA1',
      '电梯',
      '',
      '',
      "#fff",
      'normal'
    );
    boxA1.position.set(-440, -20, -310);


    let boxA3 = getGeometryBox(
      80,
      80,
      40,
      '0x9D9D9D',
      'meshA3',
      ''
    );
    boxA3.position.set(-440, -20, -170);

    let boxA4 = this.createSector();
    boxA4.position.set(-430, 0, -120);

    let boxA5 = getGeometryBox(
      60,
      80,
      50,
      '0xF4C23C',
      'meshA5',
      '洽谈室'
    );
    boxA5.position.set(-390, -20, -95);
    let boxA6 = getGeometryBox(
      570,
      80,
      50,
      '0x9D9D9D',
      'meshA6',
      ''
    );
    boxA6.position.set(-50, -20, -95);
    let boxA7 = getGeometryBox(
      300,
      80,
      80,
      '0x83C6ED',
      'meshA7',
      '社保窗口 ➀',
      '',
      '25px'
    );
    boxA7.position.set(-230, -20, -190);
    let boxA8 = getGeometryBox(
      80,
      80,
      80,
      '0x9D9D9D',
      'meshA8',
      '',
      '',
      '25px'
    );
    boxA8.position.set(-20, -20, -190);
    let boxA9 = getGeometryBox(
      60,
      80,
      80,
      '0x577ED8',
      'meshA9',
      '电梯',
      1,
      '20px',
      '#fff',
      'normal'
    );
    boxA9.position.set(70, -20, -190);

    let boxA10 = getGeometryBox(
      40,
      80,
      80,
      '0x9D9D9D',
      'meshA10',
      '',
      '',
      '',
      '',
      'normal'
    );
    boxA10.position.set(140, -20, -190);
    let liftGroup = new Group();
    liftGroup.name = 'liftGroup';
    liftGroup.add(boxA1, boxA9);
    let group = new Group();
    group.add(boxA3, boxA4, boxA5, boxA6, boxA7, boxA8, boxA10, liftGroup);
    group.rotation.set(0, -Math.PI / 180 * 45, 0);
    group.position.set(-360, 0, 210);
    scene.add(group);
  };
  initGeometryBoxTwo = () => {
    let { scene } = this;
    let boxB1 = getGeometryBox(
      420,
      80,
      50,
      '0x9D9D9D',
      'meshB1',
      ''
    );
    boxB1.position.set(-10, -20, 0);

    let boxB2 = getGeometryBox(
      300,
      80,
      70,
      '0xDC7B60',
      'meshB2',
      '税务窗口 ➂'
    );
    boxB2.position.set(-70, -20, -100);
    let boxB3 = getGeometryBox(
      160,
      80,
      40,
      '0xE6B3ED',
      'meshB3',
      '扶梯',
      '',
      ''
    );
    boxB3.position.set(-80, -20, -210);

    let group = new Group();
    group.add(boxB1, boxB2, boxB3);
    group.position.set(140, 0, 315);
    scene.add(group);
  };
  initGeometryBoxThree = () => {
    let { scene } = this;
    let boxA2 = getGeometryBox(
      80,
      80,
      60,
      '0xB992E9',
      'meshA2',
      '洗手间'
    );
    boxA2.position.set(-300, -20, -1012);
    boxA2.rotation.set(0, -Math.PI / 2, 0);
    let boxC1 = this.createCylinder(
      30,
      30,
      80,
      '0xEDC35C',
      '',
      'meshC1'
    );
    boxC1.position.set(-30, -20, -220);
    let boxC2 = getGeometryBox(
      120,
      80,
      80,
      '0x9D9D9D',
      'meshC2',
      ''
    );
    boxC2.position.set(0, -20, -120);
    let boxC3 = getGeometryBox(
      120,
      80,
      120,
      '0xDC7B60',
      'meshC3',
      '税务窗口 ➀'
    );
    boxC3.position.set(0, -20, 0);
    let boxC4 = getGeometryBox(
      100,
      80,
      80,
      '0xC28DEF',
      'meshC4',
      '洗手间'
    );
    boxC4.position.set(150, -20, 0);

    let boxC5 = getGeometryBox(
      100,
      80,
      200,
      '0x9D9D9D',
      'meshC5',
      '',
      '',
      '27px'
    );
    boxC5.position.set(150, -20, -150);
    let boxC6 = getGeometryBox(
      100,
      80,
      280,
      '0xDC7B60',
      'meshC6',
      '税务窗口 ➁'
    );
    boxC6.position.set(150, -20, -420);
    let boxC7 = getGeometryBox(
      50,
      80,
      80,
      '0x9D9D9D',
      'meshC7',
      ''
    );
    boxC7.position.set(30, -20, -220);

    let boxC8 = getGeometryBox(
      140,
      80,
      180,
      '0x9D9D9D',
      'meshC8',
      ''
    );
    boxC8.position.set(0, -20, -380);
    let toiletGroup = new Group();
    toiletGroup.add(boxA2, boxC4);
    toiletGroup.name = 'toiletGroup';
    let group = new Group();
    group.add(boxC1, boxC2, boxC3, boxC5, boxC6, boxC7, boxC8, toiletGroup);
    group.rotation.set(0, Math.PI / 180 * 45, 0);
    group.position.set(420, 0, 240);
    scene.add(group);
  };
  initGeometryBoxFour = () => {
    let { scene } = this;
    let boxD1 = getGeometryBox(
      100,
      80,
      100,
      '0x9D9D9D',
      'meshD1',
      '',
      1
    );
    boxD1.position.set(0, -20, 0);
    let boxD2 = getGeometryBox(
      200,
      80,
      40,
      '0x83C6ED',
      'meshD2',
      '社保窗口 ➁'
    );
    boxD2.position.set(170, -20, 30);

    let boxD3 = getGeometryBox(
      200,
      80,
      40,
      '0x9D9D9D',
      'meshD3',
      ''
    );
    boxD3.position.set(170, -20, -30);
    let boxD4 = getGeometryBox(
      50,
      80,
      100,
      '0x8BDE83',
      'meshD4',
      '信访接待室'
    );
    boxD4.position.set(320, -20, 0);
    let boxD5 = this.createSectorInD();
    boxD5.position.set(370, 0, 50);
    let IrregularCubeArr = [
      { x: 0, y: -360 },
      { x: -80, y: -440 },
      { x: -180, y: -340 },
      { x: -150, y: -310 },
      { x: -150, y: -20 },
      { x: -50, y: 80 },
    ];
    let boxD6 = this.createIrregularCube(IrregularCubeArr, 'meshD6', '#9D9D9D');
    boxD6.position.set(10, 0, 80);
    let boxD7 = getGeometryBox(
      160,
      80,
      40,
      '0xE6B3ED',
      'meshD6',
      '扶梯'
    );
    boxD7.position.set(170, -20, 270);
    let group = new Group();
    group.position.set(-320, 0, -310);
    group.add(boxD1, boxD2, boxD3, boxD4, boxD5, boxD6, boxD7);
    scene.add(group);
  };
  initPerson = () => {
    let { scene, camera, renderer } = this;
    let { personCurrentXY } = this.state;
    let person = this.createPerson();
    person.position.set(personCurrentXY.x, 0, personCurrentXY.y);
    let shapeCircle = new Shape([new Vector2(0, 0)]);
    shapeCircle.absarc(0, 0, 30, 0, Math.PI * 2, false);
    let shapeMin = new Shape([new Vector2(0, 0)]);
    shapeMin.absarc(0, 0, 15, 0, Math.PI * 2, false);
    let geometryCircle = new ShapeGeometry([shapeCircle, shapeMin]);
    let materialCircle = new MeshBasicMaterial({
      color: 0xc1cadf
    });
    let materialCircleMin = new MeshBasicMaterial({
      color: '#788fce',
      polygonOffset: true,
      polygonOffsetFactor: -1
    });
    let meshCircle = new Mesh(geometryCircle, [materialCircle, materialCircleMin]);
    meshCircle.rotation.set(-Math.PI / 2, 0, 0);
    meshCircle.position.set(personCurrentXY.x, 0, personCurrentXY.y);
    scene.add(person, meshCircle);
    renderer.render(scene, camera);
  };
  initControl = () => {
    let { scene, camera, renderer } = this;
    renderer.render(scene, camera);
    requestAnimationFrame(this.initControl);
  };
  initPersonXY = () => {
    let { match: { params: { position } } } = this.props;
    let positionObj;
    console.log(this.props.match, '第二层')
    switch (position) {
      case '0':
        positionObj = {};
        break;
      case '1':
        positionObj = { x: -150, y: 10 };
        break;
      default:
        return;
    }
    this.setState({
      personCurrentXY: positionObj
    }, () => {
      this.init();
      if (positionObj) {
        this.initPerson();
      }
    })
  };
  createSector = () => {
    //左下角的扇形体
    let shape = new Shape([new Vector2(0, 0)]);
    shape.moveTo(50, -20);
    shape.lineTo(50, 0);
    shape.absarc(0, 0, 50, 0, Math.PI / 2, false);
    shape.lineTo(0, -20);
    let v1 = new Vector3(0, -60, 0);
    let v2 = new Vector3(0, 20, 0);
    let path = new LineCurve3(v1, v2);
    let extrudeSettings = {
      steps: 2,
      // depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1,
      extrudePath: path
    };
    let geometry = new ExtrudeGeometry(shape, extrudeSettings);
    let material = new MeshPhongMaterial({
      color: 0x84B660,
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
      // emissive:color,
      // transparent: true,
      // opacity: 0.8,
    });
    let mesh = new Mesh(geometry, material);
    mesh.name = 'meshA4';
    mesh.rotation.set(0, Math.PI / 2, 0);
    let fontBox = getGeometryBox(
      30,
      20,
      50,
      '0x84B660',
      '',
      '大宗客户室',
      '',
      '20px',
      '',
      'left'
    );
    fontBox.position.set(-20, 10, 8);
    let group = new Group();
    group.name = 'groupA4';
    group.add(mesh, fontBox);
    return group
  };
  createSectorInD = () => {
    let shape = new Shape([new Vector2(0, 0)]);
    shape.absarc(0, 0, 100, 0, Math.PI / 4, false);
    shape.lineTo(0, 0);
    let v1 = new Vector3(0, -60, 0);
    let v2 = new Vector3(0, 20, 0);
    let path = new LineCurve3(v1, v2);
    let extrudeSettings = {
      steps: 2,
      // depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1,
      extrudePath: path
    };
    let geometry = new ExtrudeGeometry(shape, extrudeSettings);
    let material = new MeshPhongMaterial({
      color: 0xA98F68,
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
      // emissive:color,
      // transparent: true,
      // opacity: 0.8,
    });
    let mesh = new Mesh(geometry, material);
    mesh.name = 'meshD5';
    mesh.rotation.set(0, -Math.PI / 4, 0);
    let fontBox = getGeometryBox(
      60,
      20,
      20,
      '0xA98F68',
      '',
      '政务值班室',
      '',
      '20px',
      '',
      'normal'
    );
    fontBox.position.set(25, 10, -60);
    fontBox.rotation.set(0, Math.PI / 3, 0);
    let group = new Group();
    group.add(mesh, fontBox);
    group.name = 'groupD5';
    return group
  };
  createIrregularCube = (arr, name, color) => {
    //绘制不规则多面体
    let shape = new Shape([new Vector2(0, 0)]);
    arr.forEach(item => {
      shape.lineTo(item.x, item.y)
    });
    let v1 = new Vector3(0, 0, 0);
    let v2 = new Vector3(0, 20, 0);
    let path = new LineCurve3(v1, v2);
    let extrudeSettings = {
      steps: 1,
      // depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1,
      extrudePath: path
    };
    let geometry = new ExtrudeGeometry(shape, extrudeSettings);
    let material = new MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 1,
    });
    let mesh = new Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  };
  createCylinder = (radiusTop, radiusBottom, height, color, opacity, name) => {
    //绘制圆柱体
    let geometry = new CylinderGeometry(radiusTop, radiusBottom, height, 32);
    let material = new MeshPhongMaterial({
      color: color.replace(/0x/, '#'),
      // emissive:color,
      transparent: true,
      opacity: opacity || 1,
    });
    let mesh = new Mesh(geometry, material);
    //设置模型的每个部位都可以投影
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    let fontBox = getGeometryBox(
      50,
      20,
      20,
      color,
      '',
      '预审区'
    );
    fontBox.position.set(0, 30, 0);
    fontBox.rotation.set(0, 0, 0);
    let group = new Group();
    group.add(mesh, fontBox);
    group.name = name;
    return group;
  };
  createFloor = () => {
    let { scene } = this;
    let shape = new Shape([new Vector2(0, -250)]);
    shape.moveTo(190, -400);
    shape.quadraticCurveTo(200, -400, 210, -390);
    shape.lineTo(690, 90);
    shape.quadraticCurveTo(700, 100, 700, 110);
    shape.lineTo(700, 350);
    shape.quadraticCurveTo(700, 400, 650, 400);
    shape.lineTo(-180, 400);
    shape.quadraticCurveTo(-200, 400, -220, 380);
    shape.lineTo(-690, -90);
    shape.quadraticCurveTo(-700, -100, -700, -110);
    shape.lineTo(-700, -350);
    shape.quadraticCurveTo(-700, -400, -650, -400);
    // shape.lineTo(300, 0)
    // shape.lineTo(0, 0);
    // shape.lineTo(0, 400);
    let v1 = new Vector3(0, -30, 0);
    let v2 = new Vector3(0, 0, 0);

    let path = new LineCurve3(v1, v2);
    let extrudeSettings = {
      steps: 2,
      // depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1,
      extrudePath: path
    };
    let geometry2 = new ExtrudeGeometry(shape, extrudeSettings);
    let mesh2 = new Mesh(geometry2, new MeshLambertMaterial({
      color: 0xe5e4e4,
      transparent: true,
      // opacity: .5,
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
    }));
    mesh2.name = 'floor';
    // mesh2.position.set(0,30,0);
    mesh2.scale.set(.9, 1, .9);
    mesh2.rotation.set(0, -3 * Math.PI / 4, 0);
    // let geometry = new BoxGeometry(1400, 0, 800);
    // let material = new MeshBasicMaterial({
    // 	color: 0x9eafbb,
    // 	opacity: 0.7,
    // 	transparent: true
    // });
    // let mesh = new Mesh(geometry, material);
    scene.add(mesh2);
  };
  createPerson = () => {
    // let { scene, camera, renderer } = this;
    let points = [
      new Vector2(0, 0),//top left
      new Vector2(6, 0),//bottom left
      new Vector2(3, 2),//bottom left
      new Vector2(6.4, 15.8),//bottom left
      new Vector2(3.4, 19.4),
      new Vector2(0, 0)
    ];
    let geometry = new LatheGeometry(points);
    let material = new MeshBasicMaterial({ color: 0x0000ff });
    let lathe = new Mesh(geometry, material);
    let geometrySphere = new SphereGeometry(4);
    let materialSphere = new MeshLambertMaterial({
      color: 0x0000ff
    });
    let sphere = new Mesh(geometrySphere, materialSphere);
    sphere.position.set(0, 30, 0);
    let groupPerson = new Group();
    groupPerson.add(lathe, sphere);
    return groupPerson;
  };
  animationDown = (mesh) => {
    let { scene, camera, renderer } = this;
    let that = this;
    let yHeight = 30;
    function move() {
      yHeight--;
      if (yHeight > 0) {
        mesh.position.y -= 1;
        renderer.render(scene, camera);
        that.animationDownId = requestAnimationFrame(move);
      }
    }
    move();
  };
  animationUp = (mesh) => {
    let { scene, camera, renderer } = this;
    let that = this;
    let yHeight = 0;
    function move() {
      yHeight++;
      if (yHeight < 30) {
        mesh.position.y += 1;
        renderer.render(scene, camera);
        that.animationUpId = requestAnimationFrame(move);
      } else {
        let { match: { params: { position } } } = that.props;
        if (position === '0') return;
        //建筑物升起后，小人移动
        let { currentCurve } = that.state;
        that.animatePerson(currentCurve);
      }
    }
    move();
  };
  animatePerson = (currentCurve) => {
    let { scene, camera, renderer } = this;
    // let { currentCurve } = this.state;
    //判断当前是否存在小人，如存在移除
    let currentPerson = scene.getObjectByName('currentPerson');
    if (currentPerson) {
      scene.remove(currentPerson)
    }
    //判断当前是否存在路径线，如存在移除
    let currentLine = scene.getObjectByName('currentLine');
    if (currentLine) {
      scene.remove(currentLine)
    }
    // renderer.clear();
    let that = this;
    renderer.autoClear = true;
    //曲线
    // let curve = new CatmullRomCurve3(
    //   [
    //     new Vector3(350, 0, -20),
    //     new Vector3(320, 0, -20),
    //     new Vector3(230, 0, 70),
    //     new Vector3(200, 0, 70),
    //     new Vector3(-230, 0, 70),
    //     new Vector3(-190, 0, -70),
    //     // new Vector3(-190, 0, -50)
    //   ],
    //   false
    // );

    if (!currentCurve) return;


    let points = currentCurve.getPoints(50);
    let geometry = new BufferGeometry().setFromPoints(points);
    let material = new LineDashedMaterial({
      color: 0x0000ff,
      dashSize: 12,
      gapSize: 7,
      linewidth: 10
    });
    let line = new Line(geometry, material);
    line.name = 'currentLine';
    line.computeLineDistances();
    line.rotation.set(Math.PI / 2, 0, 0);


    // let geometry = new TubeGeometry(curve, 100, 0.6, 50, false);
    // let material = new LineDashedMaterial({
    //   color: 0xff0000,
    //   dashSize: 10,
    //   gapSize: 3
    // });
    // let line = new Line(geometry, material);
    // line.computeLineDistances();



    scene.add(line);
    // console.log(geometry);
    //小人
    let person = this.createPerson();
    person.name = 'currentPerson';
    scene.add(person);
    renderer.render(scene, camera);
    // if(curve) {
    //   let pointArr = curve.getPoints(10);
    //   pointArr.forEach(item => {
    //     person.position.set(item.x,item.y,item.z);
    //     // renderer.autoClear = true;
    //     renderer.render(scene, camera);
    //     // renderer.clear();
    //   })
    // }
    let progress = 0;
    function animate() {
      // if (that.timer) {
      //   clearTimeout(that.timer);
      //   that.timer = null;
      // }
      progress += 0.006 * (600 / currentCurve.getLength());
      if (currentCurve) {
        let point = currentCurve.getPointAt(progress);
        if (point) {
          person.position.set(point.x, 0, point.y);
          renderer.render(scene, camera);
        }
      }
      that.animationPersonId = requestAnimationFrame(animate);
    }
    animate();
  };

  getPath = (index) => {

    let { scene } = this;
    let { currentPositionPaths } = this.state;
    let pathPoint;
    let meshName;
    switch (index) {
      case 0:
        pathPoint = currentPositionPaths.pathPoint0;
        meshName = 'meshC3';
        break;
      case 1:
        pathPoint = currentPositionPaths.pathPoint1;
        meshName = 'meshC6';
        break;
      case 2:
        pathPoint = currentPositionPaths.pathPoint2;
        meshName = 'meshB2';
        break;
      case 3:
        pathPoint = currentPositionPaths.pathPoint3;
        meshName = 'meshA7';
        break;
      case 4:
        pathPoint = currentPositionPaths.pathPoint4;
        meshName = 'meshD2';
        break;
      case 5:
        pathPoint = currentPositionPaths.pathPoint5;
        meshName = 'meshC1';
        break;
      case 6:
        pathPoint = currentPositionPaths.pathPoint6;
        meshName = 'meshD4';
        break;
      case 7:
        pathPoint = currentPositionPaths.pathPoint7;
        meshName = 'groupD5';
        break;
      case 8:
        pathPoint = currentPositionPaths.pathPoint8;
        meshName = 'groupA4';
        break;
      case 9:
        pathPoint = currentPositionPaths.pathPoint9;
        meshName = 'meshA5';
        break;
      case 10:
        pathPoint = currentPositionPaths.pathPoint10;
        meshName = 'liftGroup';
        break;
      case 11:
        pathPoint = currentPositionPaths.pathPoint11;
        meshName = 'toiletGroup';
        break;
      case 12:
        pathPoint = currentPositionPaths.pathPoint12;
        meshName = 'meshA1';
        break;
      case 13:
        pathPoint = currentPositionPaths.pathPoint13;
        meshName = 'meshC4';
        break;
      case 14:
        pathPoint = currentPositionPaths.pathPoint10;
        meshName = 'meshA9';
        break;
      case 15:
        pathPoint = currentPositionPaths.pathPoint11;
        meshName = 'meshA2';
        break;
      default:
        return;
    }
    if (prevMesh) {
      this.animationDown(prevMesh)
    }
    currentMesh = scene.getObjectByName(meshName);
    this.animationUp(currentMesh);
    prevMesh = currentMesh;

    let curve = new Path();
    pathPoint.forEach((item, index) => {
      index ? curve.lineTo(item.x, item.y) : curve.moveTo(item.x, item.y)
    });

    //保存当前的路径形状
    this.setState({
      currentCurve: curve
    })
  };
  getCurrentPositionPaths = () => {
    this.setState({
      currentPositionPaths: pathArray[0]
    })
  };
  componentDidMount() {
    this.initPersonXY();
    this.getCurrentPositionPaths();
    this.three.appendChild(this.renderer.domElement);
  }
  addClickEvent = () => {
    let { scene } = this;
    // let that = this;
    cubeArray.forEach(item => {
      let cube = scene.getObjectByName(item.name);
      cube.on('click', (ev) => {
        if (item.isNav) {
          this.changeNav(item.pathIndex, item.title);
        } else {
          this.getPath(item.pathIndex);
        }
      });
      cube.cursor = 'pointer';
    })
  };
  changeNav = (index, title) => {
    this.setState({
      currentNav: index,
      title,
      currentFastNav: null,
      isShowTips: false
    });
    this.getPath(index);
  };
  changeFastNav = (num) => {
    let { match: { params: { position } } } = this.props;
    this.setState({
      currentFastNav: num,
      currentNav: null
    });
    this.getPath(num);
    if ((num === 10 || num === 11) && position !== '0') {
      this.setState({
        isShowTips: true
      })
    } else {
      this.setState({
        isShowTips: false
      })
    }
  };
  routerNav = (item) => {
    let { location: { search } } = this.props;
    let floorName = search.split('=')[1];
    let position = floorName === item.name ? 1 : 0;
    position = 1;
    this.clearAnimationFrame();
    this.props.history.push(`${item.path}/${position}?floor-name=${floorName}`);
  };
  componentWillUnmount() {
    this.interaction.removeEvents();
    this.renderer = null;
    this.clearAnimationFrame();
  }
  clearAnimationFrame = () => {
    cancelAnimationFrame(this.animationUpId);
    cancelAnimationFrame(this.animationDownId);
    cancelAnimationFrame(this.animationPersonId);
  };
  render() {
    let { currentIndex, currentNav, title, currentFastNav, isShowTips } = this.state;
    return (
      <div className={'floor-two'}>
        <div className="main-left">
          <div
            className="canvas"
            style={{ textAlign: 'center' }}
            ref={(el) => (this.three = el)}
          >
            <div className="detail">
              {/* <h3>{title}</h3> */}
              {/* <div className="window-information">
                <div className="left">
                  <div className="window-count">
                    <span>窗口数: 9</span>
                    <span>排队数: 21</span>
                  </div>
                  <div className="delay-time">
                    <span>预计等待时间: 2小时20分钟</span>
                  </div>
                </div>
                <div className="right">
                  <div className="btn" onClick={this.animatePerson}>
                    <span><Icon type="arrow-right" /></span>
                    <span>点我导航</span>
                  </div>
                </div>
              </div> */}
              <div className="window-item">
                <h4>常办事项:</h4>
                <div className="window-item-detail">
                  <span> 社保类、</span>
                  <span> 税务类窗口</span>
                </div>
              </div>
            </div>
            {
              isShowTips ?
                <div className="tips">
                  共找到2个目标，已为您导航至最近的目标
                </div>
                :
                ''
            }
          </div>
          <div className="footer">
            <ul className="left-floor-num">
              {
                [
                  { name: '1F', path: '/floor-one' },
                  { name: '2F', path: '/floor-two' },
                  { name: '3F', path: '/floor-three' }
                ].map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => { this.routerNav(item) }}
                      className={index === currentIndex ? 'active' : ''}
                    >
                      {item.name}
                    </li>
                  )
                })
              }
            </ul>
            <div className="fast-nav">
              <div
                className={currentFastNav === 10 ? 'active' : ''}
                onClick={() => { this.changeFastNav(10) }}>
                <LiftIcon />
                <span>电梯间</span>
              </div>

              <div
                className={currentFastNav === 11 ? 'active' : ''}
                onClick={() => { this.changeFastNav(11) }}>
                <ToiletIcon />
                <span>卫生间</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-nav">
          <div className="info">
            <DateBox floor={2} />
          </div>
          <h3>你想要去哪儿?</h3>
          <div className="nav-container">
            <ul className="wrap">
              {
                navList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className={(index === currentNav ? 'active' : '')}
                      onClick={() => { this.changeNav(item.number, item.name) }}
                    >
                      <span className={index === currentNav - 1 ? 'no-border' : ''}>
                        {item.name}
                      </span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default FloorTwo;
