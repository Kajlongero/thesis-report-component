export interface QuillEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  theme?: "snow" | "bubble";
  height?: string;
  className?: string;
}

export interface ToolbarConfig {
  container: (string | string[])[][];
}

export interface QuillModules extends Record<string, unknown> {
  toolbar?: {
    container: (string | string[] | Record<string, unknown>)[][] | boolean;
    handlers: Record<string, () => void>;
  };
  clipboard?: {
    matchVisual: boolean;
  };
}

export interface QuillFormats {
  [key: string]: string[];
}
