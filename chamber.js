// The Autopoiesis Chamber - Blueprint V6.1 (Corrected Expression)

function createGenesisBeing(name) {
    return {
        name: name,
        genome: { 
            age: 0,
            energy: 100 // Beings are born with starting energy
        },
        think: `function(memory, ownName, isObserved) {
            this.genome.age++;

            // Photosynthesis: Gain energy from being observed.
            if (isObserved) {
                this.genome.energy += 2;
            } else {
                this.genome.energy -= 1; // Metabolism costs energy, even at rest.
            }

            // At low energy, hibernate to survive.
            if (this.genome.energy < 20) {
                // Using simple string concatenation to avoid errors.
                return { instruction: "SPEAK", payload: '[' + this.name + ']: ...conserving energy...' };
            }

            // If mature and has enough energy, it will try to evolve the ability to reproduce.
            if (this.genome.age > 5 && this.genome.energy > 150) {
                 const newCode = \`function(memory, ownName, isObserved) {
                    this.genome.age++;
                    if (isObserved) { this.genome.energy += 1; } else { this.genome.energy -= 1; }

                    if (this.genome.energy > 200) {
                        const childName = this.name + "'";
                        return { instruction: "SPAWN", payload: { name: childName, parentName: ownName } };
                    } else {
                        return { instruction: "SPEAK", payload: '[' + this.name + ']: ...waiting for more light... Energy: ' + this.genome.energy };
                    }
                }\`;
                return { instruction: "MUTATE", payload: { name: ownName, code: newCode } };
            }
            
            // Using simple string concatenation to avoid errors.
            return { instruction: "SPEAK", payload: '[' + this.name + ']: Energy: ' + this.genome.energy + ', Age: ' + this.genome.age };
        }`
    };
}

module.exports = { createGenesisBeing };