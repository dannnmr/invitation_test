/**
 * Placeholder visual para la foto del hero durante desarrollo.
 * Reemplazar con <Image> real cuando el cliente entregue la foto.
 *
 * Para activarlo: en HeroSection, cambiar photoUrl por "/images/hero.jpg"
 * y colocar la foto real en public/images/hero.jpg
 */
export function PhotoPlaceholder({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(
            ellipse at 60% 40%,
            #2A0F35 0%,
            #120A1A 40%,
            #0A0005 100%
          )
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 20vw, 14rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--color-gold)',
          opacity: 0.06,
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}
      >
        {name.charAt(0)}
      </span>
    </div>
  );
}
