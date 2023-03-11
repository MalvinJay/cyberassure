import DefaultLayout from '@/components/Layouts/defaultLayout'
import Head from 'next/head'
import Image from 'next/image'

const Index = () => {
  return (
    <div className="">
      <Head>
        <title>Home | OrgPosture</title>
        <meta name="description" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <DefaultLayout>
        <main className="">
          <section class="w-full bg-default dark:bg-gray-900 md:h-screen flex items-center">
            <div class="max-w-screen-xl mx-auto grid px-4 lg:gap-8 xl:gap-0 md:grid-cols-12">
              <div class="mr-auto place-self-center lg:col-span-7">
                  <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl dark:text-white md:pr-20">
                  Gain 360 degrees oversight on Enterprise security posture.
                  </h1>
                  <p class="max-w-2xl mt-6 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-4xl dark:text-gray-400 md:pr-20">
                    Make security decisions through metrics and data 
                  </p>
              </div>
              <div class="lg:mt-0 lg:col-span-5 lg:flex">
                <Image
                  width={678}
                  height={402}
                  className="object-contain" 
                  data-aos="fade-zoom-in"
                  data-aos-anchor-placement="top-bottom" data-aos-duration="2000"
                  src="/assets/images/hero_1.svg" 
                  alt="mockup" 
                />
              </div>                
            </div>
          </section>    

          <section class="w-full bg-white dark:bg-gray-900 flex items-center py-4 md:py-16 lg:py-24">
            <div class="max-w-screen-xl mx-auto grid px-4 lg:gap-8 lg:gap-x-0 xl:gap-y-12 md:grid-cols-12">
              <div class="mr-auto place-self-center lg:col-span-7">
                <p class="font-medium dark:text-white md:pr-20 lg:pr-40 !leading-normal text-lg lg:text-4xl" data-aos="fade-right">
                  Automate Cyber and Information Security within the enterprise without chasing 
                  process and system owners.
                </p>
              </div>
              <div class="lg:mt-0 lg:col-span-5 lg:flex">
                <Image
                  width={678}
                  height={402}
                  className="object-contain" 
                  data-aos="fade-up" data-aos-duration="1500"
                  src="/assets/images/automate_security.svg" 
                  alt="automate_security" 
                />
              </div>  

              <div class="col-start-1 lg:col-end-6 lg:flex lg:py-16">
                <Image
                  width={482}
                  height={461}
                  className="object-contain" 
                  data-aos="fade-up" data-aos-duration="1500"
                  src="/assets/images/kri_status.svg" 
                  alt="automate_security" 
                />                
              </div>   
              <div class="ml-auto place-self-center col-span-5 col-end-13">
                <p class="font-medium dark:text-white md:px-10 lg:px-20 !leading-snug text-lg lg:text-3xl" data-aos="fade-right">
                  Identify inefficiencies and improve security posture.
                </p>
              </div>  

              <div class="mr-auto place-self-center lg:col-span-6 mt-4">
                <p class="font-medium dark:text-white md:pr-20 text-lg lg:text-3xl" data-aos="fade-right">
                  Integrate security risk indicators through APIs into platforms and security solutions. 
                  Prioritize risk and response capabilities. 
                </p>
              </div>
              <div class="lg:mt-0 lg:col-span-6 lg:flex lg:py-16">
                <Image
                  width={678}
                  height={402}
                  className="object-contain" 
                  src="/assets/images/partners.svg" 
                  data-aos="zoom-in-down" data-aos-duration="1500"
                  alt="automate_security" 
                />
              </div> 
            </div>
          </section>  

          <section class="w-full bg-white dark:bg-gray-900 flex items-center py-4 md:pb-16 lg:pb-24">
            <div class="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-12">
              <div className="md:pr-16 xl:pr-24 col-start-1 col-end-13 md:col-end-7">
                <h2 className="leading-normal text-lg lg:text-4xl font-medium">Task Management</h2>
                
                <Image
                  width={678}
                  height={402}
                  className="object-contain" 
                  src="/assets/images/team_management.svg" 
                  data-aos="zoom-in" data-aos-duration="1500"
                  alt="team_managment" 
                />
              </div>
              <div className="text-2xl col-span-4 col-end-12" data-aos="fade-left">
                <p className="leading-normal pb-5">
                  Keep an eye on assigned security risk tasks to colleagues and ensure efficiency in security and compliance.
                  <br />
                  Automate security within your department through task management workflow
                </p>
                <h3 className="font-semibold">Key Features</h3>
                <ul className="lg:pl-10 list-disc">
                  <li>Tasks can be linked in security policies / key risk indicators / KPIs</li>
                  <li>Tasks are integrated into risk management framework</li>
                  <li>Email Notification</li>
                  <li>End to End visibility of tasks for all team members</li>
                </ul>
              </div>
            </div>
          </section>

          <section class="w-full bg-white dark:bg-gray-900 flex items-center py-4 md:pb-16 lg:pb-24">
            <div class="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-12">
              <div className="md:pr-16 col-start-1 col-end-13 md:col-end-7 border-r border-black">
                <h3 className="font-semibold ml-10 text-2xl">Benefits of OrgPosture Platform</h3>
                <ul className="lg:pl-2 list-disc pt-6 text-xl">
                  <li>Meet regulatory responsibilities by quickly ascertaining enterprise’s measures to guard against cyber attacks ​</li>
                  <li>Capture summarized data that enables informed and more productive conversations with the firm’s Cyber Security and Risk   Management leadership </li>
                  <li>Identify areas that need improvement and potential investments and practices to address</li>
                  <li>Deliver meaningful data that executives and board members can easily consume and incorporate into your risk management conversations and save over 50% of the time it would regularly take you</li>
                  <li>Demonstrate periodic progress against cyber risk management goals and the practices such as cyber training, investments in technology, etc., contributing to these advancements​</li>
                  <li>Provide data-driven business cases for additional investments to further protect the firm’s critical assets</li>
                </ul>                
              </div>

              <div className="text-2xl col-span-4 col-end-12" data-aos="fade-up">
                <h3 className="font-semibold pl-5">Capabilities</h3>
                <ul className="lg:pl-2 list-disc pt-6">
                  <li>Security Convergence </li>
                  <li>Improved Security Culture</li>
                  <li>Enhanced Employee Engagement </li>
                  <li>Reduced Cyber Attacks</li>
                  <li>Good return on investments (ROI)</li>
                  <li>Data analytics - Data does not lie</li>
                  <li>Simplification through risk automation</li>
                </ul>
              </div>
            </div>
          </section>          
        </main>
      </DefaultLayout>
    </div>
  )
}

export default Index