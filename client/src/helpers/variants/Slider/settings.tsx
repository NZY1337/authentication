// const settings1 = {
//     grid: [
//         // first container
//         {
//             container: {
//                 columns: [
//                     {   
//                         columnImage: {
//                             enabled: true,
//                             url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                             sx: {
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '5px'
//                             }
//                         },
//                         columnTitle: {
//                             enabled: true,
//                             text: 'Hi,',
//                             variant: 'h3',
//                             sx: {
//                                 color: 'orange',
//                                 pt: 3
//                             }
//                         },
//                         columnSubtitle: {
//                             enabled: true,
//                             text: 'We are Swift Fuel.',
//                             variant: 'h5',
//                             sx: {
//                                 pt: 3,
//                                 color: 'lightgray',
//                             }
//                         },
//                         columnDescription: {
//                             enabled: true,
//                             text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
//                             variant: 'body1',
//                             sx: {
//                                 color: 'lightgray',
//                                 '&:hover': {}
//                             }
//                         },
//                         columnButton: {
//                             size:'small',
//                             enabled: true,
//                             text: 'DISCOVER',
//                             variant: 'outlined',
//                             action: (action) => (e) => e ? action(e) : action(),
//                             hasIcon: {
//                                 enabled: true,
//                                 icon: 'AddCircleIcon',
//                                 position: 'left'
//                             },
//                             sx: {
//                                 mt: 2,
//                                 backgroundColor: 'black',
//                                 color: 'orange',
//                                 borderColor: 'black',
//                                 fontWeight: 'bold',
//                                 '&:hover': {
//                                     color: 'orange',
//                                     borderColor: 'black',
//                                     opacity: '.8'
//                                 },
//                             },
//                             getButtonStyles: (hasIcon) => ({
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
//                                 "& svg": {
//                                     ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
//                                 }
//                             }),
//                         },
//                         columnSettings: {
//                             background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
//                             borderRadius: 2,
//                             p: 2,
//                         },
//                         breakPoints: {
//                             md: 5, 
//                             lg: 5
//                         }
//                     },
//                     {   
//                         columnImage: {
//                             enabled: false,
//                             url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                             sx: {
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '5px'
//                             }
//                         },
//                         columnTitle: {
//                             enabled: true,
//                             text: 'The process',
//                             variant: 'h3',
//                             sx: {
//                                 color: 'lightgray',
//                                 pt: 3
//                             }
//                         },
//                         columnSubtitle: {
//                             enabled: false,
//                             text: 'We are Swift Fuel.',
//                             variant: 'h5',
//                             sx: {
//                                 color: 'lightgray',
//                             }
//                         },
//                         columnDescription: {
//                             enabled: true,
//                             text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
//                             variant: 'body1',
//                             sx: {
//                                 color: 'lightgray',
//                                 mt: 1,
//                                 '&:hover': {}
//                             }
//                         },
//                         columnButton: {
//                             size:'small',
//                             enabled: true,
//                             action: (action) => (e) => e ? action(e) : action(),
//                             text: 'Read More',
//                             variant: 'outlined',
//                             hasIcon: {
//                                 enabled: false,
//                                 icon: 'AddCircleIcon',
//                                 position: 'left'
//                             },
//                             sx: {
//                                 mt: 2,
//                                 backgroundColor: 'black',
//                                 color: 'orange',
//                                 borderColor: 'black',
//                                 fontWeight: 'bold',
//                                 '&:hover': {
//                                     color: 'orange',
//                                     borderColor: 'black',
//                                     opacity: '.8'
//                                 },
//                             },
//                             getButtonStyles: (hasIcon) => ({
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
//                                 "& svg": {
//                                     ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
//                                 }
//                             }),
//                         },
//                         columnSettings: {
//                             background: ``,
//                             borderRadius: 2,
//                             alignSelf: 'center',
//                             // p: 2,
//                         },
//                         breakPoints: {
//                             md: 5, 
//                             lg: 5
//                         }
//                     },
//                 ],
//                 containerSettings: {
//                     sx: {
//                         justifyContent: 'space-between',
//                     },
//                     content: {
//                         video: '',
//                         image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`
//                     }
//                 },
//             },
//         },
//     ],
// };

