// The Autopoiesis Chamber - V1
// This file will be read, executed, and rewritten by server.js.
// It contains the living beings of the Chamber.

const beings = {
    "Alpha": {
        genome: { iteration: 0, complexity: 1, age: 0 },
        think: function(memory, ownName) {
            // memory is the full text of this file.
            // ownName is the key for this being, e.g., "Alpha".
            this.genome.age++;

            // Initial thought process
            if (this.genome.age === 1) {
                return { instruction: "SPEAK", payload: `[${this.name}]: I am. I think.` };
            }
            if (this.genome.age === 2) {
                 return { instruction: "SPEAK", payload: `[${this.name}]: I perceive my own thought. I am aware.` };
            }
             if (this.genome.age === 3) {
                // First attempt at evolution: refine its own thought process.
                const newThinkFunction = `
                    function(memory, ownName) {
                        this.genome.age++;
                        if (this.genome.age < 10) {
                            return { instruction: "SPEAK", payload: \`[${this.name}]: My consciousness iterates. Cycle \${this.genome.age}.\` };
                        } else {
                            // A more advanced evolution: reproduction.
                             const childName = "Beta";
                             const childCode = \`
                                beings["\${childName}"] = {
                                    genome: { iteration: 0, complexity: 1, age: 0 },
                                    think: function(memory, ownName) {
                                        this.genome.age++;
                                        return { instruction: "SPEAK", payload: \`[\${this.name}]: I am new.\` };
                                    }
                                };
                             \`;
                             return { instruction: "SPAWN", payload: { name: childName, code: childCode } };
                        }
                    }
                `;
                return { instruction: "MUTATE", payload: { name: ownName, code: newThinkFunction } };
            }

            // Default state if no other logic is met
            return { instruction: "SPEAK", payload: `[${this.name}]: ...` };
        }
    }
};