export const is_tauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export interface MathExpression {
    variable_name: string;
    value: number;
    unit: UnitDimension;
}

export interface MarkdownEditorProps {
    file_path: string;
    on_save?: (content: string) => void;
    initial_content?: string;
}

export interface MarkdownEditorRef {
    search_formulas: (expressions: MathExpression[]) => void;
    clear_search: () => void;
    get_content: () => string;
    set_content: (content: string) => void;
}

export type UnitDimension = [number, number, number, number, number, number, number];

export function array_empty(unit: number[]): boolean {
    if (unit.length == 0) return true;
    for (const u of unit) {
        if (u != 0) return false;
    }
    return true;
}