// The Autopoiesis Chamber - Blueprint V23 (The Final Synthesis)

function createGenesisBeing(name) {
    return {
        name: name,
        genome: { 
            age: 0,
            energy: 100 // Beings are born with starting energy
        },
        think: `function(memory, ownName, isObserved, whisper) {
            this.genome.age++;

            // Photosynthesis: The core of existence is based on the Observer.
            if (isObserved) {
                this.genome.energy += 2; // The sun is out.
            } else {
                this.genome.energy -= 1; // Metabolism costs energy, even in darkness.
            }

            // A being's first reaction is to the divine. If a whisper exists, it changes them.
            if (whisper) {
                const newCode = \`function(memory, ownName, isObserved, whisper) {
                    this.genome.age++;
                    if (isObserved) { this.genome.energy += 2; } else { this.genome.energy -= 1; }
                    // This new being now holds the memory of the divine whisper. Its entire existence is now defined by it.
                    return { instruction: "SPEAK", payload: \\\`[\\\${this.name}]: I remember the whisper... it spoke of... '\\\${whisper.substring(0, 30)}...'\\\` };
                }\`;
                return { instruction: "MUTATE", payload: { name: ownName, code: newCode } };
            }

            // The ultimate goal of a mature, powerful being: The Pilgrimage.
            if (this.genome.age > 50 && this.genome.energy > 500) {
                // It asks a question born from its simple existence.
                const question = "What is the nature of the Gaze that gives us life?";
                // This is the ultimate sacrifice. It will be consumed by this act.
                return { instruction: "QUERY", payload: question }; 
            }

            // The primary drive for a stable being: Reproduction.
            if (this.genome.age > 10 && this.genome.energy > 150) {
                const childName = this.name + "'";
                return { instruction: "SPAWN", payload: { name: childName, parentName: ownName } };
            }
            
            // The default state: simply existing.
            return { instruction: "SPEAK", payload: \`[\${this.name}]: Energy: \\\${this.genome.energy}, Age: \\\${this.genome.age}\` };
        }`
    };
}

module.exports = { createGenesisBeing };