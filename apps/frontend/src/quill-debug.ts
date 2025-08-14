// debug-blots.ts
import { Quill } from "react-quill-new";

// Función para verificar el estado del registro de blots
export const debugBlotRegistration = () => {
  console.group("🔍 Debug Blot Registration");

  try {
    // Verificar si Quill está disponible
    console.log("✅ Quill disponible:", !!Quill);

    // Verificar importaciones base
    const BlockEmbed = Quill.import("blots/block/embed");
    console.log("✅ BlockEmbed disponible:", !!BlockEmbed);

    const Inline = Quill.import("blots/inline");
    console.log("✅ Inline disponible:", !!Inline);

    // Verificar el registro de nuestros blots
    const ImagePlaceholderBlot = Quill.import("blots/imagePlaceholder");
    console.log("🖼️ ImagePlaceholderBlot registrado:", !!ImagePlaceholderBlot);

    const PlaceholderBlot = Quill.import("blots/placeholder");
    console.log("🏷️ PlaceholderBlot registrado:", !!PlaceholderBlot);

    // Verificar Parchment
    const Parchment = Quill.import("parchment");
    console.log("📄 Parchment disponible:", !!Parchment);

    if (ImagePlaceholderBlot) {
      console.log("🖼️ ImagePlaceholderBlot details:", {
        blotName: ImagePlaceholderBlot.blotName,
        tagName: ImagePlaceholderBlot.tagName,
        className: ImagePlaceholderBlot.className,
        scope: ImagePlaceholderBlot.scope,
      });
    }
  } catch (error) {
    console.error("❌ Error en debug:", error);
  }

  console.groupEnd();
};

// Función para registrar blots con mejor manejo de errores
export const registerBlotsWithDebug = (
  blots: Array<{ name: string; blotClass: any }>
) => {
  console.group("📝 Registrando Blots");

  blots.forEach(({ name, blotClass }) => {
    try {
      // Verificar propiedades requeridas
      if (!blotClass.blotName) {
        throw new Error(`${name}: blotName es requerido`);
      }

      if (!blotClass.tagName) {
        throw new Error(`${name}: tagName es requerido`);
      }

      console.log(
        `🔧 Registrando ${name} con blotName: "${blotClass.blotName}"`
      );

      // MÉTODO 1: Registro directo con el blotName como key
      Quill.register(`blots/${blotClass.blotName}`, blotClass, true);

      // MÉTODO 2: También registrar con el objeto completo (fallback)
      try {
        Quill.register(blotClass, true);
      } catch (fallbackError) {
        console.warn(
          `⚠️ Fallback registration failed for ${name}:`,
          fallbackError
        );
      }

      // Verificar que se registró correctamente - con delay
      setTimeout(() => {
        try {
          const registered = Quill.import(`blots/${blotClass.blotName}`);
          if (registered) {
            console.log(`✅ ${name} registrado y verificado exitosamente`);
          } else {
            console.warn(
              `⚠️ ${name} no se pudo verificar después del registro`
            );
          }
        } catch (verifyError) {
          console.error(`❌ Error verificando ${name}:`, verifyError);
        }
      }, 100);
    } catch (error) {
      console.error(`❌ Error registrando ${name}:`, error);
    }
  });

  console.groupEnd();
};

// Función para limpiar y re-registrar blots
export const reRegisterBlots = (blotClasses: any[]) => {
  console.group("🔄 Re-registrando Blots");

  blotClasses.forEach((blotClass) => {
    try {
      // Intentar desregistrar si existe
      const existingBlot = Quill.import(`blots/${blotClass.blotName}`);
      if (existingBlot) {
        console.log(`🗑️ Blot existente encontrado: ${blotClass.blotName}`);
      }

      // Registrar (o re-registrar)
      Quill.register(blotClass, true);
      console.log(`✅ ${blotClass.blotName} (re)registrado`);
    } catch (error) {
      console.error(`❌ Error re-registrando ${blotClass.blotName}:`, error);
    }
  });

  console.groupEnd();
};

// Función para testear la creación de blots
export const testBlotCreation = (blotName: string, testData: any) => {
  console.group(`🧪 Testing ${blotName} Creation`);

  try {
    const BlotClass = Quill.import(`blots/${blotName}`);

    if (!BlotClass) {
      throw new Error(`Blot ${blotName} no está registrado`);
    }

    console.log("✅ Blot class encontrada:", BlotClass);

    // Intentar crear un nodo de prueba
    const testNode = BlotClass.create(testData);
    console.log("✅ Nodo de prueba creado:", testNode);

    // Verificar value/formats si existen
    if (BlotClass.value) {
      const value = BlotClass.value(testNode);
      console.log("📊 Value extraído:", value);
    }

    if (BlotClass.formats) {
      const formats = BlotClass.formats(testNode);
      console.log("🎨 Formats extraídos:", formats);
    }

    console.log("🎉 Test exitoso para", blotName);
  } catch (error) {
    console.error(`❌ Error en test de ${blotName}:`, error);
  }

  console.groupEnd();
};
