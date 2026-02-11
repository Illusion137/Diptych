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
    const baseUnits = ["m", "s", "g", "A", "K", "mol", "cd"];

    // Derived units
    const derivedUnits = [
        "Hz", "N", "Pa", "J", "W", "C", "V", "F", "Ω", "Wb", "T", "H", "S"
    ];

    // SI prefixes - both regular and LaTeX versions
    const prefixes = [
        "Y", "Z", "E", "P", "T", "G", "M", "k", "h", "da",
        "d", "c", "m", "\\mu", "μ", "n", "p", "f", "a", "z", "y"
    ];

    // Build all possible unit combinations (prefix + unit)
    const allUnits = new Set<string>();

    // Add base units without prefixes
    baseUnits.forEach(unit => allUnits.add(unit));

    // Add base units with prefixes
    baseUnits.forEach(unit => {
        // Skip kg with additional prefixes, but allow 'g' with all prefixes
        if (unit !== "kg") {
            prefixes.forEach(prefix => {
                allUnits.add(prefix + unit);
            });
        }
    });

    // Add derived units
    derivedUnits.forEach(unit => allUnits.add(unit));

    // Add derived units with prefixes
    derivedUnits.forEach(unit => {
        prefixes.forEach(prefix => {
            allUnits.add(prefix + unit);
        });
    });

    // Sort by length (descending) to match longer units first
    const sortedUnits = Array.from(allUnits).sort((a, b) => b.length - a.length);

    // Create regex pattern that matches units not already preceded by backslash
    // The negative lookbehind checks for backslash not followed by 'mu'
    // or a regular backslash
    const pattern = new RegExp(
        `(?<!\\\\)(?<!\\\\mu )(${sortedUnits.map(u => u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
        'g'
    );

    // Replace matched units with backslash + unit
    return latex.replace(pattern, '\\$1');
}

export type UnitVec = [number, number, number, number, number, number, number];
// [ L, T, M, I, Θ, N, J ]

export function unit_to_latex(unit: number[]): string {
    if (unit.length !== 7) {
        throw new Error("Unit array must be exactly 7 elements long");
    }

    // Base units
    const baseUnits = ["m", "s", "kg", "A", "K", "mol", "cd"];

    // Derived units with their "complexity score"
    const derivedUnits: { symbol: string; dimensions: number[]; complexity: number }[] = [
        { symbol: "Hz", dimensions: [0, -1, 0, 0, 0, 0, 0], complexity: 1 },
        { symbol: "N", dimensions: [1, -2, 1, 0, 0, 0, 0], complexity: 3 },
        { symbol: "Pa", dimensions: [-1, -2, 1, 0, 0, 0, 0], complexity: 3 },
        { symbol: "J", dimensions: [2, -2, 1, 0, 0, 0, 0], complexity: 3 },
        { symbol: "W", dimensions: [2, -3, 1, 0, 0, 0, 0], complexity: 4 },
        { symbol: "C", dimensions: [0, 1, 0, 1, 0, 0, 0], complexity: 2 },
        { symbol: "V", dimensions: [2, -3, 1, -1, 0, 0, 0], complexity: 4 },
        { symbol: "F", dimensions: [-2, 4, -1, 2, 0, 0, 0], complexity: 4 },
        { symbol: "Ω", dimensions: [2, -3, 1, -2, 0, 0, 0], complexity: 5 },
        { symbol: "S", dimensions: [-2, 3, -1, 2, 0, 0, 0], complexity: 5 },
        { symbol: "Wb", dimensions: [2, -2, 1, -1, 0, 0, 0], complexity: 4 },
        { symbol: "T", dimensions: [0, -2, 1, -1, 0, 0, 0], complexity: 3 },
        { symbol: "H", dimensions: [2, -2, 1, -2, 0, 0, 0], complexity: 5 },
        { symbol: "F", dimensions: [-2, 4, -1, 2, 0, 0, 0], complexity: 5 },
        { symbol: "V", dimensions: [2, -3, 1, -1, 0, 0, 0], complexity: 5 }
    ];

    // Check if it matches a derived unit exactly
    for (const derived of derivedUnits) {
        if (derived.dimensions.every((val, idx) => val === unit[idx])) {
            return `\\mathrm{${derived.symbol}}`;
        }
    }

    // Function to calculate complexity of a representation
    function calculateComplexity(numUnits: string[], denUnits: string[]): number {
        const totalUnits = numUnits.length + denUnits.length;
        const hasFraction = denUnits.length > 0 ? 1 : 0;
        return totalUnits + hasFraction * 0.5; // Slight penalty for fractions
    }

    // Function to build unit string from base units
    function buildFromBase(dims: number[]): { num: string[]; den: string[]; complexity: number } {
        const numerator: string[] = [];
        const denominator: string[] = [];

        for (let i = 0; i < dims.length; i++) {
            const exponent = dims[i];
            if (exponent === 0) continue;

            const unitSymbol = baseUnits[i];

            if (exponent > 0) {
                if (exponent === 1) {
                    numerator.push(`\\mathrm{${unitSymbol}}`);
                } else {
                    numerator.push(`\\mathrm{${unitSymbol}}^{${exponent}}`);
                }
            } else {
                const absExponent = Math.abs(exponent);
                if (absExponent === 1) {
                    denominator.push(`\\mathrm{${unitSymbol}}`);
                } else {
                    denominator.push(`\\mathrm{${unitSymbol}}^{${absExponent}}`);
                }
            }
        }

        return {
            num: numerator,
            den: denominator,
            complexity: calculateComplexity(numerator, denominator)
        };
    }

    // Try base units first
    const baseRepresentation = buildFromBase(unit);
    let bestRepresentation = baseRepresentation;
    let bestComplexity = baseRepresentation.complexity;

    // Try combinations with one derived unit in numerator
    for (const derived of derivedUnits) {
        const remaining = unit.map((val, idx) => val - derived.dimensions[idx]);

        // Only consider if this simplifies things
        const remainingRep = buildFromBase(remaining);
        const totalNumerator = [`\\mathrm{${derived.symbol}}`, ...remainingRep.num];
        const complexity = calculateComplexity(totalNumerator, remainingRep.den);

        if (complexity < bestComplexity) {
            bestComplexity = complexity;
            bestRepresentation = { num: totalNumerator, den: remainingRep.den, complexity };
        }
    }

    // Try combinations with one derived unit in denominator
    for (const derived of derivedUnits) {
        const remaining = unit.map((val, idx) => val + derived.dimensions[idx]);

        const remainingRep = buildFromBase(remaining);
        const totalDenominator = [`\\mathrm{${derived.symbol}}`, ...remainingRep.den];
        const complexity = calculateComplexity(remainingRep.num, totalDenominator);

        if (complexity < bestComplexity) {
            bestComplexity = complexity;
            bestRepresentation = { num: remainingRep.num, den: totalDenominator, complexity };
        }
    }

    // Try ratio of two derived units (only if it significantly simplifies)
    for (const numDerived of derivedUnits) {
        for (const denDerived of derivedUnits) {
            const matches = unit.every((val, idx) => val === numDerived.dimensions[idx] - denDerived.dimensions[idx]);
            if (matches) {
                const complexity = calculateComplexity([`\\mathrm{${numDerived.symbol}}`], [`\\mathrm{${denDerived.symbol}}`]);
                if (complexity < bestComplexity) {
                    bestComplexity = complexity;
                    bestRepresentation = {
                        num: [`\\mathrm{${numDerived.symbol}}`],
                        den: [`\\mathrm{${denDerived.symbol}}`],
                        complexity
                    };
                }
            }
        }
    }

    // Handle dimensionless case
    if (bestRepresentation.num.length === 0 && bestRepresentation.den.length === 0) {
        return "1";
    }

    // Build final LaTeX string
    if (bestRepresentation.den.length === 0) {
        return bestRepresentation.num.join(" \\cdot ");
    } else if (bestRepresentation.num.length === 0) {
        return `\\frac{1}{${bestRepresentation.den.join(" \\cdot ")}}`;
    } else {
        return `\\frac{${bestRepresentation.num.join(" \\cdot ")}}{${bestRepresentation.den.join(" \\cdot ")}}`;
    }
}

export function number_to_maybe_scientific_notation(value: number) {
    // Examples
    // 0.00000005 -> 0.00000005
    // 50 -> 50
    // 500000000 -> 500000000 
    // 5000000000 -> 5\times10^{9} 
    // 5000000000 -> 5\times10^{9}
    // 5060600000 -> 5.0606\times10^{9}
    // 0.005 -> 0.005
    // 0.0005 -> 5\times10^{-4}

    const absValue = Math.abs(value);

    // Use scientific notation for very large numbers (>= 5 billion)
    // or very small numbers (< 0.0005 and > 0)
    if ((absValue >= 5e9) || (absValue < 5e-4 && absValue > 0)) {
        const exponent = Math.floor(Math.log10(absValue));
        const coefficient = value / Math.pow(10, exponent);

        // Round to avoid floating point precision issues
        // Use ~15 significant digits (JavaScript's precision limit)
        const roundedCoefficient = parseFloat(coefficient.toPrecision(15));

        // Remove trailing zeros from coefficient
        const coeffStr = roundedCoefficient.toString().replace(/\.?0+$/, '');

        return `${coeffStr}\\times10^{${exponent}}`;
    }

    return value.toString();
}