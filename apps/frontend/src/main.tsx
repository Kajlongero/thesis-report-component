import { Quill } from "react-quill-new";
import * as katex from "katex";

import PlaceholderBlot from "./config/Quill/placeholderBlot.ts";
import ImagePlaceholderBlot from "./config/Quill/imagePlaceholderBlot.ts";

Quill.register(PlaceholderBlot);
Quill.register(ImagePlaceholderBlot);

import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

window.katex = katex;

import "./index.css";

import "katex/dist/katex.min.css";

createRoot(document.getElementById("root")!).render(<App />);
