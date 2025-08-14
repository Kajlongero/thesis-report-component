// main.tsx - Versión robusta
import { Quill } from "react-quill-new";
import * as katex from "katex";

// Configurar katex
window.katex = katex;

// Obtener las clases base de Quill

console.log("🚀 Registrando blots...");

// Registro con manejo de errores
try {
  console.log("📝 Registrando ImagePlaceholderBlot...");
  Quill.register(ImagePlaceholderBlot);
  console.log("✅ ImagePlaceholderBlot registrado");

  console.log("📝 Registrando PlaceholderBlot...");
  Quill.register(PlaceholderBlot);
  console.log("✅ PlaceholderBlot registrado");
} catch (registrationError) {
  console.error("❌ Error crítico en registro:", registrationError);
}

// Verificación con delay
setTimeout(() => {
  console.log("🔍 Verificando registros...");

  try {
    const imageBlot = Quill.import("blots/imagePlaceholder");
    const placeholderBlot = Quill.import("blots/placeholder");

    console.log("🖼️ ImagePlaceholderBlot disponible:", !!imageBlot);
    console.log("🏷️ PlaceholderBlot disponible:", !!placeholderBlot);

    // Test de creación con diferentes tipos de datos
    if (imageBlot) {
      try {
        console.log("🧪 Probando creación con datos válidos...");
        const testNode1 = imageBlot.create({
          name: "Test",
          width: 200,
          height: 150,
        });
        console.log("✅ Test 1 exitoso:", !!testNode1);

        console.log("🧪 Probando creación con datos edge case...");
        const testNode2 = imageBlot.create({
          name: "Test-Image_123",
          width: "300",
          height: "200",
        });
        console.log("✅ Test 2 exitoso:", !!testNode2);

        console.log("🧪 Probando value()...");
        const extractedValue = imageBlot.value(testNode1);
        console.log("✅ Value extraction exitoso:", extractedValue);
      } catch (testError) {
        console.error("❌ Error en tests de creación:", testError);
      }
    }
  } catch (verificationError) {
    console.error("❌ Error en verificación:", verificationError);
  }
}, 300);

// Importar React y renderizar
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

import "./index.css";
import "katex/dist/katex.min.css";
import { ImagePlaceholderBlot } from "./config/Quill/imagePlaceholderBlot.ts";
import { PlaceholderBlot } from "./config/Quill/placeholderBlot.ts";

console.log("🎨 Renderizando aplicación...");
createRoot(document.getElementById("root")!).render(<App />);
