/**
 * Asset utility functions for Cloudflare R2 integration
 */

const R2_BASE_URL = "https://pub-250244d4617c45ce94590c237a6e15b3.r2.dev";

/**
 * Get the full URL for an asset from Cloudflare R2
 * @param filename - The asset filename (e.g., "hero-1.webp")
 * @param folder - The folder name (e.g., "landing", "corporate-images")
 * @returns The full R2 URL
 */
export function getAssetUrl(filename: string, folder: string = "landing"): string {
  return `${R2_BASE_URL}/${folder}/${filename}`;
}

/**
 * Common asset paths for easy reference
 */
export const ASSETS = {
  get logo() { return getAssetUrl("AC.png", "landing"); },
  hero: {
    get hero1() { return getAssetUrl("hero-1.webp", "landing"); },
    get hero2() { return getAssetUrl("hero-2.webp", "landing"); }, 
    get hero3() { return getAssetUrl("hero-3.webp", "landing"); },
    get hero4() { return getAssetUrl("hero-4.webp", "landing"); },
  },
  couples: {
    get couple1() { return getAssetUrl("couple-image-1.webp", "landing"); },
    get couple2() { return getAssetUrl("couple-image-2.webp", "landing"); },
    get couple3() { return getAssetUrl("couple-image-3.webp", "landing"); },
  },
  wedding: {
    get wedding1() { return getAssetUrl("wedding-1.webp", "landing"); },
    get wedding2() { return getAssetUrl("wedding-2.webp", "landing"); },
  },
  stacks: {
    get stack1() { return getAssetUrl("stack-1.webp", "landing"); },
    get stack2() { return getAssetUrl("stack-2.webp", "landing"); },
    get stack3() { return getAssetUrl("stack-3.webp", "landing"); },
    get stack4() { return getAssetUrl("stack-4.webp", "landing"); },
    get stack5() { return getAssetUrl("stack-5.webp", "landing"); },
    get stack6() { return getAssetUrl("stack-6.webp", "landing"); },
  },
  events: {
    get feature1() { return getAssetUrl("feature-events-1.webp", "landing"); },
    get feature2() { return getAssetUrl("feature-events-2.webp", "landing"); },
    get feature3() { return getAssetUrl("feature-events-3.webp", "landing"); },
    get feature4() { return getAssetUrl("feature-events-4.webp", "landing"); },
  },
  other: {
    get proposalEvent() { return getAssetUrl("proposal-event.webp", "landing"); },
    get placeholder() { return getAssetUrl("placeholder.svg", "landing"); },
  },
  corporate: {
    get hero() { return getAssetUrl("Hero.webp", "corporate-images"); },
    get businessDinners() { return getAssetUrl("Business-Dinners.webp", "corporate-images"); },
    get corporateParties() { return getAssetUrl("Corporate-Parties.webp", "corporate-images"); },
    get corporateDecor() { return getAssetUrl("Corporate-event-decor.webp", "corporate-images"); },
    get gourmetBuffet() { return getAssetUrl("Gourmet-buffet-counters.webp", "corporate-images"); },
    get guestsServed() { return getAssetUrl("Guests-being-served.webp", "corporate-images"); },
    get logoMocktail() { return getAssetUrl("Logo-branded-mocktail.webp", "corporate-images"); },
    get seminars() { return getAssetUrl("Seminars.webp", "corporate-images"); },
    get staffServing() { return getAssetUrl("staff-serving.webp", "corporate-images"); },
    get teamBuilding() { return getAssetUrl("Team-Building.webp", "corporate-images"); },
    get networking() { return getAssetUrl("guests-networking.webp", "corporate-images"); },
    get additional() { return getAssetUrl("image_2025-07-21_215024381.webp", "corporate-images"); },
  },
  weddingPlanning: {
    get hero() { return getAssetUrl("Hero.webp", "wedding"); },
    get mehendi() { return getAssetUrl("Mehendi.webp", "wedding"); },
    get haldi() { return getAssetUrl("Haldi.webp", "wedding"); },
    get ganeshPooja() { return getAssetUrl("ganesh-pooja.webp", "wedding"); },
    get varmala() { return getAssetUrl("Varmala.webp", "wedding"); },
    get pheraa() { return getAssetUrl("Pheraa.webp", "wedding"); },
    get mangalsutra() { return getAssetUrl("Mangalsutra.webp", "wedding"); },
    get vidaai() { return getAssetUrl("Vidaai.webp", "wedding"); },
    get gallery1() { return getAssetUrl("image_2025-07-23_00-10-09.webp", "wedding"); },
    get gallery2() { return getAssetUrl("image_2025-07-23_000512176.webp", "wedding"); },
    get gallery3() { return getAssetUrl("image_2025-07-23_000619429.webp", "wedding"); },
    get gallery4() { return getAssetUrl("image_2025-07-23_000812520.webp", "wedding"); },
    get gallery5() { return getAssetUrl("image_2025-07-23_001226867.webp", "wedding"); },
    get gallery6() { return getAssetUrl("image_2025-07-23_001310632.webp", "wedding"); },
  }
};
