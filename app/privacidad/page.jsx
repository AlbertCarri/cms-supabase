import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | Edelbyte',
  description: 'Cómo manejamos tus datos en Edelbyte.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen background py-12 px-4 sm:px-6 lg:px-8">
      <div className="background max-w-3xl mx-auto prose prose-slate prose-strong:text-slate-50 prose-headings:text-slate-100 prose-a:text-slate-200">
        <h1>Política de Privacidad</h1>
        <p className="text-sm text-slate-500">Última actualización: 28 de Abril de 2026</p>

        <p>
          Bienvenido a <strong>Edelbyte</strong>. Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos tu información personal cuando utilizas nuestro servicio de CMS y herramientas asociadas (en adelante, el "Servicio").
        </p>

        <h2>1. Responsable del Tratamiento</h2>
        <p>
          El Servicio es operado por <strong>Edelbyte</strong>, una empresa unipersonal registrada en la República Argentina. 
          <br />
          Para cualquier consulta sobre privacidad, puedes contactarnos a través de: <a href="https://edelbyte.com.ar/">edelbyte.com.ar</a>.
        </p>

        <h2>2. Información que Recopilamos</h2>
        <p>Recopilamos la siguiente información para proporcionar y mejorar el Servicio:</p>
        <ul>
          <li><strong>Información de Registro:</strong> Cuando te registras, recopilamos tu nombre, dirección de correo electrónico y contraseña (encriptada).</li>
          <li><strong>Contenido Generado por el Usuario:</strong> Los datos, textos, imágenes o configuraciones que subes o creas dentro del CMS.</li>
          <li><strong>Datos de Uso:</strong> Información sobre cómo accedes al Servicio (dirección IP, tipo de navegador, páginas visitadas, horarios de acceso).</li>
        </ul>

        <h2>3. Cómo Usamos tu Información</h2>
        <p>Utilizamos los datos recopilados para:</p>
        <ul>
          <li>Proveer, operar y mantener el Servicio.</li>
          <li>Gestionar tu cuenta y autenticación.</li>
          <li>Comunicarnos contigo respecto a actualizaciones, seguridad o soporte técnico.</li>
          <li>Detectar y prevenir actividades fraudulentas o abusivas.</li>
        </ul>

        <h2>4. Infraestructura y Proveedores de Servicios</h2>
        <p>
          Edelbyte utiliza proveedores de terceros confiables para alojar y gestionar los datos. Estos proveedores tienen acceso limitado a tus datos solo para realizar estas tareas en nuestro nombre y están obligados a no divulgarlos ni usarlos para otros fines.
        </p>
        <ul>
          <li><strong>Vercel Inc.:</strong> Utilizamos Vercel para el alojamiento (hosting) y la infraestructura de frontend. Puedes leer su política de privacidad <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">aquí</a>.</li>
          <li><strong>Supabase Inc.:</strong> Utilizamos Supabase para la gestión de bases de datos, autenticación de usuarios y almacenamiento. Puedes leer su política de privacidad <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">aquí</a>.</li>
        </ul>

        <h2>5. Procesamiento de Pagos</h2>
        <p>
          Para las suscripciones y pagos recurrentes, utilizamos <strong>Mercado Pago</strong> como nuestra pasarela de pagos exclusiva.
        </p>
        <ul>
          <li><strong>No almacenamos datos financieros:</strong> Edelbyte NO almacena ni tiene acceso a los números de tu tarjeta de crédito, débito o datos bancarios.</li>
          <li><strong>Redirección segura:</strong> Cuando realizas un pago, eres redirigido a la plataforma segura de Mercado Pago. Allí ingresan tus credenciales financieras directamente con ellos.</li>
          <li><strong>Datos compartidos:</strong> Para procesar la transacción, compartimos con Mercado Pago información necesaria como tu nombre, email y el monto de la suscripción.</li>
        </ul>
        <p>
          El uso de tu información financiera se rige por los Términos de Uso y la Política de Privacidad de Mercado Pago, disponibles en su sitio web.
        </p>

        <h2>6. Seguridad de los Datos</h2>
        <p>
          La seguridad de tus datos es importante para nosotros. Utilizamos prácticas estándar de la industria, incluyendo encriptación HTTPS para la transmisión de datos y encriptación en reposo proporcionada por nuestros proveedores (Supabase/Vercel). Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
        </p>

        <h2>7. Retención de Datos</h2>
        <p>
          Conservaremos tu información personal solo durante el tiempo que sea necesario para los fines establecidos en esta política, o hasta que solicites la eliminación de tu cuenta. Puedes solicitar la eliminación de tus datos en cualquier momento desde la configuración de tu perfil o contactándonos.
        </p>

        <h2>8. Tus Derechos (Ley de Protección de Datos Personales - Argentina)</h2>
        <p>
          De acuerdo con la Ley N° 25.326 de Protección de Datos Personales de la República Argentina, tienes derecho a:
        </p>
        <ul>
          <li>Acceder a tu información personal.</li>
          <li>Rectificar datos inexactos o incompletos.</li>
          <li>Solicitar la supresión de tus datos cuando consideres que no son necesarios para los fines para los cuales fueron recogidos.</li>
        </ul>

        <h2>9. Cambios en esta Política</h2>
        <p>
          Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
        </p>

        <hr />

        <p className="text-sm text-slate-500 mt-8">
          Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en <a href="https://edelbyte.com.ar/">edelbyte.com.ar</a>.
        </p>
        
        <div className="mt-8 not-prose">
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
            &larr; Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}