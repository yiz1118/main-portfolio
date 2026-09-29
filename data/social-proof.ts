export interface Testimonial { quote: string; name: string; context: string; }
export interface ClientLogo { name: string; src: string; width: number; height: number; }
/** Populate only with real, approved statements and authorized client logos. */
export const testimonials: Testimonial[] = [];
export const clientLogos: ClientLogo[] = [];
