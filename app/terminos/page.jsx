import Link from 'next/link';

export const metadata = {
  title: 'Términos y Condiciones | Edelbyte',
  description: 'Términos de uso del servicio Edelbyte.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen background py-12 px-4 sm:px-6 lg:px-8">
      <div className="background max-w-3xl mx-auto prose prose-slate prose-strong:text-slate-50 prose-headings:text-slate-100 prose-a:text-slate-200">
        <h1>Términos y Condiciones de Uso</h1>
        <p className="text-sm text-slate-500">Última actualización: 28 de Abril de 2026</p>

        <p>
          Bienvenido a <strong>Edelbyte</strong>. Estos Términos y Condiciones ("Términos") rigen el uso de nuestra plataforma de gestión de contenidos (CMS) y servicios asociados (el "Servicio").
        </p>
        <p>
          Al acceder o utilizar el Servicio, aceptas estar sujeto a estos Términos. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al Servicio.
        </p>

        <h2>1. Descripción del Servicio</h2>
        <p>
          Edelbyte proporciona una plataforma basada en la web que permite a los usuarios crear, gestionar y publicar contenido digital. El Servicio incluye el acceso a nuestro panel de administración, API asociada y herramientas de publicación.
        </p>

        <h2>2. Cuentas de Usuario</h2>
        <ul>
          <li><strong>Registro:</strong> Para utilizar ciertas funciones del Servicio, debes registrarte y crear una cuenta. Debes proporcionar información precisa y actualizada.</li>
          <li><strong>Seguridad:</strong> Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.</li>
          <li><strong>Uso aceptable:</strong> No puedes usar el Servicio para fines ilegales, para enviar spam, malware, o para infringir derechos de propiedad intelectual de terceros.</li>
        </ul>

        <h2>3. Propiedad Intelectual</h2>
        <ul>
          <li><strong>Nuestro Contenido:</strong> El Servicio, incluyendo su código fuente, diseño, logotipos, y funcionalidades (desarrollado con tecnologías como Next.js, Supabase, etc.), es propiedad exclusiva de <strong>Edelbyte</strong> y está protegido por las leyes de propiedad intelectual de Argentina e internacionales.</li>
          <li><strong>Tu Contenido:</strong> Tú conservas todos los derechos sobre el contenido que subes, creas o gestionas a través del CMS ("Contenido del Usuario"). Nos otorgas una licencia limitada para alojar, almacenar y mostrar ese contenido únicamente con el fin de proporcionarte el Servicio.</li>
        </ul>

        <h2>4. Suscripciones y Pagos</h2>
        <p>
          Algunas partes del Servicio se ofrecen bajo un modelo de suscripción paga.
        </p>
        <ul>
          <li><strong>Facturación:</strong> Los pagos se procesan a través de <strong>Mercado Pago</strong>. Al suscribirte, autorizas a Mercado Pago a cobrar la tarifa recurrente según el plan elegido.</li>
          <li><strong>Renovación Automática:</strong> Las suscripciones se renuevan automáticamente al final de cada período (mensual o anual) a menos que canceles tu suscripción antes de la fecha de renovación.</li>
          <li><strong>Reembolsos:</strong> Debido a la naturaleza digital del servicio, no se ofrecen reembolsos por períodos parciales no utilizados, salvo lo que disponga la ley argentina de defensa del consumidor.</li>
          <li><strong>Cambios de Precio:</strong> Nos reservamos el derecho de modificar los precios de los planes. Cualquier cambio se notificará con al menos 30 días de antelación a la próxima facturación.</li>
        </ul>

        <h2>5. Cancelación y Terminación</h2>
        <ul>
          <li><strong>Por el Usuario:</strong> Puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta o contactando a soporte. Tu acceso continuará hasta el final del período pagado.</li>
          <li><strong>Por Edelbyte:</strong> Podemos suspender o terminar tu acceso al Servicio inmediatamente, sin previo aviso, si incumples estos Términos (por ejemplo, uso abusivo, impago, actividades ilegales).</li>
          <li><strong>Efectos de la Terminación:</strong> Tras la cancelación, tu derecho a usar el Servicio cesará. Te recomendamos exportar tu contenido antes de cancelar, ya que podríamos eliminar los datos de tu cuenta después de un período de gracia razonable (ej. 30 días).</li>
        </ul>

        <h2>6. Limitación de Responsabilidad</h2>
        <p>
          El Servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD".
        </p>
        <p>
          En la máxima medida permitida por la ley, <strong>Edelbyte</strong> no será responsable por daños indirectos, incidentales, especiales o consecuentes, incluyendo pero no limitado a pérdida de beneficios, pérdida de datos o interrupción del negocio, derivados del uso o imposibilidad de uso del Servicio.
        </p>
        <p>
          No garantizamos que el Servicio esté libre de errores o interrupciones. Dependemos de proveedores de infraestructura de terceros (como Vercel y Supabase) y no nos hacemos responsables por fallos originados en sus plataformas.
        </p>

        <h2>7. Modificaciones del Servicio</h2>
        <p>
          Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del Servicio en cualquier momento, con o sin aviso previo.
        </p>

        <h2>8. Ley Aplicable y Jurisdicción</h2>
        <p>
          Estos Términos se regirán e interpretarán de acuerdo con las leyes de la <strong>República Argentina</strong>. Cualquier disputa derivada de estos Términos se someterá a la jurisdicción exclusiva de los tribunales competentes de la ciudad de Campana, Buenos Aires, Argentina.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Si tienes preguntas sobre estos Términos, por favor contáctanos en: <a href="https://servicios.edelbyte.com.ar/">servicios.edelbyte.com.ar</a>.
        </p>

        <hr />

        <div className="mt-8 not-prose">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
            &larr; Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}