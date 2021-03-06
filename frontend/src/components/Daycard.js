import React from "react";
import {icons} from './dummyData';

const Daycard = ({data}) => {
  const {Date, Temperature, Day} = data
    return (
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
      style={{
        minHeight: "50vh"
      }}>
    <section className="pb-20 bg-transparent-300 -mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap" style={{margin: 'auto'}}>
          <div className="g:pt-12 pt-6 w-full md:w-3/6 px-4 text-center" 
            data-aos="fade-up" data-aos-anchor-placement="top-center" >
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="text-white p-3 text-center inline-flex items-center justify-cente mb-5 ">
                  <img src={Day?icons[Day.Icon]:''} />
                </div>
                <p className="text-xl font-semibold"> {Temperature?Temperature.Maximum.Value + ' ' + Temperature.Maximum.Unit:''}</p>
                <h6 className="mt-2 mb-4 text-gray-600">
                 {Date}
                </h6>
                <p>
                {Day?Day.IconPhrase:''}
              </p>
              </div>
            </div>
          </div>
        </div>
       </div>
     </section>
     </ div>
    );
}

export default Daycard;