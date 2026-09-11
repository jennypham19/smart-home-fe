import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';

export interface PasswordCheck {
  key: string;
  label: string;
  valid: boolean;
}

export const getPasswordChecks = (password = ''): PasswordCheck[] => [
  {
    key: 'length',
    label: 'Ít nhất 8 ký tự',
    valid: password.length >= 8,
  },
  {
    key: 'special',
    label: 'Có ít nhất 1 ký tự đặc biệt',
    valid: /[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/~`;']/.test(password),
  },
  {
    key: 'alphanumeric',
    label: 'Bao gồm chữ cái và số',
    valid: /[a-zA-Z]/.test(password) && /\d/.test(password),
  },
];

interface PasswordRequirementsProps {
  password?: string;
}

const PasswordRequirements = ({ password = '' }: PasswordRequirementsProps) => {
  const checks = getPasswordChecks(password);

  return (
    <Stack spacing={0.5} mt={0.5} mb={0.5}>
      {checks.map((check) => (
        <Stack key={check.key} direction="row" spacing={0.75} alignItems="center">
          {check.valid ? (
            <CheckCircle sx={{ fontSize: 16, color: green[600] }} />
          ) : (
            <RadioButtonUnchecked sx={{ fontSize: 16, color: grey[400] }} />
          )}
          <Typography variant="caption" sx={{ color: check.valid ? green[600] : grey[600] }}>
            {check.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default PasswordRequirements;
