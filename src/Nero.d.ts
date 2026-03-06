// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
export interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  // @ts-ignore - If targeting lower than ESNext, this symbol might not exist.
  [Symbol.dispose](): void;
  clone(): this;
}
export type FormulaVariable = {
  name: EmbindString,
  units: EmbindString,
  description: EmbindString,
  is_constant: boolean
};

export interface VectorInt extends ClassHandle, Iterable<number> {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
}

export interface VectorDouble extends ClassHandle, Iterable<number> {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
}

export type Result = {
  value: number,
  imag: number,
  unit: VectorInt,
  success: boolean,
  error: EmbindString,
  unit_latex: EmbindString,
  value_scientific: EmbindString,
  extra_values: VectorDouble,
  sig_figs: number
};

export interface VectorString extends ClassHandle, Iterable<string> {
  push_back(_0: EmbindString): void;
  resize(_0: number, _1: EmbindString): void;
  size(): number;
  get(_0: number): string | undefined;
  set(_0: number, _1: EmbindString): boolean;
}

export interface VectorResult extends ClassHandle, Iterable<Result> {
  push_back(_0: Result): void;
  resize(_0: number, _1: Result): void;
  size(): number;
  get(_0: number): Result | undefined;
  set(_0: number, _1: Result): boolean;
}

export interface VectorFormula extends ClassHandle, Iterable<Formula> {
  size(): number;
  get(_0: number): Formula | undefined;
  push_back(_0: Formula): void;
  resize(_0: number, _1: Formula): void;
  set(_0: number, _1: Formula): boolean;
}

export interface VectorFormulaVariable extends ClassHandle, Iterable<FormulaVariable> {
  push_back(_0: FormulaVariable): void;
  resize(_0: number, _1: FormulaVariable): void;
  size(): number;
  get(_0: number): FormulaVariable | undefined;
  set(_0: number, _1: FormulaVariable): boolean;
}

export type Formula = {
  name: EmbindString,
  latex: EmbindString,
  category: EmbindString,
  variables: VectorFormulaVariable
};

interface EmbindModule {
  VectorInt: {
    new(): VectorInt;
  };
  VectorDouble: {
    new(): VectorDouble;
  };
  VectorString: {
    new(): VectorString;
  };
  VectorResult: {
    new(): VectorResult;
  };
  VectorFormula: {
    new(): VectorFormula;
  };
  VectorFormulaVariable: {
    new(): VectorFormulaVariable;
  };
  dv_init(): boolean;
  dv_destroy(): void;
  dv_is_initialized(): boolean;
  dv_set_constant(_0: EmbindString, _1: EmbindString, _2: EmbindString): boolean;
  dv_remove_constant(_0: EmbindString): boolean;
  dv_clear_constants(): void;
  dv_get_constant_count(): number;
  dv_eval(_0: EmbindString, _1: EmbindString): Result;
  dv_eval_batch(_0: VectorString, _1: VectorString, _2: VectorString): VectorResult;
  dv_get_available_formulas(_0: VectorInt): VectorFormula;
  dv_get_available_formulas_filtered(_0: VectorInt): VectorFormula;
  dv_get_last_formula_results(): VectorFormula;
  dv_get_variable(_0: EmbindString): any;
  dv_clear_variables(): void;
  dv_get_variable_count(): number;
  dv_unit_latex_to_unit(_0: EmbindString): VectorInt;
  dv_unit_to_latex(_0: VectorInt): string;
  dv_value_to_scientific(_0: number, _1: number): string;
  dv_version(): string;
}

export type MainModule = WasmModule & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
