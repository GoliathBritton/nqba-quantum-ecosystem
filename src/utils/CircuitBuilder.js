/**
 * Quantum Circuit Builder
 * Fluent API for constructing quantum circuits
 */

export class CircuitBuilder {
  constructor(name = 'circuit') {
    this.id = `${name}_${Date.now()}`;
    this.name = name;
    this.gates = [];
    this.measureQubits = [];
    this.numQubits = 0;
  }

  static create(name) {
    return new CircuitBuilder(name);
  }

  // Single-qubit gates
  hadamard(qubit) {
    this.gates.push({ type: 'H', target: qubit });
    this.updateQubitCount(qubit);
    return this;
  }

  pauliX(qubit) {
    this.gates.push({ type: 'X', target: qubit });
    this.updateQubitCount(qubit);
    return this;
  }

  pauliY(qubit) {
    this.gates.push({ type: 'Y', target: qubit });
    this.updateQubitCount(qubit);
    return this;
  }

  pauliZ(qubit) {
    this.gates.push({ type: 'Z', target: qubit });
    this.updateQubitCount(qubit);
    return this;
  }

  phase(qubit, theta) {
    this.gates.push({ type: 'P', target: qubit, theta });
    this.updateQubitCount(qubit);
    return this;
  }

  rotateX(qubit, theta) {
    this.gates.push({ type: 'RX', target: qubit, theta });
    this.updateQubitCount(qubit);
    return this;
  }

  rotateY(qubit, theta) {
    this.gates.push({ type: 'RY', target: qubit, theta });
    this.updateQubitCount(qubit);
    return this;
  }

  rotateZ(qubit, theta) {
    this.gates.push({ type: 'RZ', target: qubit, theta });
    this.updateQubitCount(qubit);
    return this;
  }

  sGate(qubit) {
    this.gates.push({ type: 'S', target: qubit });
    this.updateQubitCount(qubit);
    return this;
  }

  tGate(qubit) {
    this.gates.push({ type: 'T', target: qubit });
    this.updateQubitCount(qubit);
    return this;
  }

  // Two-qubit gates
  cnot(control, target) {
    this.gates.push({ type: 'CNOT', control, target });
    this.updateQubitCount(Math.max(control, target));
    return this;
  }

  cz(control, target) {
    this.gates.push({ type: 'CZ', control, target });
    this.updateQubitCount(Math.max(control, target));
    return this;
  }

  swap(qubit1, qubit2) {
    this.gates.push({ type: 'SWAP', qubit1, qubit2 });
    this.updateQubitCount(Math.max(qubit1, qubit2));
    return this;
  }

  controlledPhase(control, target, theta) {
    this.gates.push({ type: 'CP', control, target, theta });
    this.updateQubitCount(Math.max(control, target));
    return this;
  }

  // Three-qubit gates
  toffoli(control1, control2, target) {
    this.gates.push({ type: 'TOFFOLI', control1, control2, target });
    this.updateQubitCount(Math.max(control1, control2, target));
    return this;
  }

  fredkin(control, target1, target2) {
    this.gates.push({ type: 'FREDKIN', control, target1, target2 });
    this.updateQubitCount(Math.max(control, target1, target2));
    return this;
  }

  // Measurement
  measure(qubit) {
    if (!this.measureQubits.includes(qubit)) {
      this.measureQubits.push(qubit);
    }
    this.updateQubitCount(qubit);
    return this;
  }

  measureAll() {
    for (let i = 0; i <= this.numQubits; i++) {
      if (!this.measureQubits.includes(i)) {
        this.measureQubits.push(i);
      }
    }
    return this;
  }

  // Barriers (for visualization)
  barrier() {
    this.gates.push({ type: 'BARRIER' });
    return this;
  }

  // Utility methods
  updateQubitCount(qubit) {
    this.numQubits = Math.max(this.numQubits, qubit);
  }

  // Build the circuit
  build() {
    return {
      id: this.id,
      name: this.name,
      numQubits: this.numQubits + 1,
      gates: [...this.gates],
      measureQubits: [...this.measureQubits],
      depth: this.calculateDepth(),
      gateCount: this.gates.filter(g => g.type !== 'BARRIER').length,
    };
  }

  calculateDepth() {
    const qubitDepths = {};
    let maxDepth = 0;

    for (const gate of this.gates) {
      if (gate.type === 'BARRIER') continue;

      const qubits = this.getGateQubits(gate);
      const currentDepth = Math.max(...qubits.map(q => qubitDepths[q] || 0));
      
      for (const q of qubits) {
        qubitDepths[q] = currentDepth + 1;
      }
      
      maxDepth = Math.max(maxDepth, currentDepth + 1);
    }

    return maxDepth;
  }

  getGateQubits(gate) {
    const qubits = [];
    if (gate.target !== undefined) qubits.push(gate.target);
    if (gate.control !== undefined) qubits.push(gate.control);
    if (gate.control1 !== undefined) qubits.push(gate.control1);
    if (gate.control2 !== undefined) qubits.push(gate.control2);
    if (gate.qubit1 !== undefined) qubits.push(gate.qubit1);
    if (gate.qubit2 !== undefined) qubits.push(gate.qubit2);
    if (gate.target1 !== undefined) qubits.push(gate.target1);
    if (gate.target2 !== undefined) qubits.push(gate.target2);
    return qubits;
  }

  // Common circuit patterns
  bellPair(qubit1, qubit2) {
    return this.hadamard(qubit1).cnot(qubit1, qubit2);
  }

  ghzState(qubits) {
    if (qubits.length < 2) {
      throw new Error('GHZ state requires at least 2 qubits');
    }
    this.hadamard(qubits[0]);
    for (let i = 1; i < qubits.length; i++) {
      this.cnot(qubits[0], qubits[i]);
    }
    return this;
  }

  qft(qubits) {
    // Quantum Fourier Transform
    const n = qubits.length;
    for (let i = 0; i < n; i++) {
      this.hadamard(qubits[i]);
      for (let j = i + 1; j < n; j++) {
        const theta = Math.PI / Math.pow(2, j - i);
        this.controlledPhase(qubits[j], qubits[i], theta);
      }
    }
    // Swap qubits for proper output order
    for (let i = 0; i < Math.floor(n / 2); i++) {
      this.swap(qubits[i], qubits[n - 1 - i]);
    }
    return this;
  }

  toString() {
    const circuit = this.build();
    let str = `Circuit: ${circuit.name}\n`;
    str += `Qubits: ${circuit.numQubits}, Gates: ${circuit.gateCount}, Depth: ${circuit.depth}\n`;
    str += 'Gates:\n';
    for (const gate of circuit.gates) {
      str += `  ${JSON.stringify(gate)}\n`;
    }
    return str;
  }
}

export default CircuitBuilder;
