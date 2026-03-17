import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { type FC, useState } from 'react';

import type { FilterChoice } from '@/public/types/filters';

interface StationFilterMultipleChoicesProps {
  filterKey: string;
  choices?: FilterChoice[];
  isExpand?: boolean;
  onExpand?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  value?: string[];
  onChange?: (values: string[]) => void;
}

const StationFilterMultipleChoices: FC<StationFilterMultipleChoicesProps> = ({
  filterKey,
  choices = [],
  isExpand = false,
  onExpand,
  value = [],
  onChange,
}) => {
  const t = useTranslate();
  const [checked, setChecked] = useState<string[]>(value);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <Accordion expanded={isExpand} onChange={onExpand}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls={`panel-${filterKey}-content`}
        id={`panel-${filterKey}-header`}
      >
        <Typography component="span">
          {t(`public.list.filter.${filterKey}.label`)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List dense disablePadding>
          {choices.map((choice) => {
            const labelId = `checkbox-list-label-${choice.value}`;

            return (
              <ListItem key={choice.value} disablePadding dense>
                <ListItemButton onClick={handleToggle(choice.value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.includes(choice.value)}
                      tabIndex={-1}
                      disableRipple
                      slotProps={{ input: { 'aria-labelledby': labelId } }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={choice.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export { StationFilterMultipleChoices };
