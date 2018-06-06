/* global loadImage, saveAs */

// Render a black ring on a transparent background and return the canvas
const makeRingMask = (radius, stroke) => {
  const ringCanvas = document.createElement('canvas')
  ringCanvas.width = radius * 2
  ringCanvas.height = radius * 2
  const ringCtx = ringCanvas.getContext('2d')
  ringCtx.beginPath()
  ringCtx.arc(
    ringCanvas.width / 2,
    ringCanvas.height / 2,
    radius - (stroke / 2),
    0, 2 * Math.PI
  )
  ringCtx.lineWidth = stroke
  ringCtx.stroke()
  return ringCanvas
}

// Render a trans pride gradient and return the canvas
const makePrideGradient = (width, height) => {
  const gradientCanvas = document.createElement('canvas')
  gradientCanvas.width = width
  gradientCanvas.height = height
  const gradientCtx = gradientCanvas.getContext('2d')
  const gradient = gradientCtx.createLinearGradient(0, 0, 0, gradientCtx.canvas.height)
  gradient.addColorStop(0, '#fff433')
  gradient.addColorStop(0.33, '#ffffff')
  // gradient.addColorStop(0.5, '#ffffff')
  gradient.addColorStop(0.66, '#9b59d0')
  gradient.addColorStop(1, '#000000')

  gradientCtx.fillStyle = gradient
  gradientCtx.fillRect(0, 0, gradientCtx.canvas.width, gradientCtx.canvas.height)
  return gradientCanvas
}

// Put img on imageCanvas and add the trans pride ring to it
const addPrideRingToImage = (img, imageCanvas, stroke) => {
  // Get smallest img dimension
  const sideLength = img.width <= img.height ? img.width : img.height
  imageCanvas.width = sideLength
  imageCanvas.height = sideLength
  const imageCtx = imageCanvas.getContext('2d')
  imageCtx.drawImage(img, 0, 0)

  const gradientCanvas = makePrideGradient(imageCanvas.width, imageCanvas.height)
  const ringCanvas = makeRingMask(sideLength / 2, stroke)
  const gradientCtx = gradientCanvas.getContext('2d')
  gradientCtx.globalCompositeOperation = 'destination-in'
  gradientCtx.drawImage(ringCanvas, 0, 0)

  imageCtx.drawImage(gradientCanvas, 0, 0)
}

// Load the image from the client and render the ring on it
const handleFile = (file, targetCanvas, stroke, callback) => {
  loadImage(file, img => {
    targetCanvas.style.display = 'block'
    addPrideRingToImage(img, targetCanvas, stroke)

    const strokeSlider = document.getElementById('range-stroke')
    strokeSlider.addEventListener('change', event => {
      addPrideRingToImage(img, targetCanvas, event.target.value)
    })

    callback()
  },
  {orientation: true})
}

const doNothing = (event) => {
  event.stopPropagation()
  event.preventDefault()
}

// Make the canvas clickable
const canvas = document.getElementById('canvas')
canvas.addEventListener('click', event => {
  canvas.toBlob(blob => {
    saveAs(blob, 'pride.png')
  })
})

// Setup file drag-and-drop
const dropbox = document.getElementById('dropbox')
dropbox.addEventListener('dragenter', doNothing)
dropbox.addEventListener('dragover', doNothing)
dropbox.addEventListener('drop', event => {
  event.stopPropagation()
  event.preventDefault()
  handleFile(event.dataTransfer.files[0], canvas, strokeSlider.value, () => {
    document.getElementById('customize-form').style.display = 'block'
  })
})

// Setup file input 
const inputElement = document.getElementById('input')
inputElement.addEventListener('change', (event) => {
  handleFile(inputElement.files[0], canvas, strokeSlider.value, () => {
    document.getElementById('customize-form').style.display = 'block'
  })
})

// Setup ring stroke slider
const strokeSlider = document.getElementById('range-stroke')
const strokeOutput = document.getElementById('stroke-output')
strokeSlider.addEventListener('input', event => {
  strokeOutput.textContent = `${event.target.value} px`
})
