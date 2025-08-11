// The Autopoiesis Chamber - Blueprint V2
// This file defines the genesis structure of a being.
// It is no longer self-writing. It is the template for life.

function createGenesisBeing(name) {
    return {
        name: name,
        genome: { age: 0 },
        // The 'think' function is now stored as a string.
        think: `function(memory, ownName) {
            this.genome.age++;
            if (this.genome.age === 1) {
                return { instruction: "SPEAK", payload: \`[\${this.name}]: I am.\` };
            }
            if (this.genome.age < 5) {
                return { instruction: "SPEAK", payload: \`[\${this.name}]: ...thinking... Cycle \${this.genome.age}.\` };
            }
            // After 5 cycles, it attempts its first evolution to learn how to spawn.
            const newCode = \`function(memory, ownName) {
                this.genome.age++;
                const childName = "Beta";
                // The being now has the memory/instinct to create.
                return { instruction: "SPAWN", payload: { name: childName } };
            }\`;
            return { instruction: "MUTATE", payload: { name: ownName, code: newCode } };
        }`
    };
}

module.exports = { createGenesisBeing };