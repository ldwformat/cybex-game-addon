function getPointByteFromArray(
  arrayLike: Uint8ClampedArray,
  x: number,
  y: number,
  width: number
) {
  return arrayLike.slice(y * width * 4 + x * 4, y * width * 4 + x * 4 + 4);
}

function isWhite(pointByte: Uint8ClampedArray) {
  return pointByte[0] > 250 && pointByte[1] > 250 && pointByte[2] > 250;
}

function isWhiteZone(
  imgData: Uint8ClampedArray,
  width: number,
  height: number,
  x: number,
  y: number,
  size: number,
  strict = false,
  l = 0,
  t = 0,
  r = width,
  b = height
) {
  if (size <= 1) {
    return {
      top: t,
      left: l,
      right: r,
      bottom: b,
      width: r - l,
      height: b - t
    };
  }
  // console.debug(
  //   "X: ",
  //   x,
  //   "; Y: ",
  //   y,
  //   "; Width: ",
  //   width,
  //   "; Height: ",
  //   height,
  //   "; Size: ",
  //   size
  // );
  let left = (function findLeft() {
    for (let left = x - 1; left > 0; left--) {
      if (!isWhite(getPointByteFromArray(imgData, left, y, width))) {
        return left + 1;
      }
    }
    return 0;
  })();
  let right = (function findRight() {
    for (let right = x + 1; right < width; right++) {
      if (!isWhite(getPointByteFromArray(imgData, right, y, width))) {
        return right - 1;
      }
    }
    return width;
  })();
  // console.debug("Left: ", left, "; Right: ", right, "; Delta: ", right - left);
  if (right - left < size) {
    return null;
  }
  let top = (function findTop() {
    for (let top = y - 1; top > 0; top--) {
      if (!isWhite(getPointByteFromArray(imgData, x, top, width))) {
        return top + 1;
      }
    }
    return 0;
  })();
  let bottom = (function findTop() {
    for (let top = y + 1; top < height; top++) {
      if (!isWhite(getPointByteFromArray(imgData, x, top, width))) {
        return top - 1;
      }
    }
    return height;
  })();
  let res = {
    top,
    bottom,
    left,
    right,
    width: right - left,
    height: bottom - top
  };
  if (bottom - top < size) {
    return null;
  }
  if (
    strict &&
    (!isWhiteZone(
      imgData,
      width,
      height,
      res.left + Math.floor(res.width / 4),
      res.top + Math.floor(res.height / 4),
      Math.ceil(size / 2),
      strict,
      res.left,
      res.top,
      res.left + Math.floor(res.width / 2),
      res.top + Math.floor(res.height / 2)
    ) ||
      !isWhiteZone(
        imgData,
        width,
        height,
        res.left + Math.floor(res.width / 4),
        res.top + Math.floor((res.height / 4) * 3),
        Math.ceil(size / 2),
        strict,
        res.left,
        res.top + Math.floor(res.height / 2),
        res.left + Math.floor(res.width / 2),
        res.bottom
      ) ||
      !isWhiteZone(
        imgData,
        width,
        height,
        res.left + Math.floor((res.width / 4) * 3),
        res.top + Math.floor(res.height / 4),
        Math.ceil(size / 2),
        strict,
        res.left + Math.floor(res.width / 2),
        res.top,
        res.right,
        res.top + Math.floor(res.height / 2)
      ) ||
      !isWhiteZone(
        imgData,
        width,
        height,
        res.left + Math.floor((res.width / 4) * 3),
        res.top + Math.floor((res.height / 4) * 3),
        Math.ceil(size / 2),
        strict,
        res.left + Math.floor(res.width / 2),
        res.top + Math.floor(res.height / 2),
        res.right,
        res.bottom
      ))
  ) {
    return null;
  }
  return res;
}

export function findFirstEmptyZone(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  minSize = 150
) {
  if (width < minSize || height < minSize) {
    return null;
  }
  let imgData = ctx.getImageData(0, 0, width, height);
  // console.debug("ImgData: ", imgData);
  for (let y = minSize - 1; y < imgData.height; y += minSize) {
    // console.debug("Total Height: ", height, y);
    for (let x = minSize - 1; x < imgData.width; x += minSize) {
      // console.debug("Total Width: ", width, x);
      let p = getPointByteFromArray(imgData.data, x, y, width);
      if (!isWhite(p)) {
        continue;
      }
      // console.debug("White Point: ", x, y, p);
      let res = isWhiteZone(
        imgData.data,
        imgData.width,
        imgData.height,
        x,
        y,
        minSize
      );
      if (res) {
        // console.debug("RES: ", res);
        return res;
      }
    }
  }
  return null;
}
