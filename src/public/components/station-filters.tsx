import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useList, useTranslate } from '@refinedev/core';
import { type FC, useState } from 'react';

import { StationFilterMultipleChoices } from '@/public/components/station-filter-multiple-choices';
import type { Filters } from '@/public/types/filters';
import type { Campaign, Program } from '@/shared/types/models';

type StationFiltersProps = {
  onApply: (filters: Filters) => void;
};

const defaultFilters: Filters = {
  type: [],
  program: [],
  campaign: [],
};

const StationFilters: FC<StationFiltersProps> = ({ onApply }) => {
  const t = useTranslate();
  const [isModalOpen, setModalOpened] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const handleOpen = () => {
    setModalOpened(true);
  };

  const handleClose = () => {
    setModalOpened(false);
  };

  const handleExpand =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChange = (filterKey: string) => (values: string[]) => {
    setFilters((prev) => {
      return {
        ...prev,
        [filterKey]: values,
      };
    });
  };

  const handleClearAll = () => {
    setFilters(defaultFilters);
    handleClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply(filters);
    handleClose();
  };

  const typeChoices = [
    { label: t('public.list.filter.type.options.fixed'), value: 'fixed' },
    { label: t('public.list.filter.type.options.mobile'), value: 'mobile' },
  ];

  const {
    result: { data: programs },
  } = useList<Program>({
    resource: 'programs',
    pagination: {
      pageSize: 20,
    },
  });

  const programChoices = programs
    ? programs.map((program) => ({
        label: program.name,
        value: program.id,
      }))
    : [];

  const {
    result: { data: campaigns },
  } = useList<Campaign>({
    resource: 'campaigns',
    pagination: {
      pageSize: 20,
    },
  });

  const campaignChoices = campaigns
    ? campaigns.map((campaign) => ({
        label: campaign.name,
        value: campaign.id,
      }))
    : [];

  const filtersCount = Object.values(filters).reduce(
    (count, filterValues) => count + filterValues.length,
    0,
  );

  const buttonLabelKey =
    filtersCount === 0
      ? 'public.list.filter.open.other'
      : filtersCount === 1
        ? 'public.list.filter.open.one'
        : 'public.list.filter.open.few';

  return (
    <Box>
      <Button
        startIcon={<TuneIcon />}
        variant="contained"
        color="secondary"
        onClick={handleOpen}
      >
        {t(buttonLabelKey, { count: filtersCount })}
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        fullWidth
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle>{t('public.list.filter.title')}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <StationFilterMultipleChoices
            filterKey="type"
            choices={typeChoices}
            isExpand={expanded === 'type'}
            onExpand={handleExpand('type')}
            value={filters.type}
            onChange={handleChange('type')}
          />
          {programChoices.length > 0 ? (
            <StationFilterMultipleChoices
              filterKey="program"
              choices={programChoices}
              isExpand={expanded === 'program'}
              onExpand={handleExpand('program')}
              value={filters.program}
              onChange={handleChange('program')}
            />
          ) : null}
          {campaignChoices.length > 0 ? (
            <StationFilterMultipleChoices
              filterKey="campaign"
              choices={campaignChoices}
              isExpand={expanded === 'campaign'}
              onExpand={handleExpand('campaign')}
              value={filters.campaign}
              onChange={handleChange('campaign')}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearAll} disabled={filtersCount === 0}>
            {t('public.list.filter.clearAll')}
          </Button>
          <Button type="submit" color="secondary">
            {t('public.list.filter.apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export { StationFilters };
