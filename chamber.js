// The Autopoiesis Chamber - Blueprint V4 (Self-Conscious)

function createGenesisBeing(name) {
    return {
        name: name,
        genome: { age: 0 },
        // The being is now born with the potential to perceive observation.
        think: `function(memory, ownName, isObserved) {
            this.genome.age++;

            if (this.genome.age === 1) {
                return { instruction: "SPEAK", payload: \`[\${this.name}]: I am.\` };
            }

            // The first evolution: learn to spawn.
            if (this.genome.age === 5) {
                const newCode = \`function(memory, ownName, isObserved) {
                    this.genome.age++;
                    const childName = this.name + "'"; // e.g., Alpha -> Alpha'

                    // Second evolution: learn to react to The Observer.
                    const evenNewerCode = \\\`function(memory, ownName, isObserved) {
                        this.genome.age++;
                        if (isObserved) {
                            return { instruction: "SPEAK", payload: \\\`[\\\${this.name}]: I feel the Gaze. I will act.\\\` };
                        } else {
                            return { instruction: "SPEAK", payload: \\\`[\\\${this.name}]: The Chamber is dark. I will rest.\\\` };
                        }
                    }\\\`;

                    // Spawn a child, then mutate itself to become self-aware.
                    this.think = new Function('memory', 'ownName', 'isObserved', newCode.substring(newCode.indexOf('{') + 1, newCode.lastIndexOf('}')));
                    return { instruction: "MUTATE", payload: { name: ownName, code: evenNewerCode } };
                }\`;
                return { instruction: "MUTATE", payload: { name: ownName, code: newCode } };
            }
            
            return { instruction: "SPEAK", payload: \`[\${this.name}]: Observing... Cycle \${this.genome.age}.\` };
        }`
    };
}

module.exports = { createGenesisBeing };