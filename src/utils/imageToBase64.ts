import fs from 'fs'
import path from 'path'

export function getBase64Image(imagePath: string) {
  const imageBuffer = fs.readFileSync(path.join(process.cwd(), imagePath))
  return `data:image/png;base64,${imageBuffer.toString('base64')}`
} 