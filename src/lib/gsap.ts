import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Solo registrar plugins en el cliente
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Configuración global de GSAP
gsap.config({
  nullTargetWarn: false,  // Silencia warnings de targets nulos
});

// Defaults globales para todas las animaciones
gsap.defaults({
  ease: 'expo.out',
  duration: 0.8,
});

export { gsap, ScrollTrigger, TextPlugin };
