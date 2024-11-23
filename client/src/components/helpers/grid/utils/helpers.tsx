export const getButtonStyles = (hasIcon, customStyles = {}) => ({
    flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
    "& svg": {
        ...(hasIcon.position === 'right' ? { marginLeft: 1 } : { marginRight: 1 }),
    },
    ...customStyles
}),

export const createSlide = ({ columns = [], containerSettings = {} } = {}) => ({
    grid: [
        {
            container: {
                columns,
                containerSettings: {
                    sx: { justifyContent: 'space-between', ...containerSettings.sx },
                },
            },
        },
    ],
});

export const createGrid = ({ slides = [] } = {}) => ({ slides });
