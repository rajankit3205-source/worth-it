export type ToolName =
  | "ChatGPT"
  | "Claude"
  | "Cursor"
  | "GitHub Copilot"
  | "Gemini"
  | "OpenAI API"
  | "Anthropic API"
  | "Windsurf";

export type UseCase =
  | "Coding"
  | "Writing"
  | "Research"
  | "Data Analysis"
  | "Mixed";

export interface ToolEntry {
  tool: ToolName;
  plan: string;
  spend: number;
  seats: number;
}

export interface AuditFormData {
  teamSize: number;
  useCase: UseCase;
  tools: ToolEntry[];
}