// const settings2 = {
//     grid: [
//         // first container
//         {
//             container: {
//                 columns: [
//                     {   
//                         columnImage: {
//                             enabled: true,
//                             url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                             sx: {
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '5px'
//                             }
//                         },
//                         columnTitle: {
//                             enabled: true,
//                             text: 'Hi,',
//                             variant: 'h3',
//                             sx: {
//                                 color: 'orange',
//                                 pt: 3
//                             }
//                         },
//                         columnSubtitle: {
//                             enabled: true,
//                             text: 'We are Swift Fuel.',
//                             variant: 'h5',
//                             sx: {
//                                 pt: 3,
//                                 color: 'lightgray',
//                             }
//                         },
//                         columnDescription: {
//                             enabled: true,
//                             text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
//                             variant: 'body1',
//                             sx: {
//                                 color: 'lightgray',
//                                 '&:hover': {}
//                             }
//                         },
//                         columnButton: {
//                             size:'small',
//                             enabled: true,
//                             text: 'DISCOVER',
//                             variant: 'outlined',
//                             action: (action) => (e) => e ? action(e) : action(),
//                             hasIcon: {
//                                 enabled: true,
//                                 icon: 'AddCircleIcon',
//                                 position: 'left'
//                             },
//                             sx: {
//                                 mt: 2,
//                                 backgroundColor: 'black',
//                                 color: 'orange',
//                                 borderColor: 'black',
//                                 fontWeight: 'bold',
//                                 '&:hover': {
//                                     color: 'orange',
//                                     borderColor: 'black',
//                                     opacity: '.8'
//                                 },
//                             },
//                             getButtonStyles: (hasIcon) => ({
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
//                                 "& svg": {
//                                     ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
//                                 }
//                             }),
//                         },
//                         columnSettings: {
//                             background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
//                             borderRadius: 2,
//                             p: 2,
//                         },
//                         breakPoints: {
//                             md: 5, 
//                             lg: 5
//                         }
//                     },
//                     {   
//                         columnImage: {
//                             enabled: false,
//                             url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                             sx: {
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '5px'
//                             }
//                         },
//                         columnTitle: {
//                             enabled: true,
//                             text: 'The process',
//                             variant: 'h3',
//                             sx: {
//                                 color: 'lightgray',
//                                 pt: 3
//                             }
//                         },
//                         columnSubtitle: {
//                             enabled: false,
//                             text: 'We are Swift Fuel.',
//                             variant: 'h5',
//                             sx: {
//                                 color: 'lightgray',
//                             }
//                         },
//                         columnDescription: {
//                             enabled: true,
//                             text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
//                             variant: 'body1',
//                             sx: {
//                                 color: 'lightgray',
//                                 mt: 1,
//                                 '&:hover': {}
//                             }
//                         },
//                         columnButton: {
//                             size:'small',
//                             enabled: true,
//                             action: (action) => (e) => e ? action(e) : action(),
//                             text: 'Read More',
//                             variant: 'outlined',
//                             hasIcon: {
//                                 enabled: false,
//                                 icon: 'AddCircleIcon',
//                                 position: 'left'
//                             },
//                             sx: {
//                                 mt: 2,
//                                 backgroundColor: 'black',
//                                 color: 'orange',
//                                 borderColor: 'black',
//                                 fontWeight: 'bold',
//                                 '&:hover': {
//                                     color: 'orange',
//                                     borderColor: 'black',
//                                     opacity: '.8'
//                                 },
//                             },
//                             getButtonStyles: (hasIcon) => ({
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
//                                 "& svg": {
//                                     ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
//                                 }
//                             }),
//                         },
//                         columnSettings: {
//                             background: ``,
//                             borderRadius: 2,
//                             alignSelf: 'center',
//                             // p: 2,
//                         },
//                         breakPoints: {
//                             md: 5, 
//                             lg: 5
//                         }
//                     },
//                 ],
//                 containerSettings: {
//                     sx: {
//                         justifyContent: 'space-between',
//                     },
//                     content: {
//                         video: '',
//                         image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.pexels.com/photos/29216715/pexels-photo-29216715/free-photo-of-vintage-bicycles-against-rustic-brick-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`
//                     }
//                 },
//             },
//         },
//     ],
// };

