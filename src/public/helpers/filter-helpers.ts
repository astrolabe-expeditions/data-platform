import type { Filters } from '@/public/types/filters';
import type { StationWithPublicData } from '@/shared/types/models';

const filterStations =
  (filters: Filters) =>
  (station: StationWithPublicData): boolean => {
    if (filters.type.length > 0) {
      if (
        filters.type.length < 2 &&
        ((filters.type.includes('fixed') && station.is_mobile) ||
          (filters.type.includes('mobile') && !station.is_mobile))
      ) {
        return false;
      }
    }
    if (filters.campaign.length > 0) {
      if (
        !filters.campaign.some((campaign) =>
          station.campaign_ids.includes(campaign),
        )
      ) {
        return false;
      }
    }
    if (filters.program.length > 0) {
      if (
        !filters.program.some((program) =>
          station.program_ids.includes(program),
        )
      ) {
        return false;
      }
    }
    return true;
  };

export { filterStations };
