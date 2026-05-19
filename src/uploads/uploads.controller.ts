import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Request } from 'express';

// Solo imágenes
const FORMATOS_VALIDOS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];

@UseGuards(JwtAuthGuard)
@Controller('admin/uploads')
export class UploadsController {
  /**
   * POST /admin/uploads
   * Form-data: { file: <imagen> }
   * Devuelve: { url: "/uploads/abc123.png" }
   *
   * El admin sube una foto y recibe la URL para usar en
   * imagenUrl de un producto, logo, hero, etc.
   */
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          _req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          const ext = extname(file.originalname).toLowerCase();
          const nombreUnico = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 10)}${ext}`;
          cb(null, nombreUnico);
        },
      }),
      fileFilter: (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, accept: boolean) => void,
      ) => {
        const ext = extname(file.originalname).toLowerCase();
        if (!FORMATOS_VALIDOS.includes(ext)) {
          return cb(
            new BadRequestException(
              `Formato no permitido. Aceptados: ${FORMATOS_VALIDOS.join(', ')}`,
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB máximo
    }),
  )
  subir(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('No se envió ningún archivo');
    }

    // Devuelvo la URL pública relativa. En producción podés concatenar
    // el dominio (https://api.mimundoazul.com/uploads/...)
    const protocol = req.protocol;
    const host = req.get('host');
    const url = `${protocol}://${host}/uploads/${file.filename}`;

    return {
      ok: true,
      url,
      path: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
