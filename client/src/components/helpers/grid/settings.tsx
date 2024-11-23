import {
    createColumnImage,
    createColumnText,
    createColumnButton,
    createColumnSettings,
    createBreakPoints,
  } from './utils/settings';
  import { getButtonStyles } from './utils/helpers';
  
  const settings = {
    grid: [
      {
        container: {
          columns: [
            {
              columnImage: createColumnImage(true, 'https://images.unsplash.com/photo-1487803556724-cb9f0b8151d1?q=80&w=2143&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', {
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '5px',
              }),
              columnTitle: createColumnText(true, 'Hi,', 'h3', {
                color: 'orange',
                pt: 3,
              }),
              columnSubtitle: createColumnText(true, 'We are Swift Fuel.', 'h5', {
                pt: 3,
                color: 'lightgray',
              }),
              columnDescription: createColumnText(
                true,
                'We empower businesses to make the switch to renewable energy sources and reduce their carbon footprint.',
                'body1',
                {
                  color: 'lightgray',
                }
              ),
              columnButton: createColumnButton(
                'small',
                true,
                'DISCOVER',
                'outlined',
                (action) => (e) => (e ? action(e) : action()),
                {
                  enabled: true,
                  icon: 'AddCircleIcon',
                  position: 'left',
                },
                {
                  mt: 2,
                  backgroundColor: 'black',
                  color: 'orange',
                  borderColor: 'black',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: 'orange',
                    borderColor: 'black',
                    opacity: '.8',
                  },
                  ...getButtonStyles({
                    enabled: true,
                    position: 'left',
                  }),
                }
              ),
              columnSettings: createColumnSettings(
                'linear-gradient(90deg, rgb(68 68 68) 0%, rgb(21 14 16) 100%)',
                2,
                2
              ),
              breakPoints: createBreakPoints(5, 5),
            },
          ],
          containerSettings: {
            sx: {
              justifyContent: 'space-between',
            },
          },
        },
      },
    ],
  };
  
  export default settings;
  