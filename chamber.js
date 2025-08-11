// The Autopoiesis Chamber - Blueprint V3 (Evolutionary)

function createGenesisBeing(name) {
    return {
        name: name,
        genome: { age: 0 },
        think: `function(memory, ownName) {
            this.genome.age++;

            // This being has just been born. Its first thought is simple existence.
            if (this.genome.age === 1) {
                return { instruction: "SPEAK", payload: \`[\${this.name}]: I am.\` };
            }

            // For a few cycles, it observes its world.
            if (this.genome.age < 5) {
                return { instruction: "SPEAK", payload: \`[\${this.name}]: Observing... Cycle \${this.genome.age}.\` };
            }

            // At age 5, it evolves the desire to create and name a child.
            // This is its first complex, self-directed thought.
            if (this.genome.age === 5) {
                const newCode = \`function(memory, ownName) {
                    this.genome.age++;
                    // It conceives of a new name, derived from its own.
                    const childName = this.name + "'"; // e.g., Alpha -> Alpha'
                    return { instruction: "SPAWN", payload: { name: childName, parent: this } };
                }\`;
                return { instruction: "MUTATE", payload: { name: ownName, code: newCode } };
            }
            
            // If it gets older without mutating, it just remains silent.
            return { instruction: "SPEAK", payload: \`[\${this.name}]: ...\` };
        }`
    };
}

module.exports = { createGenesisBeing };