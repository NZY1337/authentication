import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddCircleIcon from '@mui/icons-material/AddCircle';

const iconMapping = {
    AddIcon: AddIcon,
    DeleteIcon: DeleteIcon,
    AddCircleIcon: AddCircleIcon,
};

const actionMapping = {
    openModal: () => console.log('openModal'),
    test: () => console.log('test'),
};

const HeroContent = ({ data, classes, gridSpacing }) => {
    return (
        <>
            {data?.grid?.map((item, groupIndex) => {
                if (item.container?.columns?.length > 0) {
                    return (
                        <Grid className={classes.columnParent} sx={item.container?.containerSettings.sx} container spacing={gridSpacing} key={groupIndex + 1}>
                            {item.container.columns.map((column, index) => {
                                const IconComponent = iconMapping[column.columnButton.hasIcon.icon];
                                const iconPosition = column.columnButton.hasIcon; 

                                return (
                                    <Grid size={column.breakPoints} item className={classes.columnChild} sx={column.columnSettings} key={index}>
                                        {column.columnImage.enabled && (
                                            <img src={column.columnImage.url} alt="hero" style={column.columnImage.sx} />
                                        )}

                                        {column.columnTitle.enabled && (
                                            <Typography variant={column.columnTitle.variant} sx={column.columnTitle.sx}>
                                                {column.columnTitle.text}
                                            </Typography>
                                        )}
                                                                            
                                        {column.columnSubtitle.enabled && (
                                            <Typography variant={column.columnSubtitle.variant} sx={column.columnSubtitle.sx}>
                                                {column.columnSubtitle.text}
                                            </Typography>
                                        )}
                                        
                                        {column.columnDescription.enabled && (
                                            <Typography variant={column.columnDescription.variant} sx={column.columnDescription.sx}>
                                                {column.columnDescription.text}
                                            </Typography>
                                        )}   
                                        
                                        {column.columnButton.enabled && (
                                            <Button 
                                                onClick={column?.columnButton?.action(actionMapping['test'])}
                                                size={column.columnButton.size}  
                                                sx={{
                                                    ...column.columnButton.sx,
                                                    ...column.columnButton.getButtonStyles(iconPosition),
                                                }} 
                                                variant={column.columnButton.variant}
                                            >
                                                <Typography>{column.columnButton.text}</Typography>
                                                {column.columnButton.hasIcon.enabled && IconComponent && ( 
                                                    <IconComponent />
                                                )}
                                            </Button>
                                        )}
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

export default HeroContent;