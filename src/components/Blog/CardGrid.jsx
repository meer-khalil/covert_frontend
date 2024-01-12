import React from 'react';

import image from '../../images/check.png'
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { backend_resource } from '../../util/variables';

const CardGrid = ({ blogs }) => {
  // const cardData = [
  //   { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  //   { id: 2, title: 'Card 2', content: 'Pellentesque ac felis sit amet nunc gravida facilisis.' },
  //   { id: 3, title: 'Card 3', content: 'Vestibulum finibus leo vitae lectus tristique maximus.' },
  //   { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  //   { id: 2, title: 'Card 2', content: 'Pellentesque ac felis sit amet nunc gravida facilisis.' },
  //   { id: 3, title: 'Card 3', content: 'Vestibulum finibus leo vitae lectus tristique maximus.' },
  //   { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  //   { id: 2, title: 'Card 2', content: 'Pellentesque ac felis sit amet nunc gravida facilisis.' },
  //   { id: 3, title: 'Card 3', content: 'Vestibulum finibus leo vitae lectus tristique maximus.' },
  //   { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  //   { id: 2, title: 'Card 2', content: 'Pellentesque ac felis sit amet nunc gravida facilisis.' },
  //   { id: 3, title: 'Card 3', content: 'Vestibulum finibus leo vitae lectus tristique maximus.' },
  // ];

  return (
    <>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {
          blogs?.map((card) => (
            <Link key={card._id} to={`/blog/${card._id}`}>
              <div className="bg-white p-3 rounded-xl shadow-xl">
                {/* <div style={{
                  backgroundImage: `url(${backend_resource}/images/blog/${card?.cover?.filename})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} className=' py-40 rounded-xl overflow-hidden'>
                </div> */}
                <div className=' w-full  h-[300px] overflow-hidden rounded-tl-lg rounded-tr-lg'>
                  <img src={`${backend_resource}/images/blog/${card?.cover?.filename}`} alt="blog image" className=' w-full h-full' />
                  {/* <img src={`${backend_resource}/${card?.cover?.path}`.replaceAll('\\', '/').replace('public/', '')} alt="blog image" className=' w - full h - full' /> */}
                </div>
                <p className='mt-5 mb-6'>{card.title}</p>
              </div>
            </Link>

          ))
        }

      </div>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            p: 1,
            px: 4,
            bgcolor: "#716EDC",
            "&:hover": {
              backgroundColor: "#716EDC",
            },
            mx: 'auto'
          }}
        >
          Load More
        </Button>
      </Box> */}
    </>
  );
};

export default CardGrid;
