import { SvgIconComponent } from '@mui/icons-material';
import { TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

type Props<T extends FieldValues> = {
  helperText?: ReactNode;
  hasError?: boolean;
  textFieldProps?: TextFieldProps;
  controllerProps: Omit<ControllerProps<T>, 'render'>;
  prefixIcon?: SvgIconComponent;
  margin?: any
  sx?: SxProps<Theme>;
};

export default function ControllerTextField<T extends FieldValues>({
  helperText,
  hasError,
  textFieldProps,
  controllerProps,
  prefixIcon: PrefixIcon,
  margin='normal',
  sx
}: Props<T>) {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          inputRef={ref}
          fullWidth
          margin={margin}
          error={!!hasError}
          helperText={helperText}
          {...textFieldProps}
          slotProps={{
            input: {
              size: 'medium',
              startAdornment: PrefixIcon ? <PrefixIcon color='action' sx={{ mr: 1 }} /> : null,
              ...textFieldProps?.slotProps?.input,
            },
          }}
          InputProps={{
            sx: sx
          }}
        />
      )}
    />
  );
}
