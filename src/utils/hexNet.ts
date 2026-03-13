/* eslint-disable */
class HexNet {
    private particles: { x: number; y: number; z: number; ox: number; oz: number }[] = [];
    private color: string;
    private rows: number = 20;
    private cols: number = 20;
    private spacing: number = 40;

    constructor(color: string) {
        this.color = color;
        this.init();
    }

    private init() {
        this.particles = [];
        // Create a grid of particles centering them roughly
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                // Hexagonal offset
                const xOffset = (r % 2) * (this.spacing / 2);
                const x = c * this.spacing + xOffset - (this.cols * this.spacing) / 2;
                const z = r * (this.spacing * 0.866) - (this.rows * this.spacing * 0.866) / 2; // 0.866 is sin(60)

                this.particles.push({
                    x,
                    y: 0,
                    z,
                    ox: x,
                    oz: z
                });
            }
        }
    }

    public draw = (
        context: CanvasRenderingContext2D,
        width: number,
        height: number,
        time: number
    ): void => {
        // Basic camera settings for simple 3D projection
        const fov = 400;
        const camY = -150; // Camera height
        const camZ = -500; // Camera distance

        // Clear isn't needed here if the parent component clears, but good to have logic ready.
        // Assuming context is cleared by the hook.

        // 1. Update Heights (Wave effect)
        this.particles.forEach((p) => {
            // Multi-layered sine waves for organic movement
            const d = Math.sqrt(p.ox * p.ox + p.oz * p.oz);
            p.y = Math.sin(time + p.ox * 0.01 + p.oz * 0.01) * 20
                + Math.sin(time * 0.5 + d * 0.02) * 15;
        });

        // 2. Project and Draw Lines
        context.strokeStyle = this.color;
        context.lineWidth = 1;

        // Helper to project 3D point to 2D
        const project = (x: number, y: number, z: number) => {
            const scale = fov / (fov + z - camZ);
            const x2d = x * scale + width / 2;
            const y2d = (y - camY) * scale + height / 2;
            return { x: x2d, y: y2d, scale };
        };

        // Draw connections
        // For a hex grid, we connect to neighbors. 
        // Simplified: connect to right neighbor and bottom neighbors

        // We need to map grid indices back to the particle array or just iterate carefully?
        // Easier to iterate by row/col

        // Create a map or just access by index
        const getParticle = (r: number, c: number) => {
            if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return null;
            return this.particles[r * this.cols + c];
        };

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const p = getParticle(r, c);
                if (!p) continue;

                const pProj = project(p.x, p.y, p.z);

                // Only draw if within bounds (roughly)
                if (pProj.scale < 0) continue; // Behind camera

                // Connect Right
                const right = getParticle(r, c + 1);
                if (right) {
                    const rProj = project(right.x, right.y, right.z);
                    if (rProj.scale > 0) {
                        context.beginPath();
                        context.moveTo(pProj.x, pProj.y);
                        context.lineTo(rProj.x, rProj.y);
                        // Fade out based on distance (scale)
                        context.globalAlpha = Math.min(1, pProj.scale * 1.5);
                        context.stroke();
                    }
                }

                // Connect Down-Left and Down-Right (Hexagonal connections)
                // Even rows connect to (r+1, c-1) and (r+1, c)
                // Odd rows connect to (r+1, c) and (r+1, c+1)
                const isEven = r % 2 === 0;
                const downLeft = isEven ? getParticle(r + 1, c - 1) : getParticle(r + 1, c);
                const downRight = isEven ? getParticle(r + 1, c) : getParticle(r + 1, c + 1);

                [downLeft, downRight].forEach(neighbor => {
                    if (neighbor) {
                        const nProj = project(neighbor.x, neighbor.y, neighbor.z);
                        if (nProj.scale > 0) {
                            context.beginPath();
                            context.moveTo(pProj.x, pProj.y);
                            context.lineTo(nProj.x, nProj.y);
                            context.globalAlpha = Math.min(1, pProj.scale * 1.5);
                            context.stroke();
                        }
                    }
                });
            }
        }
        context.globalAlpha = 1; // Reset
    };
}

export default HexNet;
