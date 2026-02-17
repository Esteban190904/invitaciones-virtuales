"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; // Importamos tu conexión

export default function AdminPanel() {
  // --- ESTADOS DE SEGURIDAD ---
  const [autenticado, setAutenticado] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // --- ESTADOS DE LA INVITACIÓN ---
  const [evento, setEvento] = useState({
    tipo: "BODA",
    novios: "Carlos & Ana",
    fecha: "2026-12-15T18:00", 
    lugar: "Vivero Forestal de Chimbote",
    mapaUrl: "https://maps.app.goo.gl/ejemplo",
    whatsappHost: "51943662094"
  });

  const [tiempo, setTiempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [guardando, setGuardando] = useState(false);
  const [linkGenerado, setLinkGenerado] = useState("");

  // --- FUNCIÓN DE LOGIN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // IMPORTANTE: Cambia "admin123" por una contraseña segura para ti
    if (passwordInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAutenticado(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  // --- FUNCIÓN ESTRELLA: Guardar en Supabase ---
  const handleGuardar = async () => {
    setGuardando(true);
    setLinkGenerado("");

    const slugBase = evento.novios.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const slugFinal = `${slugBase}-${Math.floor(Math.random() * 1000)}`;

    const { data, error } = await supabase
      .from('eventos')
      .insert([
        { 
          slug: slugFinal,
          tipo: evento.tipo,
          novios: evento.novios,
          fecha: evento.fecha,
          lugar: evento.lugar,
          mapa_url: evento.mapaUrl,
          whatsapp: evento.whatsappHost
        }
      ]);

    setGuardando(false);

    if (error) {
      alert("Hubo un error al guardar: " + error.message);
      console.error(error);
    } else {
      setLinkGenerado(`http://localhost:3000/${slugFinal}`);
      alert("¡Invitación guardada con éxito!");
    }
  };

  // --- TEMPORIZADOR PARA LA VISTA PREVIA ---
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

  // --- RENDER 1: PANTALLA DE LOGIN (Si no está autenticado) ---
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 shadow-xl rounded-xl max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Acceso Restringido</h1>
          <p className="text-sm text-gray-500 mb-6">Panel exclusivo de administración</p>
          <input 
            type="password" 
            placeholder="Ingresa la contraseña" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] outline-none transition-all mb-4 text-center"
          />
          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // --- RENDER 2: PANEL DE CONTROL (Si está autenticado) ---
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      
      {/* PANEL IZQUIERDO - FORMULARIO DE CONTROL */}
      <div className="w-full lg:w-1/3 bg-white p-8 shadow-xl z-10 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Panel de Creación</h2>
        
        <div className="space-y-4">
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tipo de Evento</label><input type="text" name="tipo" value={evento.tipo} onChange={handleChange} className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] focus:bg-white focus:border-transparent outline-none transition-all shadow-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombres (Ej. Carlos & Ana)</label><input type="text" name="novios" value={evento.novios} onChange={handleChange} className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] focus:bg-white focus:border-transparent outline-none transition-all shadow-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha y Hora</label><input type="datetime-local" name="fecha" value={evento.fecha} onChange={handleChange} className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] focus:bg-white focus:border-transparent outline-none transition-all shadow-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lugar Exacto</label><input type="text" name="lugar" value={evento.lugar} onChange={handleChange} className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] focus:bg-white focus:border-transparent outline-none transition-all shadow-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Link de Google Maps</label><input type="text" name="mapaUrl" value={evento.mapaUrl} onChange={handleChange} className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] focus:bg-white focus:border-transparent outline-none transition-all shadow-sm" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp (Para confirmar)</label><input type="text" name="whatsappHost" value={evento.whatsappHost} onChange={handleChange} className="w-full border-2 border-gray-200 bg-gray-50 p-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-[#c2a359] focus:bg-white focus:border-transparent outline-none transition-all shadow-sm" /></div>

          <button 
            onClick={handleGuardar}
            disabled={guardando}
            className={`w-full text-white py-3 rounded mt-6 font-bold uppercase tracking-widest transition-all ${guardando ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
          >
            {guardando ? 'Guardando en la nube...' : 'Guardar e Imprimir Link'}
          </button>

          {/* Mostrar el link si se guardó con éxito */}
          {linkGenerado && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded text-center">
              <p className="text-sm text-green-800 mb-2 font-bold">¡Listo! Envíale este link a tu cliente:</p>
              <a href={linkGenerado} target="_blank" className="text-blue-600 underline break-all font-mono text-sm">{linkGenerado}</a>
            </div>
          )}
        </div>
      </div>

      {/* PANEL DERECHO - VISTA PREVIA */}
      <div className="w-full lg:w-2/3 bg-[#faf9f6] flex items-center justify-center p-4 lg:p-10 font-serif">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 scale-95 lg:scale-100">
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
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}