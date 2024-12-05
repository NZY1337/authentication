import { SxProps } from '@mui/system';
import { CSSProperties } from 'react';

// utils/factories.ts
interface ColumnImage {
    enabled: boolean;
    url: string;
    sx: SxProps;
}

interface ColumnText {
    enabled: boolean;
    text: string;
    variant: string;
    sx: SxProps;
}

interface ColumnButton {
    enabled: boolean;
    text: string;
    variant: string;
    size?: string;
    sx?: SxProps;
    action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: string;
    hasIcon?: {
        enabled: boolean;
        icon: string;
        position: string;
    };
}

interface ColumnSettings {
    [key: string]: unknown;
}

interface BreakPoints {
    md: number;
    lg: number;
}

interface Column {
    columnImage?: ColumnImage;
    columnTitle: ColumnText;
    columnSubtitle: ColumnText;
    columnDescription: ColumnText;
    columnButton?: ColumnButton;
    columnSettings: ColumnSettings;
    breakPoints: BreakPoints;
}

interface ButtonConfigProps {
    text: string;
    variant: "contained" | "outlined";
    action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon?: string;
    sx?: SxProps;
    enabled: boolean;
    getButtonStyles?: (hasIcon: { enabled: boolean; icon: string; position: string }) => SxProps;
    hasIcon?: { 
        enabled: boolean; 
        icon: string; 
        position: string ;
        getStyle?: (hasIcon: { enabled: boolean; icon: string; position: 'left' | 'right' }) => SxProps;
    };
    size?: "small" | "medium" | "large";
}

type SetIconStylesProps = {
    hasIcon: { enabled: boolean; position: 'left' | 'right' };
    svgProps: SxProps;
};

const theme = {
    colors: {
        primary: 'orange',
        secondary: 'lightgray',
        background: 'black',
        border: 'tomato',
    },
    typography: {
        h1: { fontSize: '2rem', fontWeight: 700 },
        h3: { fontSize: '1.5rem', fontWeight: 600 },
        body1: { fontSize: '1rem' },
    },
    spacing: (factor) => `${factor * 8}px`,
};

const createColumn = ({ columnImage, columnTitle, columnSubtitle, columnDescription, columnButton, columnSettings, breakPoints }: Column) => ({ 
    columnImage, columnTitle, columnSubtitle, columnDescription, columnButton, columnSettings, breakPoints 
});


const createButton = ({text, variant, action, icon, sx, enabled, getButtonStyles, hasIcon, size }: ButtonConfigProps): ButtonConfigProps => ({ 
    enabled, text, variant, action, icon, sx, getButtonStyles, hasIcon, size 
});

const setIconStyles = ({ hasIcon: { enabled, position }, svgProps }: SetIconStylesProps) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: position === 'right' ? 'row-reverse' : 'row',
    '& svg': {
        ...svgProps,
        ...(enabled && { [position === 'right' ? 'marginRight' : 'marginLeft']: 1 }),
    },
});

export { createColumn, createButton, theme, setIconStyles }
