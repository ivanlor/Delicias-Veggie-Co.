import React, { useState } from 'react';
import { Copy, Save, Check, ExternalLink, HelpCircle } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [savedUrl, setSavedUrl] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('delicias_webhook_url') || 'https://script.google.com/macros/s/AKfycbzDxWBp66FKrCzIbAPyV-L0vzfBYwJ3TybwkmPQXanlHNfSjkYcPMwCuyFL9b2uDj9t/exec';
  });

  const scriptCode = `function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; // Asegúrate de que tu hoja de recetas es la PRIMERA pestaña
  
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var name = data.name.toString().trim();
    // Buscamos por el nombre antiguo si se cambió, o por el nuevo
    var searchName = (data.oldName || name).toString().trim();

    // 1. BUSCADOR NATIVO DE GOOGLE (Mucho más fiable)
    // Busca en la Columna A (1) coincidencias exactas ignorando mayúsculas
    var finder = sheet.getRange("A:A").createTextFinder(searchName).matchEntireCell(true).matchCase(false);
    var match = finder.findNext();
    
    // CASO A: BORRAR
    if (action === 'delete') {
      if (match) {
        sheet.deleteRow(match.getRow());
        return ContentService.createTextOutput("OK: Borrado");
      }
      return ContentService.createTextOutput("Error: No encontrado para borrar");
    }

    // CASO B: ACTUALIZAR O INSERTAR (Lógica Upsert)
    if (match) {
      // Si ya existe una fila con ese nombre, la SOBRESCRIBIMOS
      var row = match.getRow();
      // Actualizamos columnas A, B, C (Receta, Ingredientes, Instrucciones)
      sheet.getRange(row, 1, 1, 3).setValues([[name, data.ingredients, data.instructions]]);
      return ContentService.createTextOutput("OK: Actualizado en fila " + row);
    } else {
      // Si no existe, creamos una fila NUEVA al final (A: Receta, B: Ingredientes, C: Instrucciones)
      sheet.appendRow([name, data.ingredients, data.instructions]);
      return ContentService.createTextOutput("OK: Creado nuevo");
    }

  } catch (err) {
    return ContentService.createTextOutput("Error Crítico: " + err.toString());
  }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('delicias_webhook_url', webhookUrl.trim());
    setSavedUrl(true);
    setTimeout(() => setSavedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="bg-[#fbfcfa] rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh] border border-gray-200">
        
        {/* Header modal */}
        <div className="bg-emerald-800 p-8 text-white relative">
          <h2 className="text-2xl font-extrabold tracking-tight">Conecta tu Google Sheets</h2>
          <p className="text-emerald-100 text-sm mt-1 leading-relaxed">
            Sincroniza tus recetas locales directamente con tus hojas de cálculo en tiempo real.
          </p>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-emerald-100 hover:text-white transition-colors p-1"
            aria-label="Cerrar configuración"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          
          {/* Section 1: URL de Sincronización */}
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-extrabold text-gray-900 text-lg mb-4 flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800 text-xs font-black">Paso 1</span>
              Tu enlace de Google Apps Script
            </h3>
            
            <form onSubmit={handleSaveUrl} className="space-y-4">
              <div>
                <label htmlFor="webhook-url-input" className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                  URL de la Webapp de Google Sheets:
                </label>
                <div className="flex gap-2">
                  <input 
                    id="webhook-url-input"
                    type="url" 
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-grow block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      savedUrl ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {savedUrl ? (
                      <>
                        <Check className="h-4 w-4" />
                        Guardado
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Guardar
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {!webhookUrl ? (
                <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-normal">
                  ⚠️ Actualmente no tienes configurada una URL personalizada. La app usará la base de datos de recetas de ejemplo por defecto. Agrega tu propia Webapp para guardar recetas en tu Google Sheet personal.
                </div>
              ) : (
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 leading-normal flex items-center gap-2">
                  <span>✨ Tu aplicación está vinculada y sincronizando con tu hoja de cálculo personalizada.</span>
                </div>
              )}
            </form>
          </section>

          {/* Section 2: Instrucciones y Código */}
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-800 text-xs font-black">Paso 2</span>
              Cómo obtener tu enlace web (Google Apps Script)
            </h3>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <p className="font-bold text-gray-800">Crea las columnas en tu hoja de cálculo</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Abre tu Google Sheets y asegúrate de que tiene estas cabeceras exactas en la primera pestaña (Fila 1):
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono font-bold text-gray-600">A: Receta</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono font-bold text-gray-600">B: Ingredientes</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-mono font-bold text-gray-600">C: Instrucciones</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <p className="font-bold text-gray-800">Copia el código del Script</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Este código es el que procesa la subida de datos desde la app a tu excel.
                  </p>
                  
                  {/* Caja de Código */}
                  <div className="bg-slate-900 rounded-2xl p-4 relative border border-slate-800 shadow-md mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-gray-400 font-bold">Google_Apps_Script_V8.js</span>
                      <button 
                        onClick={handleCopy}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                          copied ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copiar Código
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-emerald-400 text-[10px] font-mono overflow-x-auto leading-relaxed max-h-28 custom-scrollbar">
                      {scriptCode}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <p className="font-bold text-gray-800">Abre Apps Script en tu Excel</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    En tu Google Sheet, haz clic en <span className="font-bold">Extensiones &rarr; Apps Script</span>.
                    <a 
                      href="https://script.google.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-0.5 font-semibold"
                    >
                      Ir a Google Scripts <ExternalLink className="h-3 w-3 inline" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                <div>
                  <p className="font-bold text-gray-800">Pega el código, guarda y despliega</p>
                  <ul className="list-disc list-inside text-xs text-gray-500 mt-1 space-y-1">
                    <li>Borra lo que haya en la pantalla de código y pega el código de arriba.</li>
                    <li>Guarda pulsando el botón <span className="font-bold">Guardar proyecto (icono de disquete)</span>.</li>
                    <li>Haz clic en <span className="font-bold text-rose-700">Implementar &rarr; Nueva implementación</span>.</li>
                    <li>Selecciona tipo: <span className="font-bold">Aplicación web</span> (configuraciones obligatorias):
                      <ul className="pl-6 list-circle space-y-0.5 mt-1">
                        <li>Ejecutar como: <span className="font-bold text-slate-800">Tú (tu correo)</span></li>
                        <li>Quién tiene acceso: <span className="font-bold text-emerald-800">Cualquiera (Anyone)</span> &larr; <span className="italic">¡Súper importante!</span></li>
                      </ul>
                    </li>
                    <li>Pulsa el botón azul <span className="font-bold">Implementar</span>, otorga los permisos de Google si te los pide.</li>
                    <li>Copia la <span className="font-bold text-emerald-700">URL del web app</span> que te asigne Google y pégala en el <b>Paso 1</b> de esta ventana.</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          <button 
            onClick={onClose}
            className="w-full py-4 rounded-2xl font-bold text-base bg-emerald-800 hover:bg-emerald-900 text-white transition-all shadow-md mt-4"
          >
            Completado &middot; Cerrar ajustes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
