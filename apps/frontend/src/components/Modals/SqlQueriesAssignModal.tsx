import { Settings } from "lucide-react";
import { useContext, useEffect, useState, type RefObject } from "react";

import type ReactQuill from "react-quill-new";

import { PlaceholdersContext } from "../../context";

import { syncPlaceholdersWithEditor } from "../../utils/scan.delta";

import Modal from "../Commons/Modal";

import { Button } from "../Commons/Button";
import { PlaceholderSection } from "../Editor/Placeholders/PlaceholderSection";

interface QueryItem {
  id: number;
  query: string;
}

interface QueryEditorModalProps {
  open: boolean;
  quillRef: RefObject<ReactQuill>;
  onOpenChange: (open: boolean) => void;
}

const availableQueryIds: QueryItem[] = [
  {
    id: 1,
    query: 'SELECT * FROM users WHERE status = "active"',
  },
  {
    id: 2,
    query: "SELECT name as product_name, price FROM products",
  },
  {
    id: 3,
    query: "SELECT count(*) FROM orders WHERE date > NOW() - INTERVAL 30 DAY",
  },
  {
    id: 4,
    query: 'SELECT customer_name, email FROM customers WHERE city = "Madrid"',
  },
];

export default function QueryEditorModal({
  open,
  quillRef,
  onOpenChange,
}: QueryEditorModalProps) {
  const [queryId, setQueryId] = useState<number>(-1);

  const {
    placeholders,
    setPlaceholders: _,
    removePlaceholder,
    addQuery,
    removeQuery,
  } = useContext(PlaceholdersContext);

  const setSelectedQueryId = (id: number) => setQueryId(id);

  const addQueryIdToAlias = (aliasId: string) => {
    if (!queryId) return;

    const query = availableQueryIds.find((q) => q.id === queryId);
    if (!query) return;

    const placeholder = placeholders.find((p) => p.alias === aliasId);
    if (!placeholder) return;

    const queryItem: QueryItem = {
      id: query.id,
      query: query.query,
    };

    addQuery(placeholder, queryItem);
  };

  const removeQueryIdOnAlias = (aliasId: string, queryId: number) => {
    const placeholder = placeholders.find((p) => p.id === aliasId);
    if (!placeholder) return;

    const queryItem = placeholder.queryIds.find((q) => q.id === queryId);
    if (!queryItem) return;

    removeQuery(placeholder, queryItem);
  };

  const testQuery = (query: QueryItem) => console.log("Testing query:", query);

  const testConfiguration = () =>
    console.log("Testing configuration with all aliases:", placeholders);

  useEffect(() => {
    if (open && quillRef.current) {
      const timeoutId = setTimeout(() => {
        const notIn = syncPlaceholdersWithEditor(placeholders, quillRef);

        notIn?.forEach((elem) => removePlaceholder(elem));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [open, quillRef.current]);

  const footer = (
    <div className="flex justify-between gap-4">
      <Button variant="ghost" onClick={testConfiguration} className="gap-2">
        <Settings className="h-4 w-4" />
        Probar Configuración
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      size="lg"
      title="Query Selector"
      onOpenChange={onOpenChange}
      footer={footer}
    >
      <div className="max-h-96 overflow-y-auto space-y-6">
        {placeholders?.map((aliasGroup, aliasIndex) => {
          return (
            <PlaceholderSection
              key={aliasIndex}
              queryId={queryId}
              queryIds={availableQueryIds}
              aliasGroup={aliasGroup}
              onAddQuery={() => addQueryIdToAlias(aliasGroup.alias)}
              onTestQuery={testQuery}
              onSelectionChange={setSelectedQueryId}
              onRemoveQuery={(queryId: number) =>
                removeQueryIdOnAlias(aliasGroup.id as string, queryId)
              }
            />
          );
        })}
      </div>
    </Modal>
  );
}
