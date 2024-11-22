export const getButtonStyles = (hasIcon) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
    "& svg": {
        ...(hasIcon.position === 'right' ? { marginLeft: 1 } : { marginRight: 1 }),
    },
}),