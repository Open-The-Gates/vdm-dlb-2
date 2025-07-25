// Mock async functions
export const uploadFile = (file: any, onProgress: (p: number) => void) => {
  return new Promise<void>((resolve) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        clearInterval(interval)
        onProgress(100)
        resolve()
      } else {
        onProgress(progress)
      }
    }, 300)
  })
}

export const fetchPreview = (file: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Preview for ${file.name}`)
    }, 500)
  })
}
