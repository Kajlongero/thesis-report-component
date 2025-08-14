import { Button } from "../../Commons/Button";
import { type DbQuery } from "./Manager";

interface QueryItemProps {
  item: DbQuery;
  onTest: (queryText: string) => void;
  onRemove: (queryId: string) => void;
}

export const QueryItem = ({ item, onTest, onRemove }: QueryItemProps) => {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm flex justify-between items-center transition-all duration-300">
      <pre className="text-sm text-gray-800 flex-1 overflow-x-auto">
        <code>{item.query}</code>
      </pre>
      <div className="ml-4 flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onTest(item.query)}>
          Probar
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onRemove(item.id)}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
