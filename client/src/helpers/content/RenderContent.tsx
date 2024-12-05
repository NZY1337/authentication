import { Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MovingIcon from '@mui/icons-material/Moving';

const iconMapping = {
    AddIcon: AddIcon,
    DeleteIcon: DeleteIcon,
    AddCircleIcon: AddCircleIcon,
    MovingIcon: MovingIcon,
};

const actionMapping = {
    openModal: () => console.log('openModal'),
    test: () => console.log('test'),
};

const renderGridContent = ({ column, IconComponent, iconPosition }) => {
    return (
        <>
            {column?.columnImage?.enabled && (
                <img src={column.columnImage.url} alt="hero" style={column.columnImage.sx} />
            )}

            {column?.columnTitle?.enabled && (
                <Typography variant={column.columnTitle.variant} component={column.columnTitle.variant} sx={column.columnTitle.sx}>
                    {column.columnTitle.text}
                </Typography>
            )}
                                                
            {column?.columnSubtitle?.enabled && (
                <Typography variant={column.columnSubtitle.variant} sx={column.columnSubtitle.sx}>
                    {column.columnSubtitle.text}
                </Typography>
            )}
            
            {column?.columnDescription?.enabled && (
                <Typography variant={column.columnDescription.variant} sx={column.columnDescription.sx}>
                    {column.columnDescription.text}
                </Typography>
            )}   
            
            {column?.columnButton?.enabled && (
                <Button
                    onClick={column?.columnButton?.action(actionMapping['test'])}
                    size={column?.columnButton?.size}
                    sx={{
                        ...column.columnButton.sx,
                        ...column.columnButton.hasIcon.getButtonStyles?.(iconPosition),
                    }}
                    variant={column.columnButton.variant}
                >
                    <Typography>{column.columnButton.text}</Typography>
                    {column?.columnButton?.hasIcon?.enabled && IconComponent && (
                        <IconComponent />
                    )}
                </Button>
            )}
        </>
    )
}

const RenderContent = ({ data, gridSpacing }) => {
    return (
        <>
            {data?.grid?.map((item, groupIndex) => {
                if (item.container?.columns?.length > 0) {
                    return (
                        <Grid sx={item.container?.containerSettings.sx} container spacing={gridSpacing} key={groupIndex + 1}>
                            {item.container.columns.map((column, index) => {
                                const IconComponent = column?.columnButton?.hasIcon?.icon ? iconMapping[column.columnButton.hasIcon.icon] : null;
                                const iconPosition = column?.columnButton?.hasIcon; 
                                
                                return (
                                    <Grid size={column.breakPoints} sx={column.columnSettings} key={index}>
                                       {/* <Grid size={12}> */}
                                            {renderGridContent({ column, IconComponent, iconPosition })}
                                        {/* </Grid> */}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    );
                } 
                return null;
            })}
        </>
    );   
}

export default RenderContent;