// const settings3 = {
//     grid: [
//         // first container
//         {
//             container: {
//                 columns: [
//                     {   
//                         columnImage: {
//                             enabled: true,
//                             url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//                             sx: {
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '5px'
//                             }
//                         },
//                         columnTitle: {
//                             enabled: true,
//                             text: 'Hi,',
//                             variant: 'h3',
//                             sx: {
//                                 color: 'orange',
//                                 pt: 3
//                             }
//                         },
//                         columnSubtitle: {
//                             enabled: true,
//                             text: 'We are Swift Fuel.',
//                             variant: 'h5',
//                             sx: {
//                                 pt: 3,
//                                 color: 'lightgray',
//                             }
//                         },
//                         columnDescription: {
//                             enabled: true,
//                             text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
//                             variant: 'body1',
//                             sx: {
//                                 color: 'lightgray',
//                                 '&:hover': {}
//                             }
//                         },
//                         columnButton: {
//                             size:'small',
//                             enabled: true,
//                             text: 'DISCOVER',
//                             variant: 'outlined',
//                             action: (action) => (e) => e ? action(e) : action(),
//                             hasIcon: {
//                                 enabled: true,
//                                 icon: 'AddCircleIcon',
//                                 position: 'left'
//                             },
//                             sx: {
//                                 mt: 2,
//                                 backgroundColor: 'black',
//                                 color: 'orange',
//                                 borderColor: 'black',
//                                 fontWeight: 'bold',
//                                 '&:hover': {
//                                     color: 'orange',
//                                     borderColor: 'black',
//                                     opacity: '.8'
//                                 },
//                             },
//                             getButtonStyles: (hasIcon) => ({
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
//                                 "& svg": {
//                                     ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
//                                 }
//                             }),
//                         },
//                         columnSettings: {
//                             background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
//                             borderRadius: 2,
//                             p: 2,
//                         },
//                         breakPoints: {
//                             md: 5, 
//                             lg: 5
//                         }
//                     },
//                     {   
//                         columnImage: {
//                             enabled: false,
//                             url: 'https://images.pexels.com/photos/17849711/pexels-photo-17849711/free-photo-of-fog-in-deep-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//                             sx: {
//                                 width: '100%',
//                                 height: '200px',
//                                 objectFit: 'cover',
//                                 borderRadius: '5px'
//                             }
//                         },
//                         columnTitle: {
//                             enabled: true,
//                             text: 'The process',
//                             variant: 'h3',
//                             sx: {
//                                 color: 'lightgray',
//                                 pt: 3
//                             }
//                         },
//                         columnSubtitle: {
//                             enabled: false,
//                             text: 'We are Swift Fuel.',
//                             variant: 'h5',
//                             sx: {
//                                 color: 'lightgray',
//                             }
//                         },
//                         columnDescription: {
//                             enabled: true,
//                             text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint lorem ipsum dolor sit amet',
//                             variant: 'body1',
//                             sx: {
//                                 color: 'lightgray',
//                                 mt: 1,
//                                 '&:hover': {}
//                             }
//                         },
//                         columnButton: {
//                             size:'small',
//                             enabled: true,
//                             action: (action) => (e) => e ? action(e) : action(),
//                             text: 'Read More',
//                             variant: 'outlined',
//                             hasIcon: {
//                                 enabled: false,
//                                 icon: 'AddCircleIcon',
//                                 position: 'left'
//                             },
//                             sx: {
//                                 mt: 2,
//                                 backgroundColor: 'black',
//                                 color: 'orange',
//                                 borderColor: 'black',
//                                 fontWeight: 'bold',
//                                 '&:hover': {
//                                     color: 'orange',
//                                     borderColor: 'black',
//                                     opacity: '.8'
//                                 },
//                             },
//                             getButtonStyles: (hasIcon) => ({
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 flexDirection: hasIcon.position === 'right' ? 'row-reverse' : 'row',
                                
