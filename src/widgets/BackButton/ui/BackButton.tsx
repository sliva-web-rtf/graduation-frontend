import { BaseButton } from 'shared/ui/Button/Button';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useNavigate } from 'react-router-dom';
import { memo, ReactNode, useCallback } from 'react';

interface BackButtonProps {
  readonly to: string;
  readonly children: ReactNode,
}

export const BackButton = memo((props: BackButtonProps) => {
  const { to, children } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => navigate(to), [navigate, to]);

  return (
    <BaseButton
      variant="shadowed"
      sx={{ alignSelf: 'flex-start' }}
      startIcon={<KeyboardBackspaceRoundedIcon />}
      onClick={handleClick}
    >
      {children}
    </BaseButton>
  );
});
