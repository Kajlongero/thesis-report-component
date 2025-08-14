import { useState } from "react";
import ReactQuill from "react-quill-new";

import { Card } from "../../Commons/Card";
import { Button } from "../../Commons/Button";
import { QueryItem } from "./Item";

// --- Tipos y Lógica de Datos ---

// Tipo para las queries disponibles y las seleccionadas
export interface DbQuery {
  id: string;
  query: string;
}

// Props que el componente espera recibir (la referencia a Quill)
interface QueryManagerProps {
  quillRef: React.RefObject<ReactQuill | null>;
}

// Lista de todas las queries que el usuario puede elegir
const allAvailableQueries: DbQuery[] = [
  { id: "q1", query: "SELECT * FROM ventas WHERE anio = 2024;" },
  {
    id: "q2",
    query: "SELECT nombre, email FROM usuarios WHERE activo = true;",
  },
  {
    id: "q3",
    query: "SELECT producto, SUM(cantidad) FROM inventario GROUP BY producto;",
  },
  { id: "q4", query: "SELECT * FROM logs ORDER BY fecha DESC LIMIT 10;" },
];

// Simulación de una llamada a la base de datos
const mockFetchQueryData = async (query: string): Promise<object[]> => {
  console.log(`Ejecutando query simulada: ${query}`);
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simula latencia

  if (query.toLowerCase().includes("ventas")) {
    return [
      { producto: "Laptop Pro", cantidad: 5, total: 5000 },
      { producto: "Teclado RGB", cantidad: 10, total: 800 },
    ];
  }
  if (query.toLowerCase().includes("usuarios")) {
    return [
      { id: 1, nombre: "Ana", pais: "España" },
      { id: 2, nombre: "Luis", pais: "México" },
    ];
  }
  return [];
};

// Formatea los datos de la "base de datos" a una tabla HTML
const formatDataAsHtmlTable = (data: object[]): string => {
  if (data.length === 0)
    return "<p><i>La prueba no arrojó resultados.</i></p><br>";

  const headers = Object.keys(data[0]);
  const headerRow = `<tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>`;
  const bodyRows = data
    .map(
      (row) =>
        `<tr>${headers.map((h) => `<td>${(row as any)[h]}</td>`).join("")}</tr>`
    )
    .join("");

  return `<br><p><strong>Resultado de la prueba:</strong></p>
          <table class="ql-table-class">
            <thead>${headerRow}</thead>
            <tbody>${bodyRows}</tbody>
          </table>
          <br>`;
};

// --- Componente Principal ---

export const QueryManager = ({ quillRef }: QueryManagerProps) => {
  // Estado para las queries que el usuario ha añadido al reporte
  const [reportQueries, setReportQueries] = useState<DbQuery[]>([]);
  // Estado para controlar si mostramos el botón "Añadir" o el selector
  const [isAdding, setIsAdding] = useState(false);

  /**
   * Se activa cuando el usuario elige una query del selector.
   * La añade a la lista del reporte.
   */
  const handleAddQuery = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryId = event.target.value;
    if (!queryId) return;

    const queryToAdd = allAvailableQueries.find((q) => q.id === queryId);
    const isAlreadyAdded = reportQueries.some((rq) => rq.id === queryId);

    if (queryToAdd && !isAlreadyAdded) {
      setReportQueries((prev) => [...prev, queryToAdd]);
    }

    setIsAdding(false); // Ocultamos el selector después de la selección
  };

  /**
   * Elimina una query de la lista del reporte.
   */
  const handleRemoveQuery = (queryIdToRemove: string) => {
    setReportQueries((prev) => prev.filter((q) => q.id !== queryIdToRemove));
  };

  /**
   * Ejecuta la simulación de la query y pega el resultado en el editor.
   */
  const handleTestQuery = async (queryToTest: string) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const Quill = editor.constructor as any;
    const Delta = Quill.import("delta");

    try {
      const data = await mockFetchQueryData(queryToTest);
      const htmlResult = formatDataAsHtmlTable(data);
      const delta = editor.clipboard.convert(htmlResult);
      const currentLength = editor.getLength();

      editor.updateContents(
        new Delta()
          .retain(currentLength > 0 ? currentLength - 1 : 0)
          .concat(delta),
        "user"
      );
      editor.setSelection(editor.getLength(), 0);
    } catch (error) {
      console.error("Error probando la query:", error);
    }
  };

  // Filtramos las queries que ya han sido añadidas para no mostrarlas en el selector
  const queriesForSelector = allAvailableQueries.filter(
    (aq) => !reportQueries.some((rq) => rq.id === aq.id)
  );

  return (
    <div className="max-w-4xl mx-auto mt-6 mb-6">
      <Card>
        <div className="space-y-4">
          <div className="space-y-3">
            {reportQueries.length > 0 ? (
              reportQueries.map((query) => (
                <QueryItem
                  key={query.id}
                  item={query}
                  onTest={handleTestQuery}
                  onRemove={handleRemoveQuery}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Aún no has añadido ninguna query al reporte.
              </p>
            )}
          </div>

          {/* Botón para añadir o el selector */}
          <div className="pt-4 border-t border-gray-200">
            {isAdding ? (
              <select
                onChange={handleAddQuery}
                defaultValue=""
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  -- Selecciona una query para añadir --
                </option>
                {queriesForSelector.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.query}
                  </option>
                ))}
              </select>
            ) : (
              <Button
                onClick={() => setIsAdding(true)}
                disabled={queriesForSelector.length === 0}
              >
                {queriesForSelector.length > 0
                  ? "Añadir Query al Reporte"
                  : "Todas las queries han sido añadidas"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
