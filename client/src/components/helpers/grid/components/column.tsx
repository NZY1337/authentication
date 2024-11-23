import { defaultStyles } from './utils/defaults';
import { getButtonStyles } from './utils/helpers';

export const createColumnImage = ({ enabled = true, url, sx } = {}) => ({
    enabled,
    url,
    sx: { ...defaultStyles.image, ...sx}
});

export const createColumnTitle = ({ enabled = true, text, variant, sx } = {}) => ({
    enabled,
    text: text || 'Title',
    variant: variant || 'h4',
    sx: { ...defaultStyles.title, ...sx }
});

export const createColumnSubtitle = ({ enabled = true, text, variant, sx } = {}) => ({
    enabled,
    text: text || 'Subtitle',
    variant: variant || 'h5',
    sx: { ...defaultStyles.subtitle, ...sx }
}); 

export const createColumnDescription = ({ enabled = true, text, variant, sx } = {}) => ({
    enabled,
    text: text || 'Description',
    variant: variant || 'body1',
    sx: { ...defaultStyles.description, ...sx }
});

export const createColumnButton = ({ 
    enabled = true, 
    text, 
    variant, 
    action, 
    hasIcon, 
    sx, 
    customStyles = {}
 } = {}) => ({
    enabled,
    text: text || 'Button',
    variant: variant || 'outlined',
    action: () => (e) => e ? action(e) : action(),
    hasIcon: hasIcon || { enabled: false, icon: 'AddCircleIcon', position: 'left' },
    sx: { ...defaultStyles.button, ...sx },
    getButtonStyles: () => getButtonStyles(hasIcon, customStyles)
});