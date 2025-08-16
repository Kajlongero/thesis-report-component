import * as katex from "katex";

import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

window.katex = katex;

import "./index.css";

import "katex/dist/katex.min.css";

createRoot(document.getElementById("root")!).render(<App />);
