/**
 * Seeder — pobla la base con datos iniciales.
 * Se ejecuta con: npm run seed
 *
 * Crea:
 *   - 1 admin inicial (admin@mimundoazul.com / Admin123!)
 *   - Categorías de ejemplo
 *   - Productos de ejemplo
 *   - Toda la configuración por defecto (WhatsApp, hero, redes, etc.)
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  // ============================================================
  // ADMIN INICIAL
  // ============================================================
  const passwordHash = await bcrypt.hash('Admin123!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@mimundoazul.com' },
    update: {},
    create: {
      email: 'admin@mimundoazul.com',
      password: passwordHash,
      nombre: 'Administrador',
    },
  });
  console.log('  ✅ Admin: admin@mimundoazul.com / Admin123!');

  // ============================================================
  // CATEGORÍAS
  // ============================================================
  const categorias = [
    { nombre: 'Montessori', slug: 'montessori', icono: '🧩', orden: 1 },
    { nombre: 'Bloques y Construcción', slug: 'bloques', icono: '🧱', orden: 2 },
    { nombre: 'Lógica y Rompecabezas', slug: 'logica', icono: '🧠', orden: 3 },
    { nombre: 'Arte y Creatividad', slug: 'arte', icono: '🎨', orden: 4 },
    { nombre: 'Ciencia y STEM', slug: 'stem', icono: '🔬', orden: 5 },
    { nombre: 'Música y Sonido', slug: 'musica', icono: '🎵', orden: 6 },
  ];
  for (const cat of categorias) {
    await prisma.categoria.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`  ✅ ${categorias.length} categorías`);

  // ============================================================
  // PRODUCTOS DE EJEMPLO
  // ============================================================
  const categoriasDB = await prisma.categoria.findMany();
  const catId = (slug: string) =>
    categoriasDB.find((c) => c.slug === slug)?.id;

  const productos = [
    {
      sku: 'MTS-001',
      nombre: 'Torre rosa Montessori',
      descripcion: 'Diez bloques de madera rosa en escala decimal. Desarrolla coordinación y discriminación visual.',
      precio: 35.0,
      precioPromo: 29.99,
      categoriaId: catId('montessori'),
      stock: 12,
      edadMin: 3,
      edadMax: 6,
      destacado: true,
      orden: 1,
    },
    {
      sku: 'BLQ-001',
      nombre: 'Set bloques de madera natural (50 piezas)',
      descripcion: 'Bloques sin pintura, lisos y seguros. Estimula la creatividad.',
      precio: 28.0,
      categoriaId: catId('bloques'),
      stock: 20,
      edadMin: 2,
      edadMax: 8,
      destacado: true,
      orden: 2,
    },
    {
      sku: 'LOG-001',
      nombre: 'Rompecabezas formas geométricas',
      descripcion: 'Encaja las formas en sus huecos correspondientes.',
      precio: 18.5,
      categoriaId: catId('logica'),
      stock: 15,
      edadMin: 2,
      edadMax: 5,
      orden: 3,
    },
    {
      sku: 'ART-001',
      nombre: 'Kit de pintura para niños',
      descripcion: 'Acuarelas, pinceles, papel especial. Todo lo necesario para crear.',
      precio: 22.0,
      precioPromo: 17.99,
      categoriaId: catId('arte'),
      stock: 30,
      edadMin: 4,
      edadMax: 12,
      destacado: true,
      orden: 4,
    },
    {
      sku: 'STM-001',
      nombre: 'Microscopio educativo',
      descripcion: 'Microscopio real con 3 portaobjetos preparados. Despierta la curiosidad científica.',
      precio: 45.0,
      categoriaId: catId('stem'),
      stock: 8,
      edadMin: 6,
      edadMax: 14,
      orden: 5,
    },
    {
      sku: 'MUS-001',
      nombre: 'Tambor pequeño de madera',
      descripcion: 'Tambor artesanal de madera. Excelente para desarrollar el ritmo.',
      precio: 15.0,
      categoriaId: catId('musica'),
      stock: 25,
      edadMin: 1,
      edadMax: 5,
      orden: 6,
    },
  ];

  for (const p of productos) {
    await prisma.producto.upsert({
      where: { sku: p.sku },
      update: {},
      create: p,
    });
  }
  console.log(`  ✅ ${productos.length} productos de ejemplo`);

  // ============================================================
  // CONFIGURACIÓN INICIAL
  // ============================================================
  const config = [
    // Contacto
    { clave: 'whatsapp_numero', valor: '+593991234567', descripcion: 'Número de WhatsApp con código de país (sin espacios)' },
    { clave: 'email_contacto', valor: 'info@mimundoazul.com', descripcion: 'Email principal de contacto' },
    { clave: 'telefono', valor: '+593 99 123 4567', descripcion: 'Teléfono para mostrar en el sitio' },
    { clave: 'direccion', valor: 'Av. Principal 123, Quito - Ecuador', descripcion: 'Dirección física' },

    // Hero / Banner
    { clave: 'hero_titulo', valor: 'Bienvenidos a Mi Mundo Azul', descripcion: 'Título principal de la portada' },
    { clave: 'hero_subtitulo', valor: 'Juegos didácticos que despiertan la imaginación', descripcion: 'Subtítulo de la portada' },
    { clave: 'hero_imagen_url', valor: '', descripcion: 'URL de la imagen del hero' },

    // Branding
    { clave: 'logo_url', valor: '', descripcion: 'URL del logo' },
    { clave: 'nombre_marca', valor: 'Mi Mundo Azul', descripcion: 'Nombre de la marca' },
    { clave: 'eslogan', valor: 'Crece jugando', descripcion: 'Eslogan corto' },

    // Redes sociales
    { clave: 'instagram_url', valor: 'https://instagram.com/mimundoazul', descripcion: 'URL de Instagram' },
    { clave: 'facebook_url', valor: 'https://facebook.com/mimundoazul', descripcion: 'URL de Facebook' },
    { clave: 'tiktok_url', valor: '', descripcion: 'URL de TikTok (opcional)' },

    // WhatsApp
    { clave: 'wsp_mensaje_inicial', valor: 'Hola! Quiero comprar:', descripcion: 'Texto inicial del mensaje de WhatsApp' },
    { clave: 'wsp_mensaje_final', valor: '¿Cómo coordinamos el pago y la entrega?', descripcion: 'Texto final del mensaje' },

    // Pasarela de pago (próximamente)
    { clave: 'pasarela_pago_activa', valor: 'false', descripcion: 'true/false — activa pasarela de pago' },
    { clave: 'pasarela_pago_mensaje', valor: '💳 Próximamente: pago con tarjeta', descripcion: 'Mensaje que se muestra mientras no esté activa' },
  ];

  for (const c of config) {
    await prisma.configuracion.upsert({
      where: { clave: c.clave },
      update: {},
      create: c,
    });
  }
  console.log(`  ✅ ${config.length} configuraciones`);

  console.log('🎉 Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