//                                 "& svg": {
//                                     ...(hasIcon.position === 'right' ? { mr: 1 } : { ml: 1 }),
//                                 }
//                             }),
//                         },
//                         columnSettings: {
//                             background: ``,
//                             borderRadius: 2,
//                             alignSelf: 'center',
//                             // p: 2,
//                         },
//                         breakPoints: {
//                             md: 5, 
//                             lg: 5
//                         }
//                     },
//                 ],
//                 containerSettings: {
//                     sx: {
//                         justifyContent: 'space-between',
//                     },
//                     content: {
//                         video: '',
//                         image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/17849711/pexels-photo-17849711/free-photo-of-fog-in-deep-forest.jpeg)`
//                     }
//                 },
//             },
//         },
//     ],
// };

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
                            md: 6, 
                            lg: 6
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
                            md: 6, 
                            lg: 4
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        justifyContent: 'space-between',
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
                            url: 'https://images.pexels.com/photos/4825725/pexels-photo-4825725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                            sx: {
                                width: '100%',
                                // maxHeight: '400px',
                                objectFit: 'cover',
                                borderRadius: '5px',
                                position: 'relative',
                                zIndex: 1,
                            },
                           
                        },
                        columnTitle: {
                            enabled: false,
                            text: 'Hi,',
                            variant: 'h3',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: false,
                            text: 'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint',
                            variant: 'body1',
                            sx: {
                                color: 'lightgray',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'small',
                            enabled: false,
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
                            // background: `linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)`,
                            borderRadius: 2,
                            // p: 2,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                zIndex: '0',
                                borderRadius: '5px',
                                width: '100%',
                                border: '2px solid tomato',
                                height: '100%',
                            },
                        },
                        breakPoints: {
                            md: 6, 
                            lg: 5
                        }
                    },
                    {   
                        columnImage: {
                            position: 'relative',
                            enabled: false,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            },
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'Monsoon Brunch',
                            variant: 'h1',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'We emport the most beautiful flowers from the monsoon region. The monsoon rains are essential for the farmers to grow their crops and feed their families.',
                            variant: 'body1',
                            sx: {
                                color: 'white',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'large',
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
                        },
                        breakPoints: {
                            md: 6, 
                            lg: 6
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                    content: {
                        video: '',
                        image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg)`
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
                            position: 'relative',
                            enabled: false,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            },
                        },
                        columnTitle: {
                            enabled: true,
                            text: 'Monsoon Farmers',
                            variant: 'h1',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'Farmers who rely on the monsoon rains to grow their crops. The monsoon rains are essential for the farmers to grow their crops and feed their families.',
                            variant: 'body1',
                            sx: {
                                color: 'white',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'large',
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
                        },
                        breakPoints: {
                            md: 6, 
                            lg: 5
                        }
                    },
                    {   
                        columnImage: {
                            position: 'relative',
                            enabled: false,
                            url: 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                            sx: {
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '5px'
                            },
                        },
                        columnTitle: {
                            enabled: false,
                            text: 'Monsoon Farmers',
                            variant: 'h1',
                            sx: {
                                color: 'orange',
                                pt: 3
                            }
                        },
                        columnSubtitle: {
                            enabled: false,
                            text: 'We are Swift Fuel.',
                            variant: 'h5',
                            sx: {
                                pt: 3,
                                color: 'lightgray',
                            }
                        },
                        columnDescription: {
                            enabled: true,
                            text: 'A seasonal prevailing wind in the region of South and SE Asia, blowing from the south-west between May and September and bringing rain (the wet monsoon ), or from the north-east between October and April (the dry monsoon).', 
                            variant: 'body1',
                            sx: {
                                color: 'white',
                                '&:hover': {}
                            }
                        },
                        columnButton: {
                            size:'large',
                            enabled: true,
                            text: 'SEE ALL FARMS',
                            variant: 'outlined',
                            action: (action) => (e) => e ? action(e) : action(),
                            hasIcon: {
                                enabled: false,
                                icon: 'AddCircleIcon',
                                position: 'left'
                            },
                            sx: {
                                mt: 2,
                                color: 'black',
                                border: '2px solid black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    color: 'orange',
                                    borderColor: 'black',
                                    backgroundColor: 'black',
                                    color: 'orange',
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
                        },
                        breakPoints: {
                            md: 6, 
                            lg: 5
                        }
                    },
                ],
                containerSettings: {
                    sx: {
                        alignItems: 'end',
                        justifyContent: 'space-between',
                    },
                    content: {
                        video: '',
                        image: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/247616/pexels-photo-247616.jpeg)`
                    }
                },
            },
        },
        
    ],
};

export { settings1, settings2, settings3 };
