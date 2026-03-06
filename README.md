# Everett

Everett is a Math Expression List Evaluator. Inspired by taking my Physics II course at NAU.\
This application was built with React, TypeScript, TailwindCSS, Tauri and WASM.
In terms of Web Assembly, this application uses another library I built called [Nero](https://github.com/Illusion137/Nero), a C++ LaTex parser, evaluator and formula finder.

## Installation

### Run Development Server (Web)

```bash
yarn dev
```

### Run Development Server (Tauri)

```bash
yarn tauri dev
```

### Build as Application (Tauri)

```bash
yarn tauri build
```

## Usage

Each Math Expression Box is divided into 2 sections.\
$\bigg| \mathrm{Math Expression} \bigg| \mathrm{Unit Expression} \bigg|$

### Combined Expressions

The math and unit expressions are then combined before evaluation.

#### Combined Expression Examples

##### Ex 1: Implicit _1_ Unit

$\bigg| x = 25.0 \bigg| \space \bigg|$

$\rightarrow x = ( 25.0 ) \cdot 1 = 25.0$

`If a unit is not provided, then the expression will just parse without it and treat the unit as if multiplying by 1.`

##### Ex 2: _numeric_ Unit

$\bigg| \frac{2}{9} + 1 \bigg| 9 \bigg|$

$\rightarrow (\frac{2}{9} + 1) \cdot 9 = 11$

`The Units Section can take in any mathematical expression.`

##### Ex 3: _derived_ Unit

$\bigg| 5^2 + 2 \bigg| \mathrm{\mu V} \bigg|$

$\rightarrow (5^2 + 2) \cdot \mathrm{\mu V} = 2.7 \cdot 10^{-5}\mathrm{V}$

`Besides working with the 7 base SI units [m, s, kg, A, K, mol, cd], Everett also supports the derived SI units.`

##### Ex 4: _unit expression_ Unit

$\bigg| \ln(e \sin(\frac{\pi}{2})) \bigg| \mathrm{kg\frac{m}{s^2}} \bigg|$

$\rightarrow (\ln(e \sin(\frac{\pi}{2}))) \cdot \mathrm{kg\frac{m}{s^2}} = 1\mathrm{N}$

`Note the support for functions, moreover complex units get simplified to what they really mean.`

##### Ex 5: _bad math_ Expression

$\bigg| 5\mathrm{mm} \bigg| 1 \bigg|$

$\rightarrow \mathrm{error}$: Undefined variable 'm'

`Note that units ONLY work in the Unit Section, this is because the Units Section, tokenizes units and the Math Section does not.`

## Support

### Special Operators

$?=\mathrm{Unit}$ `Formula query; finds all formulas to obtain a target from units in the expression list`\
$\mathrm{Var}:=$ `Solve-for; solves the expression for the given variable`\
$@=\mathrm{Var}_1,\mathrm{Var}_2,\ldots$ `Solve system; solves a system of equations for the listed variables`\
$\pm$ `Plus-minus; evaluates an expression as both its positive and negative form`

### Constants

$\mathrm{e} = 2.718281828459 \cdot \mathrm{1}$\
$\mathrm{e_c} = 1.602 \cdot 10^{-19} \cdot \mathrm{C}$\
$\mathrm{e_0} = 8.854187817 \cdot 10^{-12} \cdot \mathrm{\frac{F}{m}}$\
$\mathrm{k_e} = 8.99 \cdot 10^9 \cdot \mathrm{\frac{Nm^2}{C^2}}$\
$\mathrm{c} = 2.99792458 \cdot 10^8 \cdot \mathrm{\frac{m}{s}}$\
$\mathrm{m_e} = 9.1938 \cdot 10^{-31} \cdot \mathrm{kg}$\
$\mathrm{m_p} = 1.67262 \cdot 10^{-27} \cdot \mathrm{kg}$\
$\mathrm{m_n} = 1.674927 \cdot 10^{-27} \cdot \mathrm{kg}$\
$\mathrm{R_g} = 8.31446 \cdot \mathrm{JK^{-1}mol^{-1}}$\
$\mathrm{C_K} = 273.15 \cdot \mathrm{K}$\
$\mathrm{h} = 6.620607015 \cdot 10^{-34} \cdot \mathrm{Js}$\
$\mathrm{a_0} = 5.291772 \cdot 10^{-11} \cdot \mathrm{m}$\
$\mathrm{N_A} = 6.022 \cdot 10^{23} \cdot \mathrm{mol^{-1}}$

### Functions

`sqrt ceil fact floor round sin cos tan sec csc cot arcsin arccos arctan arcsec arccsc arccot abs nCr nPr log ln sum int min max gcd lcm sig det prod conj val unit Re Im trace FahrC FahrK CelK CelF rad deg`

## Footnotes

The name of both this application, _Everett_, as well as the backing library, _Nero_, are based off of Secrets of the Silent Witch. _Everett_, because Monic Everett is known for her mathematical genius and memorization of formulas, and _Nero_ just because he is her familar.
