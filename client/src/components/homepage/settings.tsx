const settings1 = {
    grid: [
        // first container
        {
            container: {
                columns: [
                    {   
                        columnImage: {
                            enabled: true,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'Hi,',
                            variant: 'h3',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: true,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: true,
                            text: 'DISCOVER',
                            variant: 'outlined',
                            action: (action) => (e) => e ? action(e) : action(),
                            hasIcon: {
                                enabled: true,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: 'orange',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
                            borderRadius: 2,
                            p: 2,
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                    {   
                        columnImage: {
                            enabled: false,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'The process',
                            variant: 'h3',
                            sx: {
                                color: 'lightgray',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                mt: 1,
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: true,
                            action: (action) => (e) => e ? action(e) : action(),
                            text: 'Read More',
                            variant: 'outlined',
                            hasIcon: {
                                enabled: false,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: 'orange',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            background: ``,
                            borderRadius: 2,
                            alignSelf: 'center',
                            // p: 2,
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        justifyContent: 'space-between',
                        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
                    },
                    content: {
                        video: '',
                        image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
                    }
                },
            },
        },
        {
            container: {
                columns: [
                    {   
                        columnImage: {
                            enabled: false,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: false,
                            text: 'The process',
                            variant: 'h3',
                            sx: {
                                color: 'lightgray',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                mt: 1,
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'large',
                            enabled: false,
                            action: (action) => (e) => e ? action(e) : action(),
                            text: 'Discover',
                            variant: 'outlined',
                            hasIcon: {
                                enabled: true,
                                icon: 'MovingIcon',
                                position: 'right'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: '#fff',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row' : 'row-reverse',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { ml: 1 } : { mr: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            borderRadius: 2,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 4
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        justifyContent: 'center',
                    },
                    content: {
                        video: '',
                        image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
                    }
                },
            },
        },
    ],
};

const settings2 = {
    grid: [
        // first container
        {
            container: {
                columns: [
                    {   
                        columnImage: {
                            enabled: true,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'Hi,',
                            variant: 'h3',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: true,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: true,
                            text: 'DISCOVER',
                            variant: 'outlined',
                            action: (action) => (e) => e ? action(e) : action(),
                            hasIcon: {
                                enabled: true,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: 'orange',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
                            borderRadius: 2,
                            p: 2,
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                    {   
                        columnImage: {
                            enabled: false,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'The process',
                            variant: 'h3',
                            sx: {
                                color: 'lightgray',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                mt: 1,
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: true,
                            action: (action) => (e) => e ? action(e) : action(),
                            text: 'Read More',
                            variant: 'outlined',
                            hasIcon: {
                                enabled: false,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: 'orange',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            background: ``,
                            borderRadius: 2,
                            alignSelf: 'center',
                            // p: 2,
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        justifyContent: 'space-between',
                    },
                    content: {
                        video: '',
                        image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/27908566/pexels-photo-27908566/free-photo-of-a-blurry-photo-of-a-flower-shop-with-a-man-on-a-bike.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
                    }
                },
            },
        },
    ],
};

const settings3 = {
    grid: [
        // first container
        {
            container: {
                columns: [
                    {   
                        columnImage: {
                            enabled: true,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'Hi,',
                            variant: 'h3',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: true,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: true,
                            text: 'DISCOVER',
                            variant: 'outlined',
                            action: (action) => (e) => e ? action(e) : action(),
                            hasIcon: {
                                enabled: true,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: 'orange',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
                            borderRadius: 2,
                            p: 2,
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                    {   
                        columnImage: {
                            enabled: false,
                            url: 'https://images.pexels.com/photos/17849711/pexels-photo-17849711/free-photo-of-fog-in-deep-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                            sx: {
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            }
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'The process',
                            variant: 'h3',
                            sx: {
                                color: 'lightgray',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                mt: 1,
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: true,
                            action: (action) => (e) => e ? action(e) : action(),
                            text: 'Read More',
                            variant: 'outlined',
                            hasIcon: {
                                enabled: false,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                backgroundColor: 'black',
                                color: 'orange',
                                borderColor: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    opacity: '.8'
                                },
                            },
                            getButtonStyles: (hasIcon) => ({
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
                                "& svg": {
                                    ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
                                }
                            }),
                        },
                        columnSettings: {
                            background: ``,
                            borderRadius: 2,
                            alignSelf: 'center',
                            // p: 2,
                        },
                        breakPoints: {
                            md: 5, 
                            lg: 5
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        justifyContent: 'space-between',
                    },
                    content: {
                        video: '',
                        image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/17849711/pexels-photo-17849711/free-photo-of-fog-in-deep-forest.jpeg)`
                    }
                },
            },
        },
    ],
};

export { settings1, settings2, settings3 };
