import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

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
    // Busca en la Columna B (2) coincidencias exactas ignorando mayúsculas
    var finder = sheet.getRange("B:B").createTextFinder(searchName).matchEntireCell(true).matchCase(false);
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
      // Actualizamos columnas B, C, D, E (Título, Tipo, Ingredientes, Instrucciones)
      sheet.getRange(row, 2, 1, 4).setValues([[name, data.type, data.ingredients, data.instructions]]);
      return ContentService.createTextOutput("OK: Actualizado en fila " + row);
    } else {
      // Si no existe, creamos una fila NUEVA al final
      sheet.appendRow([new Date(), name, data.type, data.ingredients, data.instructions]);
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-red-950/90 backdrop-blur-xl" onClick={onClose} />
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh] border-[8px] border-red-500">
        
        <div className="bg-red-600 p-8 text-white text-center">
          <div className="text-6xl mb-4 animate-bounce">🚨</div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">SCRIPT DE SEGURIDAD V8</h2>
          <p className="text-red-100 text-sm font-bold mt-2">¡Sigue los pasos al pie de la letra para evitar duplicados!</p>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2rem] p-6 relative border-4 border-slate-800 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-red-400">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Google_Apps_Script_V8.js</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className={`px-8 py-3 rounded-2xl text-sm font-black transition-all transform active:scale-95 ${
                    copied ? 'bg-green-500 text-white scale-110' : 'bg-white text-slate-900'
                  }`}
                >
                  {copied ? '✅ COPIADO' : 'COPIAR CÓDIGO V8'}
                </button>
              </div>
              <pre className="text-red-400 text-[10px] font-mono overflow-x-auto leading-relaxed max-h-40 custom-scrollbar">
                {scriptCode}
              </pre>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-slate-900 uppercase text-center border-b-2 border-slate-100 pb-2">Pasos Obligatorios:</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black">1</div>
                  <p className="text-xs text-slate-600 font-medium">Borra el código viejo en Google y pega este.</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black">2</div>
                  <p className="text-xs text-slate-600 font-medium">Pulsa el botón de <b>Guardar (Disco)</b>.</p>
                </div>
                <div className="flex items-center gap-4 bg-red-50 border border-red-100 p-4 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-black">3</div>
                  <p className="text-xs text-red-800 font-black italic">Implementar &rarr; Gestionar &rarr; Editar &rarr; <b>NUEVA VERSIÓN</b>.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-5 rounded-3xl font-black text-xl bg-slate-900 text-white hover:bg-black transition-all shadow-2xl"
            >
              LO TENGO, INSTALANDO V8...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;