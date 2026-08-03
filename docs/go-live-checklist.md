# Go-Live Checklist — Melari Spa

Guía de activación de la implementación lista para producción. El sitio tiene
dos modos controlados por `SITE_MODE` (ver `.env.example`):

| Modo | Uso | robots | CTA principal | Formulario | Redes | Tidio |
|---|---|---|---|---|---|---|
| `preview` (default) | Demo ante cliente | `noindex, nofollow` | → `/services` | oculto (sin formularios muertos) | ocultas (muted) | desactivado |
| `live` | Producción | indexado + sitemap | → booking / WhatsApp / tel | solo si hay email | reales (verificadas) | activo |

## Activar producción (lo único que hace falta)

1. **Cargar los datos confirmados del cliente** en `src/lib/business.ts`:
   - `phone` y `whatsapp` (E.164, ej. `+52 55 1234 5678`)
   - `email`, `web`
   - `address`, `city`, `region`, `country`, `postalCode`
   - `mapUrl` (embed de Google Maps + enlace "Cómo llegar")
   - `latitude` / `longitude` (recomendado para JSON-LD)
   - `social.facebook`, `social.instagram`, `social.tiktok` (URLs reales)
   - `bookingUrl` (TimeUp) — si queda vacío, el CTA cae a WhatsApp/tel
   - `hours.*` (horarios; si algún día está vacío, se omite de JSON-LD)
   - `domain` (sin protocolo, ej. `melarispa.com`) — activa canonical/OG/JSON-LD/sitemap
2. **Cambiar `SITE_MODE=live`** en el entorno de despliegue (`.env` de Vercel).
   > El build **falla** si falta un canal de conversión o un campo esencial,
   > así que es imposible desplegar live incompleto por accidente.
3. **Desplegar**. El PR va a `staging`; el despliegue de producción se hace
   desde `main` (o el pipeline que defina el equipo) — nunca se mergea solo.

## Checklist de verificación pre-go-live

### Datos y canales
- [ ] `SITE_MODE=live npm run build` pasa con exit 0.
- [ ] CTA principal apunta a booking (TimeUp) o WhatsApp/tel real.
- [ ] `tel:`, `mailto:`, `wa.me` generados correctamente (E.164).
- [ ] Dirección, ciudad, horarios y mapa verificados por el cliente.
- [ ] Redes sociales son enlaces reales (target `_blank`, `rel=noopener`).
- [ ] Formulario de contacto solo si hay email configurado; si no, no existe.

### SEO
- [ ] `robots.txt` en live tiene `Allow: /` + `Sitemap: <domain>/sitemap-index.xml`.
- [ ] `sitemap-index.xml` y `sitemap-0.xml` listan las 8 rutas (o las vigentes).
- [ ] `canonical` presente en todas las páginas.
- [ ] `og:*` y `twitter:*` usan el dominio absoluto.
- [ ] JSON-LD `HealthAndBeautyBusiness` válido (validar en
  <https://search.google.com/test/rich-results>).

### Diseño y a11y
- [ ] Revisión visual en 375, 768 y 1280 (hero, servicios, about, video,
  contacto, mapa, footer).
- [ ] Navegación por teclado completa con focus visible (Tab + Shift+Tab).
- [ ] `prefers-reduced-motion` desactiva todas las animaciones.
- [ ] Sin enlaces rotos (`href="#"`, `href="/"` falsos, destinos 404).
- [ ] Consola del navegador sin errores.
- [ ] Lighthouse ≥ 90 en Performance/Accesibilidad/SEO/Mejores prácticas.

## Decisión: widget Tidio

El chat de Tidio (`code.tidio.co/eytnto8chqpwuaglmim8cv0bmbotyvvp.js`) es un
script de terceros que **solo se carga en modo live**. En preview no se
incluye porque:
- es un script de terceros ajeno al alcance editorial aprobado;
- añade peticiones y superficie de tracking que no tienen sentido en una demo;
- el preview debe ser una representación limpia y honesta del producto.

Al activar live se puede decidir mantenerlo (por defecto se carga) o retirarlo
eliminando el bloque condicional en `src/layouts/main-layout.astro`.

## Modo preview (estado actual)

El repo queda por defecto en `preview`:
- `robots.txt` → `Disallow: /`
- `<meta name="robots" content="noindex, nofollow">`
- CTA principal → `/services` (explorar, no convertir)
- Sin formulario de contacto (se muestra presentación de canales pendientes)
- Redes sociales atenuadas con nota "pendiente de verificación"
- Tidio y sitemap ausentes

Esto es lo que se muestra hoy en `staging` y ante el cliente. Para ir a
producción solo hace falta completar el paso 1 y 2 de arriba.
