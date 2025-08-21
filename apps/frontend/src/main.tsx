import * as katex from "katex";
import { Quill } from "react-quill-new";

import { PlaceholderBlot } from "./config/Quill/Blots/PlaceholderBlot";
import { ImagePlaceholderBlot } from "./config/Quill/Blots/ImagePlaceholderBlot.ts";
import { TablePlaceholderBlot } from "./config/Quill/Blots/TablePlaceholderBlot.ts";

import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

window.katex = katex;

import "./index.css";

import "katex/dist/katex.min.css";

Quill.register(PlaceholderBlot);
Quill.register(ImagePlaceholderBlot);
Quill.register(TablePlaceholderBlot);

createRoot(document.getElementById("root")!).render(<App />);
