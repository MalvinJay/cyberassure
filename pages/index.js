import DefaultLayout from '@/components/Layouts/defaultLayout'
import { Button } from 'antd'
import Head from 'next/head'
import Image from 'next/image'

const Index = () => {
  const orgPostureList = [
    {
      image: "/assets/images/Platform/enterprise.png",
      info: "End-to-End visibility of your enterprise "
    },
    {
      image: "/assets/images/Platform/focus.png",
      info: "Focus on key risk and prioritize"
    },
    {
      image: "/assets/images/Platform/control.png",
      info: "Set Comprehensive controls in line with standards "
    }
  ];

  const resources = [
    {
      info: "The Power of Key Risk Indicators in Technology Risk Management",
      link: "#"
    },
    {
      info: "Lessons learnt from Log4J",
      link: "#"
    },
    {
      info: "Reaching the cutting edge of Cybersecurity - The Buffett Reputation Razor",
      link: "#"
    },
    {
      info: "Principal-Agent Problem in  Cybersecurity",
      link: "#"
    },
  ];

  return (
    <div className="">
      <Head>
        <title>Home | Orgposture</title>
        <meta name="description" content="We help you set your Corporate Goals, Measure your Progress and Achieve Results" />
        <link rel="icon" href="logo.svg" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Home | Orgposture" key="title" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Orgposture" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="We help you set your Corporate Goals, Measure your Progress and Achieve Results" />
        <meta property="og:image" content="/assets/images/platform.png" />
        <meta property="og:url" content="/" />
      </Head>

      <DefaultLayout>
        <main className="">
          <section className="w-full bg-default dark:bg-gray-900 md:h-screen flex items-center">
            <div className="max-w-screen-xl mx-auto grid px-4 lg:gap-8 xl:gap-0 md:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold md:text-5xl !leading-tight dark:text-white md:pr-20">
                    We help you set your Corporate Goals, Measure your Progress and
                    &nbsp;<span className="text-primary">Achieve Results</span>
                  </h1>
                  <div className="space-x-5 pt-10">
                    <Button type="primary" className="text-lg bg-primary text-white h-10 px-12 dark:text-black dark:bg-white">
                      Get Started
                    </Button>
                    <Button type="default" className="text-lg text-primary border-primary h-10 px-6 dark:text-white dark:border-white">See how it works</Button>
                  </div>
              </div>
              <div className="lg:mt-0 lg:col-span-5 lg:flex">
                <Image
                  width={678}
                  height={402}
                  className="object-contain" 
                  data-aos="fade-up" data-aos-duration="1500"
                  src="/assets/images/platform.png" 
                  alt="platform" 
                />
              </div>                
            </div>
          </section>    

          <section className="w-full bg-white dark:bg-gray-900 py-4 md:py-16">
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="w-full sm:w-2/3 xl:w-1/2 mx-auto" 
                data-aos="fade-up"
              >
                <div className="font-semibold leading-snug text-3xl text-center pb-10 mx-auto" style={{ textShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                  <p>Experience the most efficient enterprise risk management solution </p>
                  <br />
                  <p>Strengthen your security posture</p>
                </div>
              </div>
            </div>

            <div className="max-w-screen-xl mx-auto">
              <div className="text-primary dark:text-white pt-10 pl-10">
                <h2 className="text-4xl text-primary dark:text-white font-semibold">Orgposture</h2>
                <p className='text-lg pt-2'>Make data driven security decisions</p>
              </div>

              <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-20 px-4 py-4 md:py-16">
                {orgPostureList.map((el, index) => (
                  <div className="text-center mx-auto flex flex-col items-center space-y-10" key={index}>
                    <Image
                      width={108}
                      height={102}
                      className="object-contain"
                      data-aos="fade-up" data-aos-duration="1500"
                      src={el.image}
                      alt={el.name}
                    />

                    <p className="w-full lg:w-2/3 mx-auto text-center font-medium dark:text-white !leading-normal text-lg" data-aos="fade-up">
                      {el.info}
                    </p>                  
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-screen-xl mx-auto">
              <div className="w-full sm:w-2/3 xl:w-2/5 mx-auto" data-aos="fade-up">
                <h2 className="font-bold leading-snug text-3xl text-center mx-auto">
                  Manage security strategy, people, process and technology  on one platform
                </h2>
              </div>

              <div className="grid px-4 lg:gap-8 lg:gap-x-0 xl:gap-y-12 md:grid-cols-12 pt-10">
                <div className="mr-auto col-start-1 lg:col-end-7" data-aos="fade-up" data-aos-duration="1500">
                  <Image
                    width={600}
                    height={312}
                    className="object-contain" 
                    src="/assets/images/Platform/manage_security.png" 
                    alt="automate_security" 
                  />

                  <div className='pt-5'>
                    <h3 className="text-xl text-black dark:text-white font-bold">Report improvements to leadership</h3>
                    
                    <p className="leading-relaxed text-black dark:text-white pt-3 text-lg font-medium">
                      Use historical report to track and maintain progress, identify regressions, and report to leaderships teams. Using measurable data, clearly demonstrate the progress you’re making to better secure your environment.
                    </p>
                  </div>
                </div>

                <div className="col-span-5 col-end-13" data-aos="fade-up" data-aos-duration="1500">
                  <Image
                    width={452}
                    height={319}
                    className="object-contain" 
                    src="/assets/images/Platform/management_lifecycle.svg"
                    alt="lifecycle" 
                  />

                  <p className="leading-relaxed text-black dark:text-white pt-3 text-lg font-medium">
                    Improve their security posture by providing discoverability, visibility, guidance, and control in line with security standards and frameworks
                  </p>
                </div>

                <div className="mr-auto col-start-1 lg:col-end-7" data-aos="fade-up" data-aos-duration="1500">
                  <Image
                    width={600}
                    height={312}
                    className="object-contain" 
                    src="/assets/images/Platform/protect.png" 
                    alt="protect_security" 
                  />

                  <p className="leading-relaxed text-black dark:text-white pt-5 text-base font-medium">
                    Protect your organization from threats and proactively implement controls to mitigate risk.
                  </p>                
                </div>

                <div className="col-span-5 col-end-13" data-aos="fade-up" data-aos-duration="1500">
                  <Image
                    width={452}
                    height={319}
                    className="object-contain"
                    src="/assets/images/Platform/KRI-highlights.png"
                    alt="lifecycle" 
                  />

                  <p className="leading-relaxed text-black dark:text-white pt-5 text-base font-medium">
                    Gain access to robust visualizations of metrics and trends, integration with other security products and much more.
                  </p>
                </div>

              </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-16">
              <h2 className="font-bold leading-snug text-3xl text-center mx-auto">
                Resources
              </h2>

              <div className="w-full grid sm:grid-cols-2 md:grid-cols-2 gap-10 pt-10">
                {resources.map((el, index) => (
                  <div className='w-full sm:w-2/3 lg:w-3/4 mx-auto text-lg space-x-2' key={index}>
                    <span>{el.info}</span>
                    <Button type='primary' className='bg-primary rounded-md text-white dark:text-black dark:bg-white'>Read More</Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </DefaultLayout>
    </div>
  )
}

export default Index