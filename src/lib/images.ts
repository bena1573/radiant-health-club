const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;

export const images = {
  heroPoster: u("photo-1540497077202-7c8a3999166f"),
  intro: u("photo-1544161515-4ab6ce6db874"),
  gym: u("photo-1534438327276-14e5300c3a48"),
  pool: u("photo-1576013551627-0cc20b96c2a7"),
  studio: u("photo-1544367567-0f2fcb009e0b"),
  steam: u("photo-1519823551278-64ac92734fb1"),
  spaLarge: u("photo-1540555700478-4be289fbecef"),
  spaSmall: u("photo-1544161515-4ab6ce6db874"),
  closing: u("photo-1571019613454-1cb2f99b2d8b"),
} as const;

export const BLUR_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Crect width='8' height='5' fill='%232b2822'/%3E%3C/svg%3E";

export const moreImages = {
  lockers: u("photo-1584622650111-993a426fbf0a"),
  weights: u("photo-1517836357463-d25dfeac3438"),
  cardio: u("photo-1558611848-73f7eb4001a1"),
  coach: u("photo-1571019614242-c5c5dee9f50b"),
  lounge: u("photo-1600334089648-b0d9d3028eb2"),
} as const;