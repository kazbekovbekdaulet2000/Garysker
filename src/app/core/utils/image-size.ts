export default function getImageDimenstion(imgUrl: string): number {

  let img = new Image();

  img.src = imgUrl;
  img.onload = function (event: any) {
    let loadedImage = event.currentTarget;
    let width = loadedImage?.width;
    let height = loadedImage?.height;
    return width
  }

  const ratio = img.width / img.height
  if (ratio > 0.01 && ratio <= 0.3) {
    return 165
  } else if (ratio > 0.3 && ratio <= 0.5) {
    return 200
  } else if (ratio > 0.5 && ratio <= 0.7) {
    return 240
  } else if (ratio > 0.7 && ratio <= 0.9) {
    return 280
  } else if (ratio > 0.9 && ratio <= 1.2) {
    return 320
  } else if (ratio > 0.3 && ratio <= 1.5) {
    return 360
  } else if (ratio > 1.5) {
    return 400
  } else {
    return 240
  }
}
