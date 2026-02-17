"use client";
import { useState, useEffect } from 'react';

export default function LandingPage() {
  // Datos de la DEMO
  const [evento] = useState({
    tipo: "BODA",
    novios: "Carlos & Ana",
    fecha: "2026-12-15T18:00:00",
    lugar: "Vivero Forestal de Chimbote",
    mapaUrl: "https://maps.app.goo.gl/EjemploReal",
    whatsappHost: "51943444444"
  });

  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const meta = new Date(evento.fecha).getTime();
      const ahora = new Date().getTime();
      const diferencia = meta - ahora;

      if (diferencia > 0) {
        setTiempo({
          dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((diferencia / 1000 / 60) % 60),
          segundos: Math.floor((diferencia / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [evento.fecha]);

  // Tu número para recibir a los clientes
  const miWhatsApp = "51981550613"; 
  const mensajeVentas = encodeURIComponent("¡Hola! Vi tu página y me gustaría crear una invitación digital personalizada para mi evento.");

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col lg:flex-row">
      
      {/* SECCIÓN IZQUIERDA: MARKETING Y VENTAS */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 xl:p-24 z-10">
        <div className="inline-block bg-[#c2a359] text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-6 w-max">
          Servicio Premium
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Invitaciones digitales <span className="text-[#c2a359] italic font-serif font-light">elegantes</span> para tu evento
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorprende a tus invitados con una experiencia moderna y ecológica. Olvídate de imprimir papel y gestiona tus confirmaciones con un solo clic.
        </p>
        
        <ul className="space-y-4 mb-10">
          <li className="flex items-center text-gray-700 font-medium">
            <span className="text-[#c2a359] mr-3 text-xl">✨</span> Diseño personalizado con tus datos
          </li>
          <li className="flex items-center text-gray-700 font-medium">
            <span className="text-[#c2a359] mr-3 text-xl">⏳</span> Cuenta regresiva en tiempo real
          </li>
          <li className="flex items-center text-gray-700 font-medium">
            <span className="text-[#c2a359] mr-3 text-xl">📍</span> Ubicación exacta con Google Maps
          </li>
          <li className="flex items-center text-gray-700 font-medium">
            <span className="text-[#c2a359] mr-3 text-xl">📲</span> Confirmación directa a tu WhatsApp
          </li>
        </ul>

        {/* Caja de Llamado a la Acción (CTA) */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#c2a359]"></div>
          <h3 className="font-bold text-xl text-gray-800 mb-2">¿Quieres una invitación así?</h3>
          <p className="text-sm text-gray-500 mb-6">Escríbeme y prepararé un enlace único con tus nombres, fecha y lugar en menos de 24 horas.</p>
          <a 
            href={`https://wa.me/${miWhatsApp}?text=${mensajeVentas}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1ebd5a] transition-all shadow-lg hover:shadow-2xl active:scale-95"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      {/* SECCIÓN DERECHA: LA DEMO INTERACTIVA */}
      <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center p-4 lg:p-10 font-serif border-l border-gray-200">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 scale-95 lg:scale-100">
          <div className="bg-[#c2a359] text-white text-center py-8 px-4 rounded-b-[50%] shadow-inner relative">
            <div className="absolute top-2 right-4 bg-white/20 text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest border border-white/40">Demo</div>
            <p className="text-sm tracking-[0.3em] uppercase mb-2 opacity-90">{evento.tipo}</p>
            <h1 className="text-4xl sm:text-5xl italic font-light tracking-tight">{evento.novios}</h1>
          </div>
          <div className="p-8 text-center space-y-8">
            <p className="text-gray-500 uppercase tracking-widest text-sm">Tenemos el honor de invitarte</p>
            <div className="py-6 border-y border-gray-200">
              <p className="text-xs uppercase tracking-widest text-[#c2a359] mb-4 font-bold">Faltan</p>
              <div className="flex justify-center gap-4 sm:gap-6">
                <div className="flex flex-col items-center"><span className="text-3xl font-light">{tiempo.dias}</span><span className="text-[10px] uppercase tracking-wider text-gray-400">Días</span></div><span className="text-3xl font-light text-gray-300">:</span>
                <div className="flex flex-col items-center"><span className="text-3xl font-light">{tiempo.horas}</span><span className="text-[10px] uppercase tracking-wider text-gray-400">Hrs</span></div><span className="text-3xl font-light text-gray-300">:</span>
                <div className="flex flex-col items-center"><span className="text-3xl font-light">{tiempo.minutos}</span><span className="text-[10px] uppercase tracking-wider text-gray-400">Min</span></div><span className="text-3xl font-light text-gray-300">:</span>
                <div className="flex flex-col items-center"><span className="text-3xl font-light">{tiempo.segundos}</span><span className="text-[10px] uppercase tracking-wider text-gray-400">Seg</span></div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Lugar de Recepción</p>
              <p className="text-lg font-medium">{evento.lugar}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}