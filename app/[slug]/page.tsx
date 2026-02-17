"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';

// Definimos la "forma" exacta de tus datos
interface EventoData {
  id?: string;
  slug: string;
  tipo: string;
  novios: string;
  fecha: string;
  lugar: string;
  mapa_url: string;
  whatsapp: string;
}


export default function InvitacionCliente() {
  const params = useParams();
  const slug = params.slug; // Captura el "carlos-y-ana-123" de la URL

  const [evento, setEvento] = useState<EventoData | null>(null);
  const [cargando, setCargando] = useState(true);
  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  // 1. Buscar los datos en Supabase cuando la página carga
  useEffect(() => {
    const fetchEvento = async () => {
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .eq('slug', slug)
        .single(); // Trae un solo registro

      if (data) {
        setEvento(data);
      }
      setCargando(false);
    };

    if (slug) fetchEvento();
  }, [slug]);

  // 2. Lógica del temporizador (solo funciona si hay un evento cargado)
  useEffect(() => {
    if (!evento) return;

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
  }, [evento]);

  // Pantalla de carga
  if (cargando) {
    return <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] text-[#c2a359]">Cargando invitación...</div>;
  }

  // Pantalla de error si el link no existe
  if (!evento) {
    return <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] text-red-500">Invitación no encontrada o enlace incorrecto.</div>;
  }

  // LA INVITACIÓN REAL
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#333] flex flex-col items-center justify-center p-4 sm:p-8 font-serif">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        <div className="bg-[#c2a359] text-white text-center py-8 px-4 rounded-b-[50%] shadow-inner">
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
            <a href={evento.mapa_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[#c2a359] underline text-sm hover:text-[#a08442] transition-colors">
              Ver mapa y cómo llegar
            </a>
          </div>

          <button 
            onClick={() => {
              const mensaje = encodeURIComponent(`¡Hola! Confirmo mi asistencia con mucha alegría a la boda de ${evento.novios}. 🥂`);
              window.open(`https://wa.me/${evento.whatsapp}?text=${mensaje}`, '_blank');
            }}
            className="w-full bg-[#c2a359] text-white py-4 rounded-xl font-medium tracking-wide shadow-lg hover:bg-[#a08442] hover:shadow-xl transition-all active:scale-95 uppercase text-sm"
          >
            Confirmar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}