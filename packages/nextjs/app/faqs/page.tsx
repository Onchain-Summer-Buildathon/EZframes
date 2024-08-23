const Faq = () => {
  return (
    <div className="container max-w-[90%] lg:py-12 py-0 xl:max-w-7xl xl:pl-4 m-auto pt-4 pb-8 flex flex-col l items-center justify-between gap-5 lg:gap-0">
      <h2 className="text-3xl md:text-4xl lg:leading-[1.2] lg:text-left font-bold">
        F.A.Q <br />
      </h2>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">How easy is it to launch MultiFrame Frames?</div>
        <div className="collapse-content">
          <p>
            Launching Frames is super simple with our no-code builder—just design, customize, and deploy directly using
            easy-to-use tools. No coding required.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">Why EZFrames stands out?</div>
        <div className="collapse-content">
          <p>
            EZframes excels with real-time analytics, text-to-image generation, and an intuitive dashboard for easy
            monitoring and optimization.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">What Benefits do you get using EZFrames?</div>
        <div className="collapse-content">
          <p>
            Seamlessly manage end-to-end frames with our intuitive dashboard, connect payments directly, and streamline
            your workflow efficiently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
