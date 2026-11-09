import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import serviceArea from '../assets/local-area.png'
import { SERVICE_REGIONS, type ServiceRegion } from '../constants/serviceArea';

type ServiceAreaProps = {
  region: ServiceRegion;
  onRegionChange: (region: ServiceRegion) => void;
};

export const ServiceArea = ({ region, onRegionChange }: ServiceAreaProps) => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const selectedRegion = SERVICE_REGIONS.find((option) => option.value === region);

  return (
    <details ref={dropdownRef} className="relative">
      <summary className="flex h-8 cursor-pointer list-none items-center gap-1 rounded-full bg-workspot-blue-200 py-0 pl-2 pr-3 marker:hidden">
        <img src={serviceArea} alt="" className="mx-0.5 h-6 w-6 workspot-blue-600" />
        <span className="text-small text-workspot-blue-600">{selectedRegion?.label}</span>
        <ChevronDown aria-hidden="true" className="h-4 w-4 text-workspot-blue-600" />
      </summary>
      <div
        role="group"
        aria-label="서비스 지역 선택"
        className="absolute right-0 top-full z-50 mt-2 min-w-max overflow-hidden rounded-xl border border-workspot-gray-200 bg-white p-1 shadow-lg"
      >
        {SERVICE_REGIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === region}
            onClick={() => {
              onRegionChange(option.value);
              if (dropdownRef.current) dropdownRef.current.open = false;
            }}
            className={`block w-full rounded-lg px-4 py-2 text-left text-small ${
              option.value === region
                ? 'bg-workspot-blue-200 text-workspot-blue-600'
                : 'text-workspot-gray-900 hover:bg-workspot-gray-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  )
}