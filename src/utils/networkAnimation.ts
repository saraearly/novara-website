export class NetworkAnimation {
  private particles: { x: number; y: number; vx: number; vy: number }[] = [];

  private color: string;

  private particleCount: number;

  private connectionDistance: number;

  private speed: number;

  constructor(
    color: string = "rgba(123, 47, 247, 0.6)",
    particleCount: number = 60,
    connectionDistance: number = 150,
    speed: number = 1.5
  ) {
    this.color = color;
    this.particleCount = particleCount;
    this.connectionDistance = connectionDistance;
    this.speed = speed;
  }

  public init(width: number, height: number) {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i += 1) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed,
      });
    }
  }

  public draw = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ): void => {
    // Update positions
    const updatedParticles = this.particles.map((p) => {
      const newX = p.x + p.vx;
      const newY = p.y + p.vy;
      let newVx = p.vx;
      let newVy = p.vy;

      // Bounce off walls
      if (newX < 0 || newX > width) newVx *= -1;
      if (newY < 0 || newY > height) newVy *= -1;

      return {
        ...p,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
      };
    });

    this.particles = updatedParticles;

    // Draw particle
    this.particles.forEach((p) => {
      context.beginPath();
      context.arc(p.x, p.y, 2, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
    });

    // Draw connections
    for (let i = 0; i < this.particles.length; i += 1) {
      for (let j = i + 1; j < this.particles.length; j += 1) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        if (p1 && p2) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.connectionDistance) {
            // Opacity decreases as distance increases
            const opacity = 1 - distance / this.connectionDistance;

            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);

            context.globalAlpha = opacity;
            context.strokeStyle = this.color;
            context.lineWidth = 1;
            context.stroke();
            context.globalAlpha = 1.0; // reset
          }
        }
      }
    }
  };
}
