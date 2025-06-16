# 🚀 GPT Proxy para Vercel

## ✅ Qué hace
- Recibe `{ pregunta, respuesta }` desde tu Custom GPT.
- Reenvía a tu Apps Script de Google Sheets.
- Devuelve `{ "status": "ok" }`.

## 📌 Cómo usarlo en Vercel

1️⃣ Crea un nuevo proyecto en Vercel.  
2️⃣ Sube esta carpeta con `api/guardarConversacion.js` dentro de `/api`.  
3️⃣ Asegúrate de agregar `"node-fetch"` como dependencia en `package.json`.  
4️⃣ Haz deploy y obtén tu URL: `https://TU-PROXY.vercel.app/api/guardarConversacion`  
5️⃣ Actualiza `openapi.yaml` con tu URL.  
6️⃣ Sube el `openapi.yaml` a tu Custom GPT.

## ⚡ Prueba rápida
```bash
curl -X POST "https://TU-PROXY.vercel.app/api/guardarConversacion" \
  -H "Content-Type: application/json" \
  -d '{"pregunta":"Prueba Vercel","respuesta":"OK"}'
```

Debe responder `{ "status": "ok" }`.
