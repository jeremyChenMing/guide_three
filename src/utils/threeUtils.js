import { BoxGeometry, CanvasTexture, LinearFilter, Mesh, MeshPhongMaterial } from "three";

/**
 * 返回一个canvas文字图
 * @param width 宽度
 * @param height 高度
 * @param text 文字
 * @param color 背景色
 * @param fontSize 文字大小
 * @param fontColor 文字颜色
 * @param rotateDirection 文字旋转
 *        normal - 不旋转 right - 顺时针旋转90 left - 逆时针旋转90
 * @returns {HTMLElement}
 */
function getTextCanvas(width, height, text, color, fontSize, fontColor,rotateDirection){
  let canvas = document.createElement('canvas');
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  let ctx = canvas.getContext('2d');
  ctx.translate(width,height);
  ctx.fillStyle = color.replace(/0x/,'#');
  ctx.fillRect(-width, -height, width * 2, height * 2);
  ctx.font = (fontSize || '30px') + ' bold';
  ctx.fillStyle = fontColor || '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if(rotateDirection) {
    let angel;
    switch (rotateDirection) {
      case 'right' :
        angel = Math.PI/2;
        break;
      case 'left' :
        angel = -Math.PI/2;
        break;
      case 'normal' :
        angel = 0;
        break;
      default:
        break;
    }
    ctx.rotate(angel);
  } else if(width < height) {
    ctx.rotate(Math.PI/2);
  }
  ctx.fillText(text, 0, 0);
  return canvas;
}

/**
 * 返回一个立方体mesh
 * @param width 宽度
 * @param height 高度
 * @param depth 深度
 * @param color 材质颜色
 * @param name mesh的名字
 * @param canvasText 立方体表面文字
 * @param opacity 透明度
 * @param fontSize 立方体表面文字尺寸
 * @param fontColor 立方体表面文字颜色
 * @param canvasRotationDirection 文字旋转
 *        normal - 不旋转 right - 顺时针旋转90 left - 逆时针旋转90
 * @returns {Mesh}
 */
function getGeometryBox(
  width,
  height,
  depth,
  color,
  name,
  canvasText,
  opacity,
  fontSize,
  fontColor,
  canvasRotationDirection
) {
  let geometry = new BoxGeometry(width, height, depth);
  let canvas = getTextCanvas(width, depth, canvasText, color, fontSize, fontColor, canvasRotationDirection);
  let texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  let material = new MeshPhongMaterial({
    //材质的颜色会与贴图的颜色叠加,只设置贴图颜色即可
    // color: color.replace(/0x/,'#'),
    // emissive:color,
    transparent: true,
    opacity: opacity || 1,
    map: texture,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: 1
  });

  let materialColor = new MeshPhongMaterial({
    color: color.replace(/0x/, "#"),
    transparent: true,
    opacity: opacity || 1
  });

  let materialArr = [
    materialColor,
    materialColor,
    material,
    materialColor,
    materialColor,
    materialColor
  ];
  /*geometry.faceVertexUvs[0].map((item,index) => {
    item = [
      new Vector2(0, 0),
      new Vector2(0, 0),
      new Vector2(0, 0)
    ]
  });
  // geometry.faceVertexUvs[0] = [];
  geometry.faceVertexUvs[0][4] = [
    new Vector2(0, 1),
    new Vector2(0, 0),
    new Vector2(1, 1)
  ];
  geometry.faceVertexUvs[0][5] = [
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(1, 1)
  ];*/
  let mesh = new Mesh(geometry, materialArr);
  //设置模型的每个部位都可以投影
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = name;
  return mesh;
}

export { getTextCanvas, getGeometryBox }
