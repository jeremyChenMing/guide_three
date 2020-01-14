import React, { Component } from 'react';
import {
  Scene,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  OrthographicCamera,
  Vector3,
  Line,
  // AxesHelper,
  MeshLambertMaterial,
  AmbientLight,
  Vector2,
  // GridHelper,
  MeshPhongMaterial,
  SphereGeometry,
  Shape,
  ExtrudeGeometry,
  Group,
  BufferGeometry,
  Path,
  LineCurve3,
  DirectionalLight,
  LatheGeometry,
  ShapeGeometry,
  LineDashedMaterial,
} from "three";
import { Interaction } from 'three.interaction';
import './FloorOne.less';
// import OrbitControls from 'three-orbitcontrols';
// import Stats from '../../utils/stats.module.js';

import { LiftIcon, ToiletIcon, NurseryIcon } from '../../static/icon/icons';
import pathArray from './floor-one-path';
import { getGeometryBox } from '../../utils/threeUtils';
import DateBox from '../../component/dateBox/DateBox';
const navList = [
  {
    name: '前台',
    number: 0
  },
  {
    name: '24小时综合自助区',
    number: 1
  },
  {
    name: '不动产预审窗口',
    number: 2
  },
  {
    name: '银行窗口',
    number: 3
  },
  {
    name: '邮政快递室',
    number: 4
  },
  {
    name: '公共快递存放间',
    number: 5
  },
  {
    name: '不动产办证窗口',
    number: 6
  },
  {
    name: '书吧',
    number: 7
  },
  {
    name: '投诉室',
    number: 8
  }
];
let prevMesh;
let currentMesh;
class FloorOne extends Component {
  constructor(props) {
    super(props);
    this.scene = new Scene();
    // this.scene.background = new Color('rgb(0,140,0)');
    // this.scene.fog = new Fog(0xa0a0a0, 200, 1000);
    // this.camera = new PerspectiveCamera(45, 1.75, 1, 2000);
    this.camera = new OrthographicCamera(-700, 700, 400, -400, 1, 2000); // 正射投影
    this.camera.position.set(100, 400, 500); // 设置相机位置
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

    // this.stats = new Stats();

    this.state = {
      currentIndex: 0,
      currentNav: null, //右侧导航
      currentFastNav: null, //下方导航
      title: '前台',
      currentCurve: null,
      personCurrentXY: { x: 0, y: 0 },
      currentPositionPaths: [],
      isShowTips: false //提示语
    };
  }
  init = () => {
    let { scene, camera, renderer } = this;
    this.createFloor();
    this.initGeometryBoxOne();
    this.initGeometryBoxTwo();
    this.initGeometryBoxThree();
    this.initGeometryBoxFour();
    this.createMainHall();


    // this.initControl();
    renderer.render(scene, camera);
  };
  initGeometryBoxOne = () => {
    let { scene } = this;
    let boxA1 = getGeometryBox(
      60,
      80,
      50,
      '0x577ed8',
      'meshA1',
      '电梯',
      '',
      '',
      "#fff"
    );
    boxA1.position.set(-440, -20, -325);
    boxA1.cursor = 'pointer';
    boxA1.on('click', (ev) => {
      this.getPath(12)
    });


    let boxA3 = this.createSector();
    boxA3.cursor = 'pointer';
    boxA3.on('click', () => {
      this.changeNav(1, '24小时综合自助区');
    });
    boxA3.rotation.set(0, Math.PI / 2, 0);
    boxA3.position.set(-400, 0, -150);
    let boxA4 = getGeometryBox(
      200,
      80,
      80,
      '0xF4C23C',
      'meshA4',
      ''
    );
    boxA4.position.set(-280, -20, -210);
    // box4.rotation.set(0,-Math.PI/180*40,0);
    let boxA5 = getGeometryBox(
      100,
      80,
      80,
      '0xF4C23C',
      'meshA5',
      ''
    );
    boxA5.position.set(-250, -20, -110);
    let boxA6 = getGeometryBox(
      120,
      80,
      80,
      '0xEEC358',
      'meshA6',
      ''
    );
    boxA6.position.set(-30, -20, -110);
    let boxA7 = getGeometryBox(
      50,
      80,
      40,
      '0xEDC0EA',
      'meshA7',
      '母婴室',
      '',
      '25px'
    );
    boxA7.position.set(75, -20, -90);
    boxA7.cursor = 'pointer';
    boxA7.on('click', (ev) => {
      this.getPath(11)
    });
    let boxA8 = getGeometryBox(
      40,
      80,
      40,
      '0x98E2D1',
      'meshA8',
      '医务室',
      '',
      '25px'
    );
    boxA8.position.set(140, -20, -90);
    let boxA9 = this.createTriangle();
    boxA9.rotation.set(0, -Math.PI / 2, 0);
    boxA9.position.set(180, 0, -70);
    let boxA10 = getGeometryBox(
      80,
      80,
      80,
      '0x4F7DDF',
      'meshA10',
      '电梯'
    );
    boxA10.position.set(-20, -20, -210);
    boxA10.cursor = 'pointer';
    boxA10.on('click', (ev) => {
      this.getPath(14)
    });
    let boxA11 = getGeometryBox(
      40,
      80,
      80,
      '0xff9400',
      '',
      '',
      1,
      '20px'
    );
    boxA11.position.set(-140, -20, -210);
    let boxA12 = getGeometryBox(
      80,
      80,
      40,
      '0xff9400',
      '',
      '不动产预审窗口',
      1,
      '20px'
    );
    boxA12.position.set(-120, -20, -190);
    let groupL = new Group();
    groupL.add(boxA11, boxA12);
    groupL.name = 'meshAL';
    groupL.cursor = 'pointer';
    groupL.on('click', (ev) => {
      this.changeNav(2, '不动产预审窗口');
    });
    let IrregularCubeArr = [
      { x: 180, y: 0 },
      { x: 120, y: 60 },
      { x: 0, y: 60 },
    ];
    let boxA13 = this.createIrregularCube(IrregularCubeArr, 'meshA13', '#9D9D9D');
    boxA13.rotation.set(0, -Math.PI / 2, 0);
    boxA13.position.set(-380, 0, -270);

    let boxA14 = getGeometryBox(
      70,
      80,
      80,
      '0x568BFF',
      'meshA14',
      '投诉室',
      '',
      '',
      '',
      'normal'
    );
    boxA14.position.set(-150, -20, -110);
    boxA14.cursor = 'pointer';
    boxA14.on('click', (ev) => {
      this.getPath(8)
    });
    let liftGroup = new Group();
    liftGroup.add(boxA1, boxA10);
    liftGroup.name = 'liftGroup';
    let group = new Group();
    group.add(boxA3, boxA4, boxA5, boxA6, boxA7, boxA8, boxA9, groupL, boxA13, boxA14, liftGroup);
    group.rotation.set(0, -Math.PI / 180 * 45, 0);
    group.position.set(-360, 0, 210);
    scene.add(group);
  };
  initGeometryBoxTwo = () => {
    let { scene } = this;
    let boxB1 = getGeometryBox(
      60,
      80,
      110,
      '0x9D9D9D',
      'meshB1',
      ''
    );
    // boxB1.position.set(-85,-10,274);
    boxB1.position.set(-20, -20, 0);

    let boxB2 = this.createHouse();
    boxB2.rotation.set(0, -Math.PI / 2, 0);
    boxB2.position.set(10, 0, 55);
    boxB2.cursor = 'pointer';
    boxB2.on('click', (ev) => {
      this.changeNav(5, '公共快递存放间')
    });
    let boxB3 = getGeometryBox(
      80,
      80,
      110,
      '0x9D9D9D',
      'meshB3',
      ''
    );
    boxB3.position.set(140, -20, 0);
    let boxB4 = getGeometryBox(
      50,
      80,
      110,
      '0x9D9D9D',
      'meshB4',
      ''
    );
    boxB4.position.set(215, -20, 0);
    let boxB5 = getGeometryBox(
      160,
      80,
      50,
      '0x9D9D9D',
      'meshB5',
      ''
    );
    boxB5.position.set(330, -20, 30);
    let boxB6 = getGeometryBox(
      160,
      80,
      40,
      '0x9D9D9D',
      'meshB6',
      ''
    );
    boxB6.position.set(330, -20, -35);
    let boxB7 = getGeometryBox(
      80,
      80,
      30,
      '0x4EBA0B',
      'meshB7',
      '前台',
      '',
      '',
      '#fff'
    );
    boxB7.position.set(140, -20, -150);
    boxB7.cursor = 'pointer';
    boxB7.on('click', (ev) => {
      this.changeNav(0, '前台');
    });
    let boxB8 = getGeometryBox(
      160,
      80,
      100,
      '0x9D9D9D',
      'meshB8',
      ''
    );
    boxB8.position.set(10, -20, -120);
    let IrregularCubeArr = [
      { x: 0, y: 100 },
      { x: 100, y: 0 }
    ];
    let boxB9 = this.createIrregularCube(IrregularCubeArr, 'meshB9', '#9D9D9D');
    boxB9.rotation.set(0, -Math.PI / 2, 0);
    boxB9.position.set(420, 0, 55);
    let group = new Group();
    group.add(boxB1, boxB2, boxB3, boxB4, boxB5, boxB6, boxB7, boxB8, boxB9);
    group.position.set(-70, 0, 288);
    scene.add(group);
  };
  initGeometryBoxThree = () => {
    let { scene } = this;

    let boxA2 = getGeometryBox(
      80,
      80,
      120,
      '0xD29EFF',
      'meshA2',
      '洗手间',
      '',
      '',
      '',
      'normal'
    );
    boxA2.position.set(-638, -20, 340);
    boxA2.cursor = 'pointer';
    boxA2.on('click', (ev) => {
      this.getPath(13)
    });

    let boxC2 = getGeometryBox(
      170,
      80,
      100,
      '0x9D9D9D',
      'meshC2',
      ''
    );
    boxC2.position.set(220, -20, 0);
    let boxC3 = getGeometryBox(
      80,
      80,
      100,
      '0xF6B80E',
      'meshC3',
      '银行窗口',
      '',
      '',
      '',
      'left'
    );
    boxC3.position.set(360, -20, 0);
    boxC3.cursor = 'pointer';
    boxC3.on('click', (ev) => {
      this.changeNav(3, '银行窗口')
    });
    let boxC4 = getGeometryBox(
      160,
      80,
      60,
      '0xC28DEF',
      'meshC4',
      '洗手间'
    );
    boxC4.position.set(360, -20, -110);
    boxC4.cursor = 'pointer';
    boxC4.on('click', (ev) => {
      this.getPath(15);
    });
    let boxC5 = getGeometryBox(
      70,
      80,
      60,
      '0x9AD78B',
      'meshC5',
      '邮政快递室',
      '',
      '27px'
    );
    boxC5.position.set(230, -20, -110);
    boxC5.cursor = 'pointer';
    boxC5.on('click', (ev) => {
      this.changeNav(4, '邮政快递室')
    });
    let boxC6 = getGeometryBox(
      300,
      80,
      40,
      '0xF4C23C',
      'meshC6',
      ''
    );
    boxC6.position.set(-35, -20, -30);
    let boxC7 = getGeometryBox(
      40,
      80,
      40,
      '0xF4C23C',
      'meshC7',
      ''
    );
    boxC7.position.set(-215, -20, -30);
    let boxC8 = getGeometryBox(
      40,
      80,
      60,
      '0x9D9D9D',
      'meshC8',
      ''
    );
    boxC8.position.set(155, -20, -110);
    let boxC9 = getGeometryBox(
      100,
      80,
      100,
      '0x9D9D9D',
      'meshC9',
      ''
    );
    boxC9.position.set(460, -20, 0);
    let boxC10 = this.createSectorC();
    boxC10.rotation.set(0, -Math.PI / 2, 0);
    boxC10.position.set(450, 0, -80);

    let toiletGroup = new Group();
    toiletGroup.add(boxA2, boxC4);
    toiletGroup.name = 'toiletGroup';

    let group = new Group();
    group.add(boxC2, boxC3, boxC5, boxC6, boxC7, boxC8, boxC9, boxC10, toiletGroup);
    group.rotation.set(0, -Math.PI / 180 * 45, 0);
    group.position.set(180, 0, -50);
    scene.add(group);
  };
  initGeometryBoxFour = () => {
    let { scene } = this;
    let boxD1 = getGeometryBox(
      300,
      80,
      40,
      '0xE6684e',
      'meshD1',
      '不动产办证窗口',
      1
    );
    boxD1.position.set(25, -20, -1);
    let boxD2 = getGeometryBox(
      320,
      80,
      40,
      '0xF4C23C',
      'meshD2',
      ''
    );
    boxD2.position.set(20, -20, -55);
    let boxD3 = getGeometryBox(
      320,
      80,
      60,
      '0xE6684e',
      'meshD3',
      '不动产办证窗口'
    );
    boxD3.position.set(60, -20, -120);
    let boxD4 = getGeometryBox(
      60,
      80,
      60,
      '0x9D9D9D',
      'meshD4',
      ''
    );
    boxD4.position.set(-160, -20, -120);

    let boxD5 = getGeometryBox(
      350,
      80,
      40,
      '0xE6684e',
      '',
      '不动产办证窗口',
      1
    );
    boxD5.position.set(285, -20, 117);
    boxD5.rotation.set(0, -Math.PI / 4, 0);

    let boxD6 = getGeometryBox(
      290,
      80,
      60,
      '0xE6684e',
      '',
      '不动产办证窗口'
    );
    boxD6.position.set(396, -20, 34);
    boxD6.rotation.set(0, -Math.PI / 4, 0);
    let groupF = new Group();
    groupF.add(boxD1, boxD3, boxD5, boxD6);
    groupF.name = 'meshDF';
    groupF.cursor = 'pointer';
    groupF.on('click', (ev) => {
      this.changeNav(6, '不动产办证窗口')
    });
    let IrregularCubeArr = [
      { x: 40, y: 0 },
      { x: 40, y: 45 },
      { x: -40, y: 40 },
    ];
    let boxD7 = this.createIrregularCube(IrregularCubeArr, 'meshD7', '#9D9D9D');
    boxD7.rotation.set(0, -3 * Math.PI / 4, 0);
    boxD7.position.set(235, 0, -85);
    let group = new Group();
    group.position.set(-168, 0, -189);
    group.add(boxD2, boxD4, groupF, boxD7);
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
    // this.stats.update();
  };
  initPersonXY = () => {
    let { match: { params: { position } } } = this.props;
    console.log(this.props.match, '00000')
    let positionObj;
    switch (position) {
      case '0':
        positionObj = {};
        break;
      case '1':
        positionObj = { x: 120, y: 60 };
        break;
      default:
        return;
    }
    this.setState({
      personCurrentXY: positionObj
    }, () => {
      this.init();
      if (positionObj) {
        this.initPerson(); // 初始化小人
      }
    })
  };
  createSector = () => {
    //左下角的扇形体
    let shape = new Shape([new Vector2(0, 0)]);
    shape.lineTo(80, 0);
    shape.absarc(0, 0, 80, 0, Math.PI / 2, false);
    shape.lineTo(-80, 80);
    shape.lineTo(-80, 0);
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

    // let canvas = this.getTextCanvas(80, 80, '03');
    // let texture = new CanvasTexture(canvas);
    let material = new MeshPhongMaterial({
      color: 0xEFD32D,
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
      // emissive:color,
      // transparent: true,
      // opacity: 0.8,
      // map: texture
    });

    // geometry.faceVertexUvs[0] = [];
    // geometry.faceVertexUvs[0][4] = [
    // 	new Vector2(0, 1),
    // 	new Vector2(0, 0),
    // 	new Vector2(1, 1)
    // ];
    // geometry.faceVertexUvs[0][5] = [
    // 	new Vector2(0, 0),
    // 	new Vector2(1, 0),
    // 	new Vector2(1, 1)
    // ];

    let mesh = new Mesh(geometry, material);
    let font = getGeometryBox(
      120,
      20,
      30,
      '0xEFD32D',
      '',
      '24小时综合自助区',
      '',
      '25px',
      '#FFFFFF'
    );
    font.position.set(-35, 10, 10);
    font.rotation.set(0, -Math.PI / 2, 0);
    let groupSector = new Group();
    groupSector.add(mesh, font);
    groupSector.name = 'meshA3';
    return groupSector;
  };
  createTriangle = () => {
    //下方三角
    let shape = new Shape([new Vector2(0, 0)]);
    shape.lineTo(0, 80);
    shape.lineTo(80, 0);
    shape.lineTo(0, 0);
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
    // let canvas = this.getTextCanvas(80, 80, '09');
    // let texture = new CanvasTexture(canvas);
    let material = new MeshPhongMaterial({
      color: 0x9D9D9D,
      // emissive:color,
      transparent: true,
      opacity: 1,
      // map: texture
    });
    let mesh = new Mesh(geometry, material);
    mesh.name = 'meshA9';
    return mesh;
  };
  createSectorC = () => {
    //C分组里面的扇形
    let shape = new Shape([new Vector2(0, 0)]);
    shape.absarc(0, 0, 60, 0, Math.PI / 2, false);
    shape.lineTo(0, 0);
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
      color: 0x9D9D9D,
      transparent: true,
      opacity: 1,
    });
    let mesh = new Mesh(geometry, material);
    mesh.name = 'meshC10';
    return mesh;
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
  createHouse = () => {
    //下面绿色小房子
    let shape = new Shape([new Vector2(10, 0)]);
    shape.lineTo(80, 0);
    shape.lineTo(80, 60);
    shape.lineTo(75, 60);
    shape.lineTo(75, 65);
    shape.lineTo(60, 65);
    shape.lineTo(60, 70);
    shape.lineTo(10, 70);
    shape.lineTo(10, 0);
    let v1 = new Vector3(0, -60, 0);
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
      color: 0x4EBA0B,
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
    });
    let mesh = new Mesh(geometry, material);
    let font = getGeometryBox(
      70,
      20,
      30,
      '0x4EBA0B',
      '',
      '公共快递存放间',
      '',
      '20px'
    );
    font.position.set(-30, 10, -45);
    font.rotation.set(0, Math.PI / 2, 0);
    let groupHouse = new Group();
    groupHouse.add(mesh, font);
    groupHouse.name = 'meshB2';
    return groupHouse;
  };
  createMainHall = () => {
    let { scene } = this;
    //主大厅
    let shape = new Shape([new Vector2(150, 20)]);
    shape.lineTo(-20, -150);
    shape.lineTo(-40, -130);
    shape.lineTo(-40, 150);
    shape.lineTo(70, 260);
    shape.lineTo(110, 260);
    shape.lineTo(110, 280);
    shape.lineTo(150, 280);
    let v1 = new Vector3(0, -60, 0);
    let v2 = new Vector3(0, 20, 0);
    let path = new LineCurve3(v1, v2);
    let extrudeSettings = {
      steps: 1,
      // depth: 10,
      // bevelEnabled: true,
      // bevelThickness: 1,
      // bevelSize: 1,
      // bevelSegments: 1,
      extrudePath: path
    };
    let geometry = new ExtrudeGeometry(shape, extrudeSettings);
    let material = new MeshPhongMaterial({
      color: 0x6DC8F0,
      // transparent: true,
      // opacity: 0.5,
      // depthTest:false
      polygonOffset: true,
      polygonOffsetFactor: 0.01,
      // polygonOffsetUnits: 1
    });
    let mesh = new Mesh(geometry, material);
    let fontBox = getGeometryBox(
      100,
      20,
      100,
      '0x6DC8F0',
      '',
      '书吧',
      1
    );
    fontBox.position.set(-70, 10, -60);
    let groupBook = new Group();
    groupBook.add(mesh, fontBox);
    groupBook.position.set(10, 0, -10);
    groupBook.name = 'mainHall';
    groupBook.cursor = 'pointer';
    groupBook.on('click', (ev) => {
      this.changeNav(7, '书吧')
    });
    scene.add(groupBook);
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
      currentPerson.traverse(item => {
        if (item instanceof Mesh) {
          item.geometry.dispose();
          item.material.dispose();
        }
      });
      scene.remove(currentPerson)
    }
    //判断当前是否存在路径线，如存在移除
    let currentLine = scene.getObjectByName('currentLine');
    if (currentLine) {
      currentLine.geometry.dispose();
      currentLine.material.dispose();
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
      // that.timer = setTimeout(() => {
      //   if(progress <= 0.5) {
      //     animate();
      //   }
      // }, 1000);
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
        meshName = 'meshB7';
        break;
      case 1:
        pathPoint = currentPositionPaths.pathPoint1;
        meshName = 'meshA3';
        break;
      case 2:
        pathPoint = currentPositionPaths.pathPoint2;
        meshName = 'meshAL';
        break;
      case 3:
        pathPoint = currentPositionPaths.pathPoint3;
        meshName = 'meshC3';
        break;
      case 4:
        pathPoint = currentPositionPaths.pathPoint4;
        meshName = 'meshC5';
        break;
      case 5:
        pathPoint = currentPositionPaths.pathPoint5;
        meshName = 'meshB2';
        break;
      case 6:
        pathPoint = currentPositionPaths.pathPoint6;
        meshName = 'meshDF';
        break;
      case 7:
        pathPoint = currentPositionPaths.pathPoint7;
        meshName = 'mainHall';
        break;
      case 8:
        pathPoint = currentPositionPaths.pathPoint8;
        meshName = 'meshA14';
        break;
      case 9:
        pathPoint = currentPositionPaths.pathPoint9;
        meshName = 'liftGroup';
        break;
      case 10:
        pathPoint = currentPositionPaths.pathPoint10;
        meshName = 'toiletGroup';
        break;
      case 11:
        pathPoint = currentPositionPaths.pathPoint11;
        meshName = 'meshA7';
        break;
      case 12:
        pathPoint = currentPositionPaths.pathPoint12;
        meshName = 'meshA1';
        break;
      case 13:
        pathPoint = currentPositionPaths.pathPoint13;
        meshName = 'meshA2';
        break;
      case 14:
        pathPoint = currentPositionPaths.pathPoint9;
        meshName = 'meshA10';
        break;
      case 15:
        pathPoint = currentPositionPaths.pathPoint10;
        meshName = 'meshC4';
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
    // this.three.appendChild(this.stats.dom)
  }
  changeNav = (index, title) => { // 点击右侧导航栏事件
    this.setState({
      currentNav: index,
      currentFastNav: null,
      title,
      isShowTips: false
    });
    this.getPath(index);
  };
  changeFastNav = (num) => { // 点击右下角快速导航事件
    console.log(num, '000')
    let { match: { params: { position } } } = this.props;
    this.setState({
      currentFastNav: num,
      currentNav: null
    });
    this.getPath(num);
    if ((num === 9 || num === 10) && position !== '0') {
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
    console.log(floorName, item, position)
    position = 1;
    this.clearAnimationFrame();
    this.props.history.push(`${item.path}/${position}?floor-name=${floorName}`);
  };
  componentWillUnmount() {
    this.interaction.removeEvents();
    this.renderer = null;
    this.clearAnimationFrame();
  }

  clearAnimationFrame = () => { // 清除动画
    cancelAnimationFrame(this.animationUpId);
    cancelAnimationFrame(this.animationDownId);
    cancelAnimationFrame(this.animationPersonId);
  };

  render() {
    let { currentIndex, currentNav, currentFastNav, isShowTips } = this.state; // title,
    return (
      <div className={'floor-one'}>
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
                  <span> 总服务台、</span>
                  <span> 帮助服务区、</span>
                  <span> 知音书苑、</span>
                  <span> 智能引导机器人“阳阳”、</span>
                  <span> 不动产登记预审、</span>
                  <span> 不动产登记联办、</span>
                  <span> 不动产登记综合、</span>
                  <span> 邮政快递、</span>
                  <span> 收费窗口、</span>
                  <span> 母婴室、</span>
                  <span> 投诉室、</span>
                  <span> 24小时自助服务区</span>
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
                className={currentFastNav === 9 ? 'active' : ''}
                onClick={() => { this.changeFastNav(9) }}>
                <LiftIcon />
                <span>电梯间</span>
              </div>

              <div
                className={currentFastNav === 10 ? 'active' : ''}
                onClick={() => { this.changeFastNav(10) }}>
                <ToiletIcon />
                <span>卫生间</span>
              </div>

              <div
                className={currentFastNav === 11 ? 'active' : ''}
                onClick={() => { this.changeFastNav(11) }}>
                <NurseryIcon />
                <span>母婴室</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right-nav">
          <div className="info">
            <DateBox floor={1} />
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

export default FloorOne;
