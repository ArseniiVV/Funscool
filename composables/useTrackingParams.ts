const STORAGE_KEY = 'funscool-tracking-params';
const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'yclid',
] as const;

export type TrackingKey = (typeof TRACKING_KEYS)[number];
export type TrackingParams = Partial<Record<TrackingKey, string>>;

const isClient = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const trimValue = (value?: string | null) => (typeof value === 'string' ? value.trim() : '');

const buildFromSearch = (source: URLSearchParams): TrackingParams => {
  return TRACKING_KEYS.reduce<TrackingParams>((acc, key) => {
    const value = trimValue(source.get(key));
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const filterStored = (value: Record<string, unknown>): TrackingParams => {
  return TRACKING_KEYS.reduce<TrackingParams>((acc, key) => {
    const stored = value[key];
    if (typeof stored === 'string') {
      const trimmed = stored.trim();
      if (trimmed) {
        acc[key] = trimmed;
      }
    }
    return acc;
  }, {});
};

const readStorage = (): TrackingParams => {
  if (!isClient()) return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return filterStored(parsed as Record<string, unknown>);
  } catch (error) {
    console.warn('Failed to parse stored tracking params', error);
    return {};
  }
};

const writeStorage = (payload: TrackingParams) => {
  if (!isClient()) return;
  const filtered = filterStored(payload as Record<string, unknown>);
  if (!Object.keys(filtered).length) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

const mergeParams = (base: TrackingParams, addition: TrackingParams) => {
  return TRACKING_KEYS.reduce<TrackingParams>((acc, key) => {
    const next = addition[key] ?? base[key];
    if (next) {
      acc[key] = next;
    }
    return acc;
  }, {});
};

export const persistTrackingParams = (search?: string | URLSearchParams): TrackingParams | void => {
  if (!isClient()) return;
  const params =
    typeof search === 'string'
      ? new URLSearchParams(search)
      : search ?? new URLSearchParams(window.location.search);
  const collected = buildFromSearch(params);
  if (!Object.keys(collected).length) {
    return readStorage();
  }
  const merged = mergeParams(readStorage(), collected);
  writeStorage(merged);
  return merged;
};

export const getTrackingParams = (): TrackingParams => {
  return readStorage();
};
