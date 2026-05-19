import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';

// Configura el SDK de Cloudinary con las credenciales del .env (Railway).
// Se ejecuta una sola vez al cargar este módulo.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Storage de multer que sube directo a Cloudinary en lugar de disco.
// Las imágenes viven en Cloudinary, NUNCA en el filesystem de Railway.
const storage = new CloudinaryStorage({
  cloudinary,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: (async (_req: Request, file: Express.Multer.File) => ({
    folder: 'mimundoazul',
    // Permite los formatos típicos de imagen
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    // Nombre único basado en timestamp + nombre original (sin extensión)
    public_id: `${Date.now()}-${file.originalname.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '_')}`,
    // Optimización automática (calidad y formato)
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })) as any,
});

@UseGuards(JwtAuthGuard)
@Controller('admin/uploads')
export class UploadsController {
  /**
   * POST /admin/uploads
   * Form-data: { file: <imagen> }
   * Devuelve: { url: "https://res.cloudinary.com/.../mimundoazul/xxx.png" }
   *
   * La imagen se sube a Cloudinary (CDN global, gratis hasta 25 GB) y
   * devolvemos la URL pública. Esa URL se guarda en producto.imagenUrl,
   * logo_url, hero_imagen_url, etc.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB máximo (Cloudinary lo optimiza solo)
    }),
  )
  subir(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    // El campo "path" de Multer + CloudinaryStorage es la URL pública en HTTPS.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url = (file as any).path as string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const publicId = (file as any).filename as string;

    return {
      ok: true,
      url,
      publicId,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
