export const SERVICE_REGIONS = [
  { value: '명지대', label: '명지대 일대' },
  { value: '홍대', label: '홍대 일대' },
] as const;

export type ServiceRegion = (typeof SERVICE_REGIONS)[number]['value'];

export const DEFAULT_SERVICE_REGION: ServiceRegion = '명지대';

export const getServiceRegion = (value: string | null): ServiceRegion =>
  SERVICE_REGIONS.find((region) => region.value === value)?.value ?? DEFAULT_SERVICE_REGION;
