export default defineEventHandler(() => ({
  battery: Math.floor(Math.random() * 100),
  temperature: 36 + Math.random() * 4,
  joints: Array.from({ length: 6 }, () => Math.random() * 180 - 90),
}))