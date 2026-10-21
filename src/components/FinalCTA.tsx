import React from 'react';

interface FinalCTAProps {
  onOpenLeadModal: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="py-20 bg-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Cols 1-7): Plain Sentence and Action */}
          <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="lg:col-span-7">
            <p className="text-[clamp(20px,2vw,24px)] font-normal text-[#111111] leading-[1.35] max-w-[34ch] mb-6">
              Connect your first MikroTik router and automate venue billing in under five minutes.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={onOpenLeadModal}
                className="button-primary text-[14px] h-[40px] px-[18px] cursor-pointer"
              >
                Begin deployment
              </button>
              <a
                href="#live-showcase"
                className="text-[14px] text-[#111111] hover:underline cursor-pointer"
              >
                Read documentation
              </a>
            </div>
          </div>

          {/* Right Column (Cols 8-12): Regional Fiber Backbone Graphic */}
          <div data-rise style={{ '--i': 1 } as React.CSSProperties} className="lg:col-span-5 bg-[#f4f4f4] p-4 text-center">
            <img
              src="/assets/map-of-african-undersea-fiber-optic-cables.png"
              alt="Map of African Undersea Fiber Optic Cables"
              className="w-full max-h-[220px] object-contain mx-auto"
              loading="lazy"
            />
            <p className="text-[13px] text-[#555555] mt-2">
              African undersea & terrestrial fiber backbone topology.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
