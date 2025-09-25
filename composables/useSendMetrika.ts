export default function useSendMetrika(goal: string): void {
  const { $yaMetrika } = useNuxtApp();
  if (typeof $yaMetrika !== 'function' || !goal) return;
  $yaMetrika(goal);
}
