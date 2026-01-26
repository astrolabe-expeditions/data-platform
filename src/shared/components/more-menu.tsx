import { useState, type MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslate } from '@refinedev/core';


interface MoreMenuItem<C> {
  id: string;
  label: string;
  onClick: (current?: C) => void;
  icon: React.ReactNode;
}

interface MoreMenuProps<C> {
  current?: C;
  items: MoreMenuItem<C>[];
}

const MoreMenu = <C,>({ items, current }: MoreMenuProps<C>) => {
  const t = useTranslate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItem = (item: MoreMenuItem<C>) => {
    item.onClick(current);
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="more-menu-button"
        aria-label={t('shared.buttons.more')}
        aria-controls={open ? 'more-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
      id="more-menu"
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          list: {
            'aria-labelledby': 'more-menu-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem key={item.id} onClick={() => handleItem(item)} disableRipple>
            {item.icon}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export { MoreMenu };
