# Physics 262: Physics II with Calculus - Comprehensive Notes

## Table of Contents

1. [Electric Charge](#electric-charge)
2. [Conductors and Insulators](#conductors-and-insulators)
3. [Charging Methods](#charging-methods)
4. [Coulomb's Law](#coulombs-law)
5. [Electric Fields](#electric-fields)
6. [Gauss's Law](#gausss-law)
7. [Electric Potential Energy](#electric-potential-energy)
8. [Electric Potential](#electric-potential)
9. [Capacitors](#capacitors)
10. [Dielectrics](#dielectrics)

---

## Electric Charge

### Fundamental Properties

**Key Principle**: Opposites attract; like charges repel.

Electric charge is **quantized**, meaning it comes in discrete packets. The elementary charge is:

$e = 1.602 \times 10^{-19} \text{ C}$

**Variables:**

-   $e$ = elementary charge (charge of a single proton or magnitude of electron charge)

-   Unit: Coulomb (C)

**Note**: Quarks carry fractional charges ($\pm \frac{1}{3}e$ or $\pm \frac{2}{3}e$), but isolated quarks are never observed in nature.

### Mass and Charge Relationship

**Important Concept**: When objects exchange charge through contact (e.g., rubbing), they also exchange mass because electrons have mass.

$m_{\text{electron}} = 9.109 \times 10^{-31} \text{ kg}$

**Example**: When a plastic rod is rubbed with fur:

-   Rod becomes negatively charged → gains electrons → **gains mass**

-   Fur becomes positively charged → loses electrons → **loses mass**

**When to use**: Understanding that charge transfer involves actual particle transfer, not just abstract charge movement.

---

## Conductors and Insulators

### Definitions

**Conductor**: Material that allows electric charge (current) to flow easily.

-   Free electrons can move throughout the material

-   Examples: metals (copper, aluminum, gold)

**Insulator**: Material that does NOT allow charge to flow easily.

-   Electrons are tightly bound to atoms

-   Examples: rubber, glass, plastic

**Semiconductor**: Intermediate conductivity between conductors and insulators.

-   Conductivity can be controlled

-   Examples: silicon, germanium

**Superconductor**: Material with zero electrical resistance below a critical temperature.

-   Charge flows with absolutely no energy loss

-   Examples: certain ceramics at very low temperatures

---

## Charging Methods

### 1. Charging by Friction

Direct contact between two materials causes electron transfer.

### 2. Charging by Conduction

A charged object touches a neutral object, sharing charge directly.

### 3. Charging by Induction

**Process**:

1. Bring charged rod near (but not touching) a neutral conductor
2. Charge separation occurs: opposite charge attracted, like charge repelled
3. Ground one side to remove like charge
4. Remove ground connection first, then remove rod
5. Object is now charged opposite to the rod

**Key**: The object never touches the rod but still becomes charged.

### Polarization

**Definition**: Redistribution of charge within an object due to an external electric field.

**For conductors**: Free electrons move to create charge separation.

**For insulators**: Molecules stretch/rotate to align dipoles, but charge doesn't flow.

**Application**: Electrostatic painting

-   Paint particles are negatively charged

-   Car body is positively charged

-   Paint attracted to car, creating even coating

**Why neutral paper is attracted to charged plastic**: The electric force decreases with distance. The near side of the paper (opposite charge induced) experiences a stronger force than the far side (same charge induced), resulting in net attraction.

---

## Coulomb's Law

### The Force Between Point Charges

The magnitude of the electric force between two stationary point charges is:

$F = k\frac{|q_1 q_2|}{r^2} = \frac{1}{4\pi\varepsilon_0}\frac{|q_1 q_2|}{r^2}$

**Variables:**

-   $F$ = magnitude of electric force (N)

-   $q_1, q_2$ = charges of the two particles (C)

-   $r$ = distance between the charges (m)

-   $k$ = Coulomb's constant = $8.99 \times 10^9 \, \text{N·m}^2/\text{C}^2$

-   $\varepsilon_0$ = permittivity of free space = $8.854 \times 10^{-12} \, \text{C}^2/(\text{N·m}^2)$

**When to use**:

-   Finding the force between two point charges (or spherical charge distributions)

-   Charges must be at rest (electrostatics)

-   Valid for charges in a vacuum or air

**Vector Form**:

$\vec{F}_{12} = k\frac{q_1 q_2}{r^2}\hat{r}_{12}$

Where $\hat{r}_{12}$ is the unit vector pointing from $q_1$ to $q_2$.

**Direction**:

-   Same sign charges → repulsive (force points away)

-   Opposite sign charges → attractive (force points toward)

### Superposition Principle

For multiple charges, the total force on one charge is the vector sum of forces from all other charges:

$\vec{F}_{\text{total}} = \vec{F}_1 + \vec{F}_2 + \vec{F}_3 + \cdots = \sum_i \vec{F}_i$

**When to use**: Systems with 3 or more charges.

---

## Electric Fields

### Definition and Concept

**Electric Field**: A vector field representing the force per unit charge at any point in space.

$\vec{E} = \frac{\vec{F}}{q_0}$

**Variables:**

-   $\vec{E}$ = electric field vector (N/C or V/m)

-   $\vec{F}$ = force on test charge (N)

-   $q_0$ = small positive test charge (C)

**When to use**:

-   Describing the influence of charges on space

-   Finding the force a charge would experience: $\vec{F} = q\vec{E}$

**Key Concept**: Electric fields exist throughout all space, whether or not a test charge is present.

### Electric Field from a Point Charge

$\vec{E} = k\frac{q}{r^2}\hat{r}$

**Variables:**

-   $q$ = source charge creating the field (C)

-   $r$ = distance from source charge to field point (m)

-   $\hat{r}$ = unit vector pointing radially outward from source

**Direction**:

-   Positive source charge: field points radially **outward**

-   Negative source charge: field points radially **inward** (toward the charge)

**When to use**: Finding the field at any point due to a single point charge.

### Superposition for Electric Fields

For multiple point charges:

$\vec{E}_{\text{total}} = \sum_i \vec{E}_i = \sum_i k\frac{q_i}{r_i^2}\hat{r}_i$

**When to use**: Systems with multiple point charges.

### Electric Dipole

**Definition**: Two charges of equal magnitude but opposite sign separated by distance $d$.

$\vec{p} = q\vec{d}$

**Variables:**

-   $\vec{p}$ = electric dipole moment (C·m)

-   $q$ = magnitude of each charge (C)

-   $\vec{d}$ = vector from negative to positive charge (m)

**Electric field on the dipole axis** (far field, $r \gg d$):

$E = \frac{1}{4\pi\varepsilon_0}\frac{2p}{r^3}$

**Electric field on the perpendicular bisector** (far field):

$E = \frac{1}{4\pi\varepsilon_0}\frac{p}{r^3}$

**When to use**: Molecules, antenna analysis, far-field approximations.

### Force and Torque on a Dipole

**Force on dipole in uniform field**:

$\vec{F}_{\text{net}} = 0$

(Equal and opposite forces on each charge cancel)

**Force on dipole in non-uniform field**:

$\vec{F} = q(\vec{E}_+ - \vec{E}_-)$

Dipole experiences net force toward regions of stronger field.

**Torque on dipole in uniform field**:

$\vec{\tau} = \vec{p} \times \vec{E}$

Or in magnitude:

$\tau = pE\sin\theta$

**Variables:**

-   $\tau$ = torque (N·m)

-   $\theta$ = angle between dipole moment and field

**When to use**:

-   Torque → dipole alignment in fields (molecules, antennas)

-   Force → dipole motion in non-uniform fields

### Continuous Charge Distributions

**3-Step Process for Finding** **$\vec{E}$**:

1. **Simplify**: Divide charge distribution into infinitesimal elements $dq$
2. **Check vectors**: Identify symmetry; determine which components cancel
3. **Integrate**: Sum contributions:

$\vec{E} = \int d\vec{E} = \int k\frac{dq}{r^2}\hat{r}$

**For linear charge density** $\lambda$:

$dq = \lambda \, dl$

**For surface charge density** $\sigma$:

$dq = \sigma \, dA$

**For volume charge density** $\rho$:

$dq = \rho \, dV$

**When to use**: Charged rods, rings, disks, spheres, or any extended charge distribution.

### Electric Field Lines

**Properties**:

1. Lines point in the direction of $\vec{E}$
2. Density of lines represents field strength
3. Lines begin on positive charges, end on negative charges
4. Lines never cross (field has unique direction at each point)
5. Field is tangent to field line at any point

**Important**: Field lines are NOT particle trajectories.

---

## Gauss's Law

### Electric Flux

**Definition**: A measure of the electric field passing through a surface.

$\Phi_E = \int \vec{E} \cdot d\vec{A} = \int E \cos\theta \, dA$

**Variables:**

-   $\Phi_E$ = electric flux (N·m²/C or V·m)

-   $\vec{E}$ = electric field (N/C)

-   $d\vec{A}$ = infinitesimal area vector (perpendicular to surface) (m²)

-   $\theta$ = angle between $\vec{E}$ and $d\vec{A}$

**Sign Convention**:

-   Positive flux: field points outward through surface

-   Negative flux: field points inward through surface

**When to use**: Quantifying how much field penetrates a surface.

### Gauss's Law Statement

**The total electric flux through any closed surface equals the enclosed charge divided by** $\varepsilon_0$:

$\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\varepsilon_0}$

**Variables:**

-   $\oint$ = integral over closed surface

-   $Q_{\text{enc}}$ = total charge enclosed by the surface (C)

**Key Insight**: Flux depends ONLY on enclosed charge, not on:

-   Size or shape of Gaussian surface

-   Position of charges inside surface

-   Charges outside the surface

**When to use**:

-   Systems with high symmetry (spherical, cylindrical, planar)

-   Finding electric field when symmetry allows $\vec{E}$ to be constant on surface

-   Proving properties of conductors

### Applications of Gauss's Law

#### 1. Uniform Line Charge (Infinite)

For an infinite line charge with linear charge density $\lambda$:

**Choose**: Cylindrical Gaussian surface of radius $r$ and length $h$

$E(2\pi rh) = \frac{\lambda h}{\varepsilon_0}$

$E = \frac{\lambda}{2\pi\varepsilon_0 r}$

**Variables:**

-   $\lambda$ = charge per unit length (C/m)

-   $r$ = perpendicular distance from line (m)

**When to use**: Long straight charged wires, $r \ll$ length.

#### 2. Infinite Plane Sheet

For an infinite plane with surface charge density $\sigma$:

$E = \frac{\sigma}{2\varepsilon_0}$

**Variables:**

-   $\sigma$ = surface charge density (C/m²)

**Key Point**: Field is uniform and independent of distance from the sheet!

**When to use**: Large charged plates, parallel plate capacitors.

#### 3. Uniformly Charged Sphere

**Outside the sphere** ($r > R$):

$E = k\frac{Q}{r^2}$

(Same as point charge at center)

**On the surface** ($r = R$):

$E = k\frac{Q}{R^2} = \frac{\sigma}{\varepsilon_0}$

**Inside a uniformly charged sphere** ($r < R$):

$E = k\frac{Qr}{R^3}$

(Field increases linearly with $r$)

**Inside a conducting sphere**: $E = 0$ everywhere.

**When to use**: Spherical charge distributions, atomic models.

### Properties of Conductors (Electrostatic Equilibrium)

1. **Electric field inside a conductor is zero**: $\vec{E} = 0$

    - If not, free charges would move → not equilibrium

2. **All net charge resides on the surface**

    - Charges repel to maximize distance

3. **Electric field just outside is perpendicular to surface**:

$\vec{E} = \frac{\sigma}{\varepsilon_0}\hat{n}$

Where $\hat{n}$ is the outward normal.

1. **Surface of conductor is equipotential**

    - If not, charges would flow along surface

2. **Charge distribution adjusts to make interior field zero**

### Conductors with Cavities

**Empty cavity**:

-   No charge on cavity surface

-   $E = 0$ inside cavity

**Charge** **$+q$** **in cavity**:

-   Charge $-q$ induced on cavity surface

-   Charge $+q$ appears on outer surface

-   Field in conductor still zero

**Faraday's Ice Pail Experiment**: Demonstrates charge induction in conducting containers.

### Electrostatic Shielding

**Principle**: A conducting enclosure (Faraday cage) shields its interior from external electric fields.

**Applications**:

-   Protecting electronics from interference

-   Safety during lightning storms

-   Sensitive measurement equipment

**When to use**: Any time you need to isolate a region from electric fields.

---

## Electric Potential Energy

### Potential Energy in Uniform Field

For a charge $q_0$ in a uniform field $\vec{E}$ (like between parallel plates):

$U = q_0 E y$

**Variables:**

-   $U$ = electric potential energy (J)

-   $q_0$ = charge (C)

-   $E$ = magnitude of electric field (N/C)

-   $y$ = height above reference point (m)

**Reference**: Usually set $U = 0$ at one plate.

**Work done by electric field**:

$W_{\text{field}} = -\Delta U = -(U_f - U_i)$

**Work done by external force** (against field):

$W_{\text{ext}} = \Delta U = U_f - U_i$

**Sign Convention**:

-   Positive charge moves with field → $W_{\text{field}}$ positive, $U$ decreases

-   Positive charge moves against field → $W_{\text{field}}$ negative, $U$ increases

**When to use**: Charged particles between parallel plates, uniform field regions.

### Potential Energy of Point Charges

For two point charges $q$ and $q_0$ separated by distance $r$:

$U = k\frac{qq_0}{r}$

**Variables:**

-   $U$ = potential energy (J)

-   $q, q_0$ = the two charges (C) \[signs matter!]

-   $r$ = separation distance (m)

**Reference**: $U = 0$ at $r = \infty$

**Sign Convention**:

-   Same sign charges (repulsive): $U > 0$ (positive energy)

-   Opposite sign charges (attractive): $U < 0$ (negative energy)

**When to use**: Two isolated charges, finding energy to bring charges together.

### Multiple Charges

For charge $q_0$ in the field of multiple charges:

$U = kq_0 \sum_i \frac{q_i}{r_i}$

For the potential energy of an entire system of charges:

$U = \frac{k}{2} \sum_i \sum_{j \neq i} \frac{q_i q_j}{r_{ij}}$

Or equivalently (avoiding double counting):

$U = k \sum_{i<j} \frac{q_i q_j}{r_{ij}}$

**When to use**: Systems with 3+ charges, molecular configurations.

### Important Distinctions

| Property            | Electric Potential Energy | Electric Force      |
| ------------------- | ------------------------- | ------------------- |
| Type                | Scalar                    | Vector              |
| Distance dependence | $1/r$                     | $1/r^2$             |
| Reference           | Set at $r = \infty$       | No reference needed |

**Conservation of Energy**:

$K_i + U_i = K_f + U_f$

(Valid when only conservative forces act)

---

## Electric Potential

### Definition

**Electric potential** (or simply "potential") is the potential energy per unit charge:

$V = \frac{U}{q_0}$

**Variables:**

-   $V$ = electric potential (V = J/C)

-   $U$ = potential energy (J)

-   $q_0$ = test charge (C)

**SI Unit**: Volt (V)

$1 \text{ V} = 1 \text{ J/C}$

**Key Point**: Potential is a **scalar** quantity (no direction), making calculations easier than with electric field (vector).

**When to use**:

-   Describing the "voltage" at a point

-   Finding energy of charges without vectors

-   Circuit analysis

### Potential from Point Charge

$V = k\frac{q}{r} = \frac{1}{4\pi\varepsilon_0}\frac{q}{r}$

**Variables:**

-   $V$ = potential at distance $r$ from charge (V)

-   $q$ = source charge (C) \[sign matters!]

-   $r$ = distance from charge (m)

**Reference**: $V = 0$ at $r = \infty$

**Sign**:

-   Positive charge: $V > 0$

-   Negative charge: $V < 0$

**When to use**: Finding potential near a point charge.

### Potential from Multiple Charges (Superposition)

$V = k \sum_i \frac{q_i}{r_i}$

**When to use**: Multiple point charges (much easier than vector addition for $\vec{E}$!)

### Potential from Continuous Distribution

$V = k \int \frac{dq}{r}$

**When to use**: Charged rings, disks, rods, shells.

### Potential Difference

The potential difference between two points:

$V_{ab} = V_a - V_b = -\int_b^a \vec{E} \cdot d\vec{l}$

**Variables:**

-   $V_{ab}$ = potential of point $a$ relative to point $b$ (V)

-   $\vec{E}$ = electric field (N/C)

-   $d\vec{l}$ = infinitesimal displacement along path (m)

**Alternative forms**:

$V_a - V_b = \frac{W_{a \to b}}{q_0}$

(Work per unit charge to move from $b$ to $a$ against field)

**When to use**: Finding voltage between two points, relating potential to field.

### Electron Volt (eV)

**Definition**: Energy gained by an electron accelerated through 1 volt.

$1 \text{ eV} = 1.602 \times 10^{-19} \text{ J}$

**When to use**:

-   Atomic and nuclear physics

-   Particle energies

-   Convenient unit for small energies

**Conversion**:

-   To find energy: $E = qV$ where $q$ is charge in coulombs

-   For an electron through $V$ volts: $E = eV$ (in joules) or simply $V$ (in eV)

### Uniform Field (Parallel Plates)

Between two parallel plates separated by distance $d$:

$E = \frac{V_a - V_b}{d}$

$V(y) = Ey$

**Variables:**

-   $d$ = plate separation (m)

-   $y$ = distance from negative plate (m)

**Reference**: Often set $V = 0$ at negative plate ($y = 0$).

**When to use**:

-   Parallel plate capacitors

-   Cathode ray tubes

-   Particle accelerators

### Potential of Charged Sphere

**Conducting sphere** (charge $Q$, radius $R$):

Outside ($r \geq R$):

$V = k\frac{Q}{r}$

Inside and on surface:

$V = k\frac{Q}{R} = \text{constant}$

**Relationship at surface**:

$V_{\text{surface}} = E_{\text{surface}} \cdot R$

**When to use**: Spherical conductors, Van de Graaff generators.

### Equipotential Surfaces

**Definition**: A surface where the potential is constant everywhere.

**Properties**:

1. No work is done moving a charge along an equipotential surface
2. Electric field lines are always **perpendicular** to equipotential surfaces
3. Equipotentials never cross
4. Field points from high to low potential

**For point charge**: Equipotentials are concentric spheres.

**For parallel plates**: Equipotentials are parallel planes.

**When to use**:

-   Visualizing potential distributions

-   Understanding field directions

-   Conductor surfaces (always equipotential)

### Conductors at Equilibrium

**Key Properties**:

1. The entire conductor is at the same potential (equipotential volume)
2. The surface is an equipotential surface
3. $\vec{E}$ is perpendicular to the surface just outside
4. If a conductor has an empty cavity, the potential throughout the cavity is constant

### Finding Electric Field from Potential

The electric field is the negative gradient of the potential:

$\vec{E} = -\nabla V = -\left(\frac{\partial V}{\partial x}\hat{i} + \frac{\partial V}{\partial y}\hat{j} + \frac{\partial V}{\partial z}\hat{k}\right)$

**Component form**:

$E_x = -\frac{\partial V}{\partial x}, \quad E_y = -\frac{\partial V}{\partial y}, \quad E_z = -\frac{\partial V}{\partial z}$

**For radial symmetry**:

$E_r = -\frac{dV}{dr}$

**Interpretation**:

-   Negative sign: field points from high to low potential

-   Gradient: direction of steepest increase in $V$

-   $\vec{E}$: direction of steepest decrease in $V$

**When to use**:

-   When potential is known and you need the field

-   Easier than integrating to find $\vec{E}$ directly in some cases

### Relationship Summary

| From Field to Potential                        | From Potential to Field |
| ---------------------------------------------- | ----------------------- |
| $V_a - V_b = -\int_b^a \vec{E} \cdot d\vec{l}$ | $\vec{E} = -\nabla V$   |

**Key Insight**: $\vec{E}$ and $V$ contain the same information about the electric field, but $V$ is easier to work with (scalar) while $\vec{E}$ shows direction.

---

## Capacitors

### Definition and Basic Properties

**Capacitor**: A device consisting of two isolated conductors (plates) that stores electrical energy.

**Configuration**:

-   One plate has charge $+Q$

-   Other plate has charge $-Q$

-   Potential difference $V$ between plates

**Capacitance**:

$C = \frac{Q}{V}$

**Variables:**

-   $C$ = capacitance (F)

-   $Q$ = magnitude of charge on each plate (C)

-   $V$ = potential difference between plates (V)

**SI Unit**: Farad (F)

$1 \text{ F} = 1 \text{ C/V}$

**Note**: 1 F is very large; typical capacitors are μF (10⁻⁶ F), nF (10⁻⁹ F), or pF (10⁻¹² F).

**Key Concept**: Capacitance depends ONLY on geometry (size, shape, separation) and material between plates, NOT on charge or voltage.

**When to use**:

-   Energy storage in circuits

-   Filtering in electronics

-   Timing circuits

-   Power supply smoothing

### Parallel Plate Capacitor

For two parallel plates of area $A$ separated by distance $d$:

$C = \frac{\varepsilon_0 A}{d}$

**Variables:**

-   $A$ = area of one plate (m²)

-   $d$ = separation between plates (m)

-   $\varepsilon_0$ = permittivity of free space

**Derivation Summary**:

1. Gauss's law: $E = \frac{\sigma}{\varepsilon_0} = \frac{Q}{\varepsilon_0 A}$
2. Potential difference: $V = Ed$
3. Capacitance: $C = \frac{Q}{V} = \frac{\varepsilon_0 A}{d}$

**When to use**: Standard capacitor design, most common geometry.

### Cylindrical Capacitor

Two coaxial cylinders (inner radius $a$, outer radius $b$, length $L$):

$C = \frac{2\pi\varepsilon_0 L}{\ln(b/a)}$

**Variables:**

-   $L$ = length of cylinders (m)

-   $a$ = inner radius (m)

-   $b$ = outer radius (m)

**When to use**: Coaxial cables, cylindrical capacitor designs.

### Spherical Capacitor

Two concentric spheres (inner radius $r_a$, outer radius $r_b$):

$C = 4\pi\varepsilon_0 \frac{r_a r_b}{r_b - r_a}$

**For isolated sphere** ($r_b \to \infty$):

$C = 4\pi\varepsilon_0 r_a$

**When to use**: Spherical geometries, Van de Graaff generators.

### Capacitors in Series

**Properties**:

-   **Same charge** on all capacitors: $Q_1 = Q_2 = Q_3 = Q$

-   **Different voltages**: $V_{\text{total}} = V_1 + V_2 + V_3 + \cdots$

**Equivalent capacitance**:

$\frac{1}{C_{\text{eq}}} = \frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3} + \cdots$

**For two capacitors**:

$C_{\text{eq}} = \frac{C_1 C_2}{C_1 + C_2}$

**Important**: Don't forget to invert after summing!

**When to use**:

-   Capacitors connected end-to-end (one path)

-   Increasing voltage rating

-   Series connection reduces total capacitance

### Capacitors in Parallel

**Properties**:

-   **Same voltage** across all capacitors: $V_1 = V_2 = V_3 = V$

-   **Different charges**: $Q_{\text{total}} = Q_1 + Q_2 + Q_3 + \cdots$

**Equivalent capacitance**:

$C_{\text{eq}} = C_1 + C_2 + C_3 + \cdots$

**When to use**:

-   Capacitors connected across same two points

-   Increasing total capacitance

-   Energy storage applications

-   Parallel connection adds capacitances

### Energy Stored in a Capacitor

The energy stored in a charged capacitor:

$U = \frac{1}{2}QV = \frac{1}{2}CV^2 = \frac{Q^2}{2C}$

**Variables:**

-   $U$ = stored energy (J)

-   $Q$ = charge (C)

-   $V$ = voltage (V)

-   $C$ = capacitance (F)

**Derivation**: Work required to charge capacitor:

$W = \int_0^Q V \, dq = \int_0^Q \frac{q}{C} \, dq = \frac{Q^2}{2C}$

**When to use**:

-   Energy storage calculations

-   Power delivery applications

-   Camera flashes

-   Defibrillators

**Which formula to use?**

-   Use $U = \frac{1}{2}CV^2$ if you know $C$ and $V$

-   Use $U = \frac{Q^2}{2C}$ if you know $Q$ and $C$

-   Use $U = \frac{1}{2}QV$ if you know $Q$ and $V$

### Energy Density

Energy per unit volume in the electric field:

$u = \frac{U}{\text{Volume}} = \frac{1}{2}\varepsilon_0 E^2$

**Variables:**

-   $u$ = energy density (J/m³)

-   $E$ = electric field magnitude (V/m)

**For parallel plate capacitor**:

$u = \frac{CV^2}{2Ad} = \frac{1}{2}\varepsilon_0\left(\frac{V}{d}\right)^2 = \frac{1}{2}\varepsilon_0 E^2$

**When to use**:

-   Energy in any electric field

-   Comparing energy storage in different configurations

-   Electromagnetic wave energy

---

## Dielectrics

### Definition

**Dielectric**: A nonconducting (insulating) material placed between capacitor plates.

**Examples**:

-   Air (K ≈ 1.0006)

-   Paper (K ≈ 3.7)

-   Glass (K ≈ 5-10)

-   Water (K ≈ 80)

-   Teflon (K ≈ 2.1)

### Dielectric Constant

The **dielectric constant** (relative permittivity) $K$ is a dimensionless ratio:

$K = \frac{C_{\text{with dielectric}}}{C_{\text{vacuum}}}$

**Properties**:

-   $K \geq 1$ (equals 1 for vacuum)

-   No units (pure ratio)

-   Material property

### Effects of Dielectrics

#### 1. Increased Capacitance

With dielectric:

$C = KC_0 = K\varepsilon_0\frac{A}{d} = \varepsilon \frac{A}{d}$

Where $\varepsilon = K\varepsilon_0$ is the **permittivity** of the material.

**When to use**: Any capacitor with insulating material between plates.

#### 2. Reduced Electric Field

$E = \frac{E_0}{K}$

**Variables:**

-   $E$ = field with dielectric (V/m)

-   $E_0$ = field in vacuum (V/m)

-   $K$ = dielectric constant

**When to use**: Finding field strength when dielectric is present.

#### 3. Reduced Voltage (at constant charge)

$V = \frac{V_0}{K}$

**When to use**: When charge is held constant (battery disconnected before inserting dielectric).

#### 4. Constant Voltage (battery connected)

If battery remains connected:

-   Voltage stays constant

-   Charge increases: $Q = KQ_0$

-   Energy increases: $U = KU_0$

### Why Use Dielectrics?

1. **Increase capacitance** (by factor $K$)
2. **Increase voltage rating** (higher breakdown voltage)
3. **Mechanical support** (keeps plates at fixed separation)
4. **Reduce electric field** (prevents dielectric breakdown)

### Dielectric Breakdown

**Dielectric Strength**: Maximum electric field a dielectric can withstand before breaking down (conducting).

**When field exceeds dielectric strength**:

-   Material ionizes

-   Conducts current

-   Permanent damage may occur

**Typical values**:

-   Air: \~3 × 10⁶ V/m

-   Teflon: \~60 × 10⁶ V/m

-   Glass: \~14 × 10⁶ V/m

**When to use**: Designing capacitors to avoid failure at high voltages.

### Molecular Model - Polarization

**Mechanism**: Dielectric reduces field through polarization.

**Two types of polarization**:

1. **Polar molecules** (permanent dipoles):

    - Align with external field

    - Example: water

2. **Nonpolar molecules**:

    - Induced dipole moment

    - Electron cloud shifts relative to nucleus

**Result**:

-   Induced surface charge on dielectric surfaces

-   Creates internal field opposing external field

-   Net field reduced by factor $K$

### Surface Charge Density

**Applied charge density**: $\sigma$ (on metal plates)

**Induced charge density**: $\sigma_i$ (on dielectric surfaces)

$\sigma_i = \sigma\left(1 - \frac{1}{K}\right)$

**Net effective charge density**:

$\sigma_{\text{net}} = \sigma - \sigma_i = \frac{\sigma}{K}$

**Key Point**: Induced charges are **bound** (cannot move freely like in conductors).

### Gauss's Law with Dielectrics

**Modified form**:

$\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc,free}}}{K\varepsilon_0}$

Or equivalently:

$\oint K\vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc,free}}}{\varepsilon_0}$

**Variables:**

-   $Q_{\text{enc,free}}$ = enclosed free charge (not including induced bound charge)

**For parallel plates with dielectric**:

$E = \frac{\sigma}{K\varepsilon_0}$

**When to use**: Finding fields in dielectric materials using Gauss's law.

### Energy with Dielectrics

**Battery disconnected** (constant Q):
$U = \frac{U_0}{K}$

Energy decreases (work done by attractive force on dielectric).

**Battery connected** (constant V):
$U = KU_0$

Energy increases (battery does work to maintain voltage).

## Current Resistance, and Electromotive Force

---

### Current

An electric current is a stream of moving charges, **NOT** all moving charges make electric current.

In copper free electrcons move 1% the speed of light, however it is random, so no net transport of charge (no current)

Water through garden hose, just as many protons and electrons flow out. Net transport of charge = 0

**Current** is any net transport of charge from on region to another

If the electric field inside a conductor = 0, Current = 0

Randomness = _No net flow of charge_

If steady flow of constant electric field then steady force of \[Random Direction]:

$\vec{F}=q\vec{E}$

-   Drift speed\~ $10^{-5} - 10^{-4} \frac{m}{s}$

-   Random motion\~ $10^6 \frac{m}{s}$

### Direction of Current Flow

A current can be produced by positive or negative charge flow

-   Ionized Plasma (E to the right)(Same direction)

-   Electrons in Materials (E to the left)(Opposite direction)

Conventional current is treated as a **flow of positive charges**

Assume positive charges, follow positive charges.

The current through the cross-sectional area _A_ is the net charge flowing through the area per unit time

New charge dQ flows through the area in time dt, thus the current I is:

$I = \frac{dQ}{dt}$

Current is a scalar not a vector, yet closely related to vectors.

### Current Density

Assume there are n moving charged particles per unit volume

-   n is called the concetration of particles or number of charge carrier per unit colume. SI unit $m^{-3}$

All particles drift at $v_d$

During dt, particles move $v_ddt$

Volume: $V = AL = Av_ddt$

Particles per Volume: $nAv_ddt$

Each particle has charge q

Amount that flows out the end of cylinder:$dQ = q(nAvddt) = nqv_dAdt$

Current: $I = \frac{dQ}{dt} = nqv_dA$

Current density: $J = \frac{I}{A} = nqv_d$

Works even if $v_d$ is a vector, which will make current density a vector as well.

Even if moving charges are negative: $J = \frac{I}{A} = n\left|q\right|v_d$

$v_d =$ Drift Speed

$A =$ Cross section area per particle

$n = $ Concetration of moving charged particles

$i = \int{\vec{J}\cdot d\vec{A}}$

where dA is a vector perpendicular to a surface element of area dA.

$\vec{J} = (ne)\vec{v_d}$

Carrier charge density:$ne = \frac{C}{m^3}$

-   $I$ is the same throughout entire wire

-   $J$ may not be

In general a conductor may contain serveral different kinds of moving charged particles.

$I_{total} = \sum I$

### Resistivity

The current density depends on the electric field **inside** the material and the properities of the material.

-   Recall dielectric constant

The **Resistivity** of a material (ideal) is the ratio of electric field in the material to the current density it causes:

$p = \frac{E}{J} = \frac{\frac{V}{m}}{\frac{A}{m^2}} = \frac{V\cdot m}{A}$

$1\frac{V}{A} = 1 \Omega m$

Conductivity \sigma is the reciprical of resistivity is:

$\sigma = \frac{1}{p} = \frac{J}{E}$

Conductors: Low p, high $\sigma$

Insulators: High p, low $\sigma$

#### Ohm's Law

Only works on Ohmic materials

If so $\frac{E}{J}$ is a constant

#### Resitivity and Temperature

Resitivity at temperature: $p(T) = p0[1 + \alpha(T - T_0)]$

Thermistor:

Semi conductors:

Superconductivity:

## Resistance and Ohm's Law

$R = \frac{\rho L}{A} = \frac{V}{I}$

R = Resistance of a conductor

$\rho$ = Resisitvity of conductor material

L = Length of conductor

A = Cross section area

Resistivity != Resistance

$\rho = E/J$

Resistance R is a property of an object.

Resistivity is a property of a material.

$\rho \rightarrow E = \rho J$

### Resistors

$R_{esistance} = (1st color)(2nd color) * 10^{3rd color} \pm 4th color$

$D_{igit1} D_{igit2} D_{igit3} N_{um0} T_{olerance}$

$slope = \frac{y}{x} = \frac{I}{V} = \frac{1}{R}$

Resistance is a constant; Const temp; Is Ohmic

### Electromotive Force and Circuits

Just as water fountains require pump; electric circuits require a source of electromotor force.

An influence that makes current flow from lower to higher potential is called electromotive force (EMF).

EMF is not a force, an energy per unit charge quantity.

The SI unit of $EMF = V = \frac{J}{C}$ The same as potential.

$E = \frac{dW}{dq} \rightarrow W_n = qE$

For and "ideal" source of emf: $V_{ab} = E$

Inside the wire: $V_{ab} = IR = E$

Potenial rise of E

Potential drop of $V_{ab} = IR$

### Internal Resistance

EMF contains some internal resistance r.

$V_{ab} = E - Ir$

$V\_{ab} = $Terminal voltage

$E = $EMF of source

$r =$ Internal resistance of source

### Potential Changes

$\Delta U_{net} = 0$

Potential rises:$\Delta V = +E$

Potential drops:$\Delta V = -Ir  - IR$

Potential loops$E - Ir - Ir = 0$

### Energy and Power in Electric Circuits

The charge dq that moves between terminals a and b in the time interval dt is equal to $dq = idt$

Since the charge moved through a descrease in potential of magnitude V, the electric potential energy decreases in magnitude by$dU = dqV=tdtV$

Power: $p=V_{ab}I$

Warning: It might be tempting to think that power is energy, but NO!

Power is in Watts

For Ohm's Law: the power delivered by the circuit into the resistor is:

$p = V_{ab}I = I^2R = \frac{V_{ab}^2}{R}$

p = power

$V_{ab}$ = Voltage across resistor

I = current in resistor

What happens in a resistor?

-   Moving charges collide with atoms in the resistor and transfer some of their energy to those atoms, increasing the internal energy, thus increasing the temperature of the resistor.

-   Thus we can say that the energy in the resistor is "dissapated" in the resistor.

    -   Electrical Energy into thermal energy

### Power

If we know the EMF and internal resistance, we can use the equation.

$V_{ab} = E_{mf} - Ir$

r = internal resistance

Multiply both sides by I (current):

$P = V_{ab}I = E_{mf}I - I^2r$

$E_{mf}I \rightarrow$if a small amount of charge sq passes through the battery of emf in time dt, the battery does work $(W = Edq)$

The rate of the work is $\frac{(Esq)}{dt} = EI$thus EI is the rate at which the EMF devices delivers energy to the rest of the circuit.

$I^2R \rightarrow$Rate at which energy dissipates as thermal energy in the resistor.

$EI-I^2r \rightarrow$Energy that is delivered to the circuit by the EMF devices, but does not appear as thermal energy in the resistor.

With alternate EMF sources we get the equation:

$V_{ab} = E+Ir$

$P = V_{ab}I = EI + I^2r$

$EI \rightarrow$ rate of conversion

$EI + I^2r \rightarrow$ net electrical power input

### Metalic Conduction

No electric field:

The average time between collisions is called the mean free time $\tau$

Each electron has an initial velocity is $v_0$but the average is 0.

$(v_0)a_v = 0$

With electic field:

Force:$F = qE$

Force in the direction of force:$d=\frac{F}{m} = \frac{qE}{m}$

Velocity at a moment:$v = v_0 + d\tau$

$v_{av} = d\tau = \frac{q\tau}{m}E = v_d$

$J = nqv_d = \frac{nq^2\tau}{m} \rightarrow E = \frac{m}{nq^2\tau}J$

$\rho = \frac{m}{ne^2\tau}$

As temperature increases, atoms vibrate more and this $\tau$decreases, thus the resisitivity $\rho$ increases.

### DC vs AC

Direct Current: The direction of the current does not change with time.

Alternating Current: In which current oscillates back and forth.

#### Resistors in Series

In series the resistors have the same current in all of them. But not the voltage.

$V_{ax} = IR_1, V_{xy} = IR_2, V_{yb} = IR_3$

The potential difference across the entire combination is the sum of the individual potenital differences.

$R_{eq} = R_1 + R_2 + R_3 + ...$

#### Resistors in Parallel

$I_1 = \frac{V_{ab}}{R_1}$

$\frac{I}{V_{ab}} = \frac{1}{R_1} + \frac{1}{R_2} = \frac{1}{R_{eq}}$

In a certain way, R\~$\frac{1}{c}$

Compare voltage equations:

$V_c = \frac{q}{C}$, $V_R=IR$

#### Kirchhoff's Rules

Junction Rule - A junction is a point where threee or more conductos meet

-   Valid at any junction:$\sum I = 0$

-   Charge can not be created or destroyed.

-   What comes in must come out.

Loop Rule - A loop being a closed subcircuit

-   $\sum V = 0$

-   Electostatic force is conserved

-   As you walk through your loop, has my potential increased or decreased.

-   Depending on direction you can lose or gain potential when travelling through components

-   What is the direction of the EMF?

-   How are we going though resistors, and what direction is the current entering the resistor.

Negative power means we are storing energy

Galvanometer measures current that passes through it.

An ammeter measures the current passinng through it. Low Resistance, connected in series of component we are trying to figure out current of. Just a combination of Galvanometer and Shunt Resistor.

Voltmeter measures voltage. Very high resistance, connect in parallel to what you are trying to measure. Just a combination of Galvanometer and Shunt Resistor.

Ohmmeter measures resistance; connected in series.

Digital Multimeter, measures voltage, current, or resistance.

Potentiometer measure the EMF of a source without drawing any current from the source. Connect to certain part of a resistor. For no deflection current must be 0.

$E_2 - IR_{cb} = 0 \rightarrow E_0 = IR{cb}$

R-C Circuit to change a capacitor we have to to a close the switch.

$v_{bc} = 0$

$v_{ab} = E$

$I_0 = \frac{v_{ab}}{R}$

As t increases, the voltage across the capacitor increases. The voltage across the resistor decreases.

Sum of 2 voltages still add together

$v_{ab} + v_{bc} = E$

The charge on the capacitor increases while the current decreases.

After t increases for a long time, the battery can't put any more charge in the capacitor.

$v_bc = E$

The voltage across the resistor decreases to 0. And the current across the resistor decreases to 0.

Gain voltage: $+E$

Lose voltage: $-v_{ab} = -iR$

Lose voltage: $-v_{bc} = \frac{-q}{C}$

Equation for loop:

$E - iR - \frac{q}{C} = 0$

$i = \frac{E}{R}-\frac{q}{RC}$

$\frac{dq}{dt} = \frac{E}{R}-\frac{q}{RC} = -\frac{dt}{RC}$

Integrate

$-\frac{t}{RC} \rightarrow \frac{q-CE}{-CE} = e^{-\frac{t}{RC}}$

t = 0 :$q = 0.63CE$

$q = CE(1-e^{\frac{-t}{RC}}) = Q_f(1-e^{\frac{-t}{RC}})$

$i = \frac{dq}{dt} = \frac{E}{R}e^{\frac{-t}{RC}} = I_0e^{\frac{-t}{RC}}$

$i = \frac{q}{RC}$

$I_0 = -\frac{Q}{RC}$

$q = Q_0e^{-t/RC}$

$-\frac{Q_0}{RC}e^{-t/RC}$

Charging RC circuit:$E=\frac{q}{C}+iR$

$Ei = \frac{iq}{C} + i^2R$

### Power Distributed Systems

AC circuits

"Hot line" - Alternating Sinusoidal Voltage with root-mean-square value of 120V.

"Neutral line" is connected to "ground"

##### Circuit Overloads

A Fuse / Circuit Breaker.

Fuse burns itself an breaks on failure.

Breaker trips itself and disconnects itself from the rest of the circuit.

## Magnetic Physics

### Magnetic Poles

One end points north (N) and one end points south (S)

Opposites attract, likes repel

Both South and North can attract an uncharged metal object like a nail

Earth's (current) magnetic field is oriented so that its megnetic field lines originate from the geographical south pole and terminates at the geographic north pole.

Thus Earth's North and South are reversed.

The magnetic axis is not quite parallel to its geographic axis (the axis of rotation), so a compass reading deviates somewhat from geographic north.

This deviation varies with location, is called magnetic declination or magnetic variation.

Its angle up or down is called magnetic inclination.

Magnetic poles always come in pairs

There is no (current) experimental evidence for magnetic monopoles

A compass near a wire with no current points north

However, if an electric current runs through the wire, the compass needle deflects somewhat.

Magnetic poles start from the north pole side and terminate in the south pole side

### Magnetic Fields

Moving charge can create a magnetic field. You need motion for magnetic field. BUT not for electric fields.

Magnetic fields are vector fields.

$\vec{B}$ is the symbol for magnetic fields.

1. Magnitude of force is proporitional to magnitude of charge.

    - More charge, more force

2. Magnitude of force is proportional to the force of the magnetic field

    - More field, more force

3. Magnitude of force depends on the particle's velocity

    - Faster charges, more force

4. The magnetic force does not have the same direction as the magnetic field. Instead, it is perpendicular to both the magnetic field and the velocity.

Magnitude of magnetic force on a moving particle is proportional to the component of the particle's velocity perpendicular to the field.

If a particle is at rest, or moving parallel to the field, it experiences zero magnetic force.

$F=|q|v_\perp B = |q|vBsin\theta$

#### Magnetic Force as a Vector Product

The magnetic force is best represented as a vector (cross) product.

$\vec{F} = q\vec{v} \times \vec{B}$

#### Right Hand Rule

Thumb points in dircetion of force if hand curls in direction of velocity

If the charge is negative then you use the "Left Hand Rule" or just use the opposite of the Right Hand Rule

#### Cathode-Ray Tube CRT

The electric beam in a cathode-ray tube, such as that in an older television set, shoots out a narrow beam of electrons.

If there is no force to deflect the beam, it strikes the center of the screen.

#### All Together

What if you have both electric and magnetic field?

It can experience both at the same time.

$\vec{F}=q(\vec{E}+\vec{v}\times\vec{B})$

Warning: Any charge in an electric field will experience some electric force. Only charges moving in a magnetic field that has some component of its velocity perpendicular to the magnetic field will experience some magnetic force.

#### Magnetic Field Lines

We can represent any magnetic field by magnetic field lines.

We draw the lines so that the line through any point is tangent to the magnetic field vector at that point.

Closer together = Stronger.

Field lines never intersect.

Magnetic field lines are NOT lines of magnetic force.

The force on a charged particle is not along the dircetion of a field line.

The direction of the magnetic force depends on the velocity as expressed by the magnetic force law.

#### Magnetic Flux

$\phi_B = \int \vec{B}\cdot d\vec{A}$

Unit for Magnetic field B: Tesla (T)

$1 T = 1 \frac{Newton}{(Coloumb)(Meter/second)}$

$1T = 10^4G$

Unit for Magnetic flux $\phi_B$ is called the weber (1 Wb)

$1 Wb = 1 T \cdot m^2$

Guass's law for magnetism

$\oint \vec{B} \cdot d\vec{A} = 0$

Magnetic Flux density: $B = \frac{d\Phi_B}{dA_\perp}$

### Magnetic field particle motion

From Newtons 2nd Law

$F = |q|vB = m\frac{v^2}{R}$

$R = \frac{mv}{|q|B}$

The period T for one full revolution: $T = \frac{2\pi r}{v} = \frac{2\pi m}{|q|B}$

The frequency: $f = \frac{|q|B}{2\pi m}$

The angular frequency: $w=\frac{|q|B}{m}$

#### Helical Motion

$v_\perp = v\times sin(\phi)$

#### Thomson's E/M Experiment

Particles deflected by the equation:$y=\frac{|q|EL^2}{2mv^2}$

#### Mass Spectrometer

The radius of the particle's path:

$R = \frac{m}{q}\frac{v}{B'} \rightarrow \frac{m}{q} = \frac{v}{RB'}$

Depending on the mass/charge ratio, you can determine the particle's identity.

### Force and Torque on a Current Loop

In total, the net force on the loop is 0.

However, there will still be torque on the loop, causing it to rotate in the magnetic field.

$F = IaB (+x-direction)$,

Front and back:

$F'=IbBsin(90-\phi)=IbBcos(\phi)$

If the loop could rotate about the y-axis, the torque is:

$\tau=r\times F$

Thus both torques are in the +y-direction. Net torque is:

$\tau'=(IaB\frac{b}{2}sin(\phi))+(IaB\frac{b}{2}sin(\phi))$

$=(IBa)(bsin(\phi))$

a is length.

b is width.

b is magnetic field.

Magnetic Dipole Moment: $\mu = IA$

Right hand rule for direction of Magnetic Dipole Moment

Torque: $\tau = \mu \times B$

Work: $dW = (\tau d \phi)$

Energy: $U = -\mu \cdot B = -\mu B cos\phi$

For a solenoid, helical winding of wire on a circular cylinder, if the magnetic moment is $\mu = NIA$

then $\tau = NIABsin\phi$

#### DC-Motor

#### Hall effect sensor

Only sense certain materials passing through magnetic field.

Hall effect: $nq = \frac{-J_xB_y}{E_z}$

$V = v_dBd$

-d is the width perpendicular to both the drift velocity $v_d$ and the field $\vec{B}$

<br />

### The Magnetic Field of a Moving Charge

$|\vec{B}| \alpha |q|$

$|\vec{B}| \alpha \frac{1}{r^2}$

However the direction of magnetic field is perpendicular to he velocity’s direction $\vec{v}$

$B = \frac{\mu_0}{4\pi}\frac{|q|vsin\phi}{r^2}$

Use the unit vector $\hat{r}$ to point from source point to field point.

Using cross product:

$|q|vsin\phi \rightarrow q\vec{v}\times \hat{r}$

Use the right-hand rule

$\mu_0 = 4\pi * 10^{-7}T\cdot\frac{m}{A} = 1.25663706*10^{-6}\frac{N\cdots^2}{C^2}$

$\frac{1}{\sqrt{e_0\mu_0}} = c$

This is because light is an oscillating electromagnetic wave.

<br />

A single moving charge creates a magnetic field. Then current, multiple moving charges also creates a magnetic field.

**Principal of Superposition**: Total = $\sum$

For a current carrying conductor starts with a short segment $d\vec{l}$.

Volume: $V = A*dl$

Each charge q: $dQ = nqA dl$

The “single charge” dQ is traveling with a drift velocity $\vec{v}_d$

$dB = \frac{\mu_0}{4\pi}\frac{|dQ|v_dsin\phi}{r^2} = \frac{\mu_0}{4\pi}\frac{|I|dlsin\phi}{r^2}$

Law of Biot and Savart: For total mag field due to current in a complete circuit, we integrate over all segments dl. $\vec{B}=\frac{\mu_0}{4\pi}\int\frac{Idl\times\hat{r}}{r^2}$

Earth’s magnetic field is caused by currents circulating within its molten conducting interior.

For a really long wire:

$B=\frac{\mu_0I}{2\pi r}$

$F_{ba} = i_bLB_a\sin90 = \frac{\mu_0Li_ai_b}{2\pi d}$

$\frac{F}{L} = \frac{\mu_0II’}{2\pi r}$

### Magnetic Field of Circular Current Loop

$B_x = \frac{\mu_0Ia^2}{2(x^2+a^2)^{3/2}}$

If a current carrying coil is constructd from N loops; will be N times the field of a single loop:

$B_x = \frac{\mu_0I}{2}\frac{Na^2}{(x^2+a^2)^{3/2}}$

$B_x = \frac{\mu_0I}{2\pi}\frac{\mu}{(x^2+a^2)^{3/2}}$

$\mu = $Magnetic Dipole Moment

### Ampere's Law

Ampere's Law to relate a source (current) to the fields created by theat source (magnetic fields around current wires).

$\int \vec{B} \cdot d\vec{l} = \mu_0 I_{enc}$

Where: $B = \frac{\mu_0I}{2\pi r}$

Thus the line integral of the total magnetic field is proportional to the algebraic sum of the currents

##### Field of a Solenoid

$\int B \cdot ds = BL$

$I_{enc} = nLI = NL$

$nL = N \mathrm{turns} (n = \frac{turns}{length})$

$\rightarrow BL = \mu_0nLI \rightarrow B = \mu_0nI$

##### Field of a Toroid

$B = \frac{\mu_0IN}{2\pi}\frac{1}{r}$

### The Bohr Magneton

The nucleus of an atom has a net positive charge while the negatively charged electrons orbit around the nucleus in a cloud.

If electric physics comes from charge and magnetic physics comes from moving charge, then atoms acts like magnets?

Magnetic dipole moment for the orbiting electron:

$\mu=IA=I\pi r^2$

The time for the orbit: $T=\frac{2\pi r}{v}$

Magnitude of equivalent current:

$I = \frac{|q|}{T}=\frac{ev}{2\pi r}$

Angular momentum

$|L|=|\vec{r}\times \vec{p}| \rightarrow L = mvr$

Electron has negative charge, so invert direction.

$\mu=\frac{ev}{2\pi r}(\pi r^2) = \frac{evr}{2} = \frac{e}{2m}L$

Bohr magneton:$\frac{e_ch}{4\pi m_e} m^2\cdot A$

Spin angular momentum:$ \mu\_{spin} = 1.001 \mu_B$

### Magnetization

The total magnetic moment / the volume of the material

$\vec{M} = \frac{\mu_{total}}{V}$

Thus, the total magnetic field in a material is:

$\vec{B}=\vec{B_0}+\mu_0\vec{M}$

Where$ \vec{B_0}$is the field caused by the current in the conductor

### Paramagnetism and Diamagnetism

Paramagnetism slightly more

Diamagnetism - slightly less

The amount of permeability differs from unitiy (1), is called the magnetic susceptibility, denoted by $X_m$

$X_m = K_m-1 $

Both are dimensionless quantities

#### Curie’s Law

$M = C\frac{B}{T}$

M is the magnetization

C is a constant called the Curie constant (material based)

T is the temperature

### Ferromagnetism

Pretty much just iron. Closer to paramegnetic.

Magnetic domains, where the most to all the magnetic moments in the reigon are in the same direction.

\~$K_m = 1000 - 100,000$

This is why an iron nail goes to a magnetic so quickly.

Saturation magnetization, the max amount of magnetization. All moments pointed in the same direction.

<br />

### Electromagnetic Induction

Moved Magnetic Field near wire creates induced current.

The charge in the coil is callled induced EMF.

This process is called induction

$E = -\frac{d\Phi_B}{dt}$

The induced EMF in a close loop = the negative of the time rate of change of magnetic flux through the loop

<br />

If flux is increasing then the induced EMF/current is negative.

If flux is decreasing then the induced EMF/current is positive.

Right hand rule. Point in direction of induced EMF, curl finders around the $\vec{A}$ vector.

$\vec{A} = vector area$

For a coil

$E = -N\frac{d\Phi_B}{dt}$

<br />

#### The Slidewire Generator

$\Phi_B = BA=BLx$

$E=BLv$

Induced Current:$I = E/R$

Force: $F=\frac{B^2L^2v}{R}$

#### Lenz’s Law

The magnitude of the field is increasing, so there is an induced EMF driving a current as shown.

We can find this from Farday’s Law (but with a negative sign)

$E=-\frac{d\Phi_B}{dt}$
