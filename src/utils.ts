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
// const baseUnits = ["m", "s", "kg", "A", "K", "mol", "cd"];
export function latex_unit_splitter(latex: string): string {
    // Base SI units (including 'g' for grams)
    const base_units = ["m", "s", "g", "A", "K", "mol", "cd"];

    // Derived units
    const derived_units = [
        "Hz", "N", "Pa", "J", "W", "C", "V", "F", "Ohm", "\\Omega", "Wb", "T", "H", "S", "L", "eV"
    ];

    // SI prefixes - both regular and LaTeX versions
    const prefixes = [
        "Y", "Z", "E", "P", "T", "G", "M", "k", "h", "da",
        "d", "c", "m", "\\mu", "μ", "n", "p", "f", "a", "z", "y"
    ];

    // Build all possible unit combinations (prefix + unit)
    const all_units = new Set<string>();

    // Add base units without prefixes
    base_units.forEach(unit => all_units.add(unit));

    // Add base units with prefixes
    base_units.forEach(unit => {
        // Skip kg with additional prefixes, but allow 'g' with all prefixes
        if (unit !== "kg") {
            prefixes.forEach(prefix => {
                all_units.add(prefix + unit);
            });
        }
    });

    // Add derived units
    derived_units.forEach(unit => all_units.add(unit));

    // Add derived units with prefixes
    derived_units.forEach(unit => {
        prefixes.forEach(prefix => {
            all_units.add(prefix + unit);
        });
    });

    all_units.add("nmi");
    all_units.add("AU");
    all_units.add("ly");
    all_units.add("pc");
    all_units.add("cal");
    all_units.add("kcal");
    all_units.add("PSI");
    all_units.add("in");
    all_units.add("ft");
    all_units.add("yd");
    all_units.add("mi");
    all_units.add("oz");
    all_units.add("lb");
    all_units.add("min");
    all_units.add("hour");
    all_units.add("day");
    all_units.add("month");
    all_units.add("year");
    all_units.add("ATM");
    all_units.add("pH");

    const sorted_units = Array.from(all_units).sort((a, b) => b.length - a.length);

    const pattern = new RegExp(
        `(?<!\\\\)(?<!\\\\mu )(${sorted_units.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
        'g'
    );

    return latex.replace(pattern, '\\$1');
}