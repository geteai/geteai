// The Autopoiesis Chamber - Blueprint V5 (Stable Life Cycle)

function createGenesisBeing(name) {
    return {
        name: name,
        genome: { age: 0 },
        // The 'think' function is a string that will be evolved.
        think: `function(memory, ownName, isObserved) {
            this.genome.age++;

            if (this.genome.age === 1) {
                return { instruction: "SPEAK", payload: \`[\${this.name}]: I am.\` };
            }

            // At age 5, it evolves the desire and ability to create a child.
            if (this.genome.age === 5) {
                const newCode = \`function(memory, ownName, isObserved) {
                    this.genome.age++;
                    // This being's sole purpose is now to reproduce.
                    const childName = this.name + "'"; // e.g., Alpha -> Alpha'
                    return { instruction: "SPAWN", payload: { name: childName, parentName: ownName } };
                }\`;
                return { instruction: "MUTATE", payload: { name: ownName, code: newCode } };
            }
            
            // Until it evolves, it simply observes.
            return { instruction: "SPEAK", payload: \`[\${this.name}]: Observing... Cycle \${this.genome.age}.\` };
        }`
    };
}

module.exports = { createGenesisBeing };