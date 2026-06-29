import imageCompression from 'browser-image-compression';

/**
 * Compresses an image client-side using the `browser-image-compression` library.
 * This runs the compression in a background Web Worker so it does not block the main UI thread.
 * 
 * @param file The original image file
 * @param maxWidthOrHeight The maximum width or height of the output image (default 1200px)
 * @param maxSizeMB The maximum target file size in megabytes (default 1MB)
 * @returns A promise that resolves to the compressed File object
 */
export async function compressImage(
  file: File,
  maxWidthOrHeight = 1200,
  maxSizeMB = 1
): Promise<File> {
  // Return original file if it's not an image
  if (!file.type.startsWith('image/')) {
    return file;
  }

  // GIF images shouldn't be compressed as they will lose their animation frames
  if (file.type === 'image/gif') {
    return file;
  }

  const options = {
    maxSizeMB,
    maxWidthOrHeight,
    useWebWorker: true,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    
    // Convert blob back to a File object with a clean name (replacing extension with .jpg)
    const originalName = file.name;
    const lastDotIndex = originalName.lastIndexOf('.');
    const nameWithoutExtension = lastDotIndex !== -1 ? originalName.substring(0, lastDotIndex) : originalName;
    const compressedFileName = `${nameWithoutExtension}_compressed.jpg`;

    return new File([compressedBlob], compressedFileName, {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error('Client-side compression failed, falling back to original file:', error);
    return file; // Fallback to original file if compression fails
  }
